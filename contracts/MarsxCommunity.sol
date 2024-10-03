// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract MarsxCommunity is ERC1155, Ownable, ReentrancyGuard {
    string public name = "Mars-X Community";
    string public symbol = "MXC";

    uint256 public usdtPrice; // USDT with 6 decimals
    uint256 public mxPrice; // ERC20 tokens with 18 decimals
    uint256 public totalSupply = 100000; // Total number of communities
    uint256 public totalPublished; // Number of communities released for minting
    mapping(uint256 => bool) public available; //  published communities

    struct Owner {
        address ownerAddress;
        uint256 quantity;
    }

    mapping(uint256 => Owner[]) public communityOwners; // Maps community ID to list of owners
    mapping(uint256 => uint256) public lastMintedItemId; // Track the minted items per community

    bool public usdtEnabled = true;
    string private baseURI; // Base URI for metadata

    IERC20 public usdtToken;
    IERC20 public mxToken;

    address private authorizedSigner;
    mapping(address => uint256) public nonces;

    event MintedWithUSDT(
        address indexed buyer,
        uint256 communityId,
        uint256 quantity
    );
    event MintedWithMX(
        address indexed buyer,
        uint256 communityId,
        uint256 quantity
    );

    event TokensWithdrawn(address indexed to, uint256 amount, bool isUSDT);

    event CommunityPublished(uint256 indexed communityId, bool isPublished);

    event BaseURISet(string newBaseURI);

    constructor(
        address _usdtAddress,
        address _erc20Address,
        string memory _baseURI,
        uint256 _mxPrice,
        uint256 _usdtprice,
        address _authorizedSigner
    ) ERC1155(_baseURI) Ownable(msg.sender) {
        usdtToken = IERC20(_usdtAddress);
        mxToken = IERC20(_erc20Address);
        baseURI = _baseURI;
        usdtPrice = _usdtprice;
        mxPrice = _mxPrice;
        authorizedSigner = _authorizedSigner;
    }

    /**
     * @dev This contract is an extension of the ERC1155 standard with added functionality and security measures for minting NFTs with USDT or ERC20 tokens.
     */

    // Function to mint NFTs with USDT
    function mintWithUSDT(
        uint256 communityId,
        uint256 quantity,
        uint256 nonce,
        bytes calldata signature
    ) external nonReentrant {
        require(quantity > 0, "Quantity must be greater than zero");
        require(usdtEnabled, "USDT purchases are disabled");
        require(
            lastMintedItemId[communityId] + quantity <= 10,
            "Exceeds maximum supply"
        );
        require(available[communityId], "Community not yet published"); // Check if community is published

        // Verify signature
        bytes32 hash = keccak256(
            abi.encodePacked(
                authorizedSigner,
                communityId,
                quantity,
                nonce,
                msg.sender
            )
        );
        bytes32 ethSignedMessage = MessageHashUtils.toEthSignedMessageHash(
            hash
        );
        require(
            ECDSA.recover(ethSignedMessage, signature) == authorizedSigner,
            "Invalid signature"
        );
        require(nonce == nonces[msg.sender], "Invalid nonce");

        nonces[msg.sender]++; // Increment nonce for the sender

        uint256 totalPrice = usdtPrice * quantity;
        require(
            usdtToken.transferFrom(msg.sender, address(this), totalPrice),
            "USDT transfer failed"
        );

        lastMintedItemId[communityId] += quantity;
        _mint(msg.sender, communityId, quantity, "");
        updateCommunityOwners(address(0), msg.sender, communityId, quantity);
        emit MintedWithUSDT(msg.sender, communityId, quantity);
    }

    // Function to mint NFTs with ERC20 tokens
    function mintWithMX(
        uint256 communityId,
        uint256 quantity,
        uint256 nonce,
        bytes calldata signature
    ) external nonReentrant {
        require(quantity > 0, "Quantity must be greater than zero");
        require(
            lastMintedItemId[communityId] + quantity <= 10,
            "Exceeds maximum supply"
        );
        require(available[communityId], "Community not yet published"); // Check if community is published

        // Verify signature
        bytes32 hash = keccak256(
            abi.encodePacked(
                authorizedSigner,
                communityId,
                quantity,
                nonce,
                msg.sender
            )
        );
        bytes32 ethSignedMessage = MessageHashUtils.toEthSignedMessageHash(
            hash
        );
        require(
            ECDSA.recover(ethSignedMessage, signature) == authorizedSigner,
            "Invalid signature"
        );
        require(nonce == nonces[msg.sender], "Invalid nonce");

        nonces[msg.sender]++; // Increment nonce for the sender

        uint256 totalPrice = mxPrice * quantity;
        require(
            mxToken.transferFrom(msg.sender, address(this), totalPrice),
            "ERC20 transfer failed"
        );

        lastMintedItemId[communityId] += quantity;
        _mint(msg.sender, communityId, quantity, "");
        updateCommunityOwners(address(0), msg.sender, communityId, quantity);
        emit MintedWithMX(msg.sender, communityId, quantity);
    }

    // Function to get the URI for a specific token ID
    function uri(uint256 tokenId) public view override returns (string memory) {
        return
            string(
                abi.encodePacked(baseURI, Strings.toString(tokenId), ".json")
            );
    }

    // Function to publish communities
    function publishCommunties(uint256 _toBePublished) external onlyOwner {
        require(
            totalPublished + _toBePublished <= totalSupply,
            "Exceeds total supply"
        );

        uint256 currentSupply = totalPublished;
        for (
            uint256 i = currentSupply + 1;
            i <= currentSupply + _toBePublished;
            i++
        ) {
            available[i] = true;
            emit CommunityPublished(i, true);
        }
        totalPublished += _toBePublished;
    }

    // Function to set or update the base URI
    function setBaseURI(string memory newBaseURI) external onlyOwner {
        baseURI = newBaseURI;
        emit BaseURISet(newBaseURI);
    }

    // Owner function to enable/disable USDT purchases
    function toggleUsdtPurchases(bool enabled) external onlyOwner {
        usdtEnabled = enabled;
    }

    // Owner function to set/change the USDT price
    function setUsdtPrice(uint256 newPrice) external onlyOwner {
        usdtPrice = newPrice;
    }

    // Owner function to set/change the ERC20 token price
    function setMXPrice(uint256 newPrice) external onlyOwner {
        mxPrice = newPrice;
    }

    // Owner function to withdraw collected tokens
    function withdrawTokens(
        address to,
        uint256 amount,
        bool isUSDT
    ) external onlyOwner {
        // Check if the amount is greater than or equal to the contract balance
        uint256 contractBalance = isUSDT
            ? usdtToken.balanceOf(address(this))
            : mxToken.balanceOf(address(this));
        require(
            amount <= contractBalance,
            "Insufficient balance for withdrawal"
        );

        if (isUSDT) {
            require(usdtToken.transfer(to, amount), "Withdrawal failed");
            emit TokensWithdrawn(msg.sender, amount, true);
        } else {
            require(mxToken.transfer(to, amount), "Withdrawal failed");
            emit TokensWithdrawn(msg.sender, amount, false);
        }
    }

    // Function to get owners for a specific community
    function getCommunityOwners(
        uint256 communityId
    ) external view returns (Owner[] memory) {
        return communityOwners[communityId];
    }

    // override transfer function to update the owner's details
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public override {
        super.safeTransferFrom(from, to, id, amount, data);
        // Add custom logic to update the community ownership here
        updateCommunityOwners(from, to, id, amount);
    }

    // updating community owners
    function updateCommunityOwners(
        address from,
        address to,
        uint256 id,
        uint256 amount
    ) internal {
        bool ownerExists = false;

        // Update existing owner's record
        for (uint256 i = 0; i < communityOwners[id].length; i++) {
            if (communityOwners[id][i].ownerAddress == from) {
                communityOwners[id][i].quantity -= amount;

                // Remove the owner if their balance is zero
                if (communityOwners[id][i].quantity == 0) {
                    communityOwners[id][i] = communityOwners[id][
                        communityOwners[id].length - 1
                    ];
                    communityOwners[id].pop();
                }
            }

            if (communityOwners[id][i].ownerAddress == to) {
                communityOwners[id][i].quantity += amount;
                ownerExists = true;
            }
        }

        // If `to` is a new owner, add to the list
        if (!ownerExists) {
            communityOwners[id].push(Owner(to, amount));
        }
    }
}
