// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract MarsxCommunity is ERC1155, Ownable, ReentrancyGuard {

    string public name = "Mars-X Community";
    string public symbol = "MXC";

    uint256 public usdtPrice; // USDT with 6 decimals
    uint256 public mxPrice; // ERC20 tokens with 18 decimals

    struct Owner {
        address ownerAddress;
        uint256 quantity;
        string currency;  // "USDT" or "MX"
    }

    mapping(uint256 => Owner[]) public communityOwners; // Maps community ID to list of owners
    mapping(uint256 => uint256) public lastMintedItemId; // Track the minted items per community

    bool public usdtEnabled = true;
    string private baseURI;  // Base URI for metadata

    IERC20 public usdtToken;
    IERC20 public mxToken;


    event MintedWithUSDT(address indexed buyer, uint256 communityId, uint256 quantity);
    event MintedWithMX(address indexed buyer, uint256 communityId, uint256 quantity);
    event BaseURISet(string newBaseURI);
    event TokensWithdrawn(address indexed to, uint256 amount, bool isUSDT);


    constructor(
        address _usdtAddress,
        address _erc20Address,
        string memory _baseURI,
        uint256 _mxPrice,
        uint256 _usdtprice
    ) ERC1155(_baseURI) Ownable(msg.sender) {
        usdtToken = IERC20(_usdtAddress);
        mxToken = IERC20(_erc20Address);
        baseURI = _baseURI;
        usdtPrice = _usdtprice;
        mxPrice = _mxPrice;
    }

       
    /** 
     * @dev This contract is an extension of the ERC1155 standard with added functionality and security measures for minting NFTs with USDT or ERC20 tokens.
     */ 
     
     // Function to mint NFTs with USDT
    function mintWithUSDT(
        uint256 communityId,
        uint256 quantity
    ) external nonReentrant {
        require(quantity > 0, "Quantity must be greater than zero");
        require(usdtEnabled, "USDT purchases are disabled");
        require(lastMintedItemId[communityId] + quantity <= 10, "Exceeds maximum supply");

        uint256 totalPrice = usdtPrice * quantity;
        require(usdtToken.transferFrom(msg.sender, address(this), totalPrice), "USDT transfer failed");
        
        lastMintedItemId[communityId] += quantity;
        _mint(msg.sender, communityId, quantity, "");

         // Check if the owner already exists in the array
        bool ownerExists = false;
        for (uint256 i = 0; i < communityOwners[communityId].length; i++) {
        if (communityOwners[communityId][i].ownerAddress == msg.sender) {
            communityOwners[communityId][i].quantity += quantity;  // Owner exists, update their quantity
            ownerExists = true;
            break;
            }
        }

        if (!ownerExists) {  // If the owner does not exist, add them to the array
            communityOwners[communityId].push(Owner(msg.sender, quantity, "USDT"));
        }

        emit MintedWithUSDT(msg.sender, communityId, quantity);
    }


    // Function to mint NFTs with ERC20 tokens
    function mintWithMX(
        uint256 communityId,
        uint256 quantity
    ) external nonReentrant {
        require(quantity > 0, "Quantity must be greater than zero");
        require(lastMintedItemId[communityId] + quantity <= 10, "Exceeds maximum supply");

        uint256 totalPrice = mxPrice * quantity;
        require(mxToken.transferFrom(msg.sender, address(this), totalPrice), "ERC20 transfer failed");
        
        lastMintedItemId[communityId] += quantity;
        _mint(msg.sender, communityId, quantity, "");

         // Check if the owner already exists in the array
        bool ownerExists = false;
        for (uint256 i = 0; i < communityOwners[communityId].length; i++) {
        if (communityOwners[communityId][i].ownerAddress == msg.sender) {
            communityOwners[communityId][i].quantity += quantity;  // Owner exists, update their quantity
            ownerExists = true;
            break;
            }
        }

        if (!ownerExists) {  // If the owner does not exist, add them to the array
            communityOwners[communityId].push(Owner(msg.sender, quantity, "MX"));
        }

        emit MintedWithMX(msg.sender, communityId, quantity);
    }

    // Function to get the URI for a specific token ID
    function uri(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(baseURI, Strings.toString(tokenId), ".json"));
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
    function withdrawTokens(address to, uint256 amount, bool isUSDT) external onlyOwner {
        // Check if the amount is greater than or equal to the contract balance
        uint256 contractBalance = isUSDT ? usdtToken.balanceOf(address(this)) : mxToken.balanceOf(address(this));
        require(amount <= contractBalance, "Insufficient balance for withdrawal");
        
        if (isUSDT) {
            require(usdtToken.transfer(to, amount), "Withdrawal failed");
            emit TokensWithdrawn(msg.sender, amount, true);

        } else { 
            require(mxToken.transfer(to, amount), "Withdrawal failed"); 
            emit TokensWithdrawn(msg.sender, amount, false);
        }
    }

    // Function to get owners for a specific community
    function getCommunityOwners(uint256 communityId) external view returns (Owner[] memory) {
        return communityOwners[communityId];
    }
}
