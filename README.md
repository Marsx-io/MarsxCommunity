# Mars-X Community Smart Contract

## Overview

The **Mars-X Community** smart [contract](https://amoy.polygonscan.com/address/0xe00c807EE706a60B87439f219180244765d94B90#code) is an ERC1155-based token that facilitates the minting of NFT communities on the Mars-X platform. It is designed to support both USDT and a custom ERC20 token (MX) for payments, while maintaining comprehensive tracking of owners for each community. The contract includes a robust set of features for the secure transfer and management of tokens, as well as a flexible architecture for setting metadata and handling minting logic.

## Features

- **ERC1155 Standard**: The contract adheres to the ERC1155 token standard for handling multi-token management.
- **Support for USDT and ERC20 (MX) Token**:  Users can mint NFTs using either USDT or a custom ERC20 token (MX), based on availability.
- **Price Management**: Adjustable prices for minting NFTs with USDT and MX tokens.
- **Community Tracking**: Community ownership is tracked and dynamically updated upon transfers.
- **Secure Minting with Signatures**: Signature-based authorization is implemented to ensure secure and tamper-proof minting.
- **Reentrancy Protection**: Uses OpenZeppelin's `ReentrancyGuard` to prevent reentrancy attacks.
- **Flexible Metadata Management**: Supports dynamic metadata URIs for enhanced configurability.

## Contract Details

- **Name**: Mars-X Community
- **Symbol**: MXC
- **Total Supply**: 100,000 Communities
- **Token Standards**: ERC1155
- **Supported Tokens**:
  - USDT: 6 decimals
  - MX: 18 decimals

## Constructor

```solidity
constructor(
    address _usdtAddress,      // Address of the USDT token contract.
    address _erc20Address,     // Address of the MX token contract.
    string memory _baseURI,    // Base URI for the metadata.
    uint256 _mxPrice,          // Initial price for minting with MX tokens.
    uint256 _usdtPrice,        // Initial price for minting with USDT.
    address _authorizedSigner, // Address used to sign off-chain transactions for verification.

)
```

## Events

- `MintedWithUSDT`: Emitted when NFTs are minted with USDT.
- `MintedWithMX`: Emitted when NFTs are minted with MX.
- `CommunityPublished`: Emitted when a community is published and made available for minting.
- `BaseURISet`: Emitted when the base URI is set or updated.
- `TokensWithdrawn`: Emitted when tokens are withdrawn by the owner.


## Contract Variables

- `usdtPrice`: Price of NFTs in USDT.
- `mxPrice`: Price of NFTs in MX tokens.
- `communityOwners`: A mapping from community IDs to a list of owners.
- `lastMintedItemId`: Tracks the last minted item ID for each community.
- `usdtEnabled`: Boolean indicating whether USDT purchases are enabled.
- `baseURI`: The base URI for NFT metadata.
- `usdtToken`: The ERC20 token contract for USDT.
- `mxToken`: The ERC20 token contract for MX.
- `totalSupply`: Total number of communities.
- `totalPublished`: Number of communities released for minting.
- `available`: A mapping to list the published communities.
- `nonces`: A mapping to keep track of nonce for each address.
- `authorizedSigner`: Address used to sign off-chain transactions for verification.


## Functions

**Minting Functions**
- *mintWithUSDT (uint256 communityId, uint256 quantity, uint256 nonce, bytes calldata signature)*
Mints the specified quantity of a community using USDT.
Verifies the signature against the authorized signer.
Checks that the community is available for minting and not exceeding the maximum supply.
Emits MintedWithUSDT event.

- *mintWithMX(uint256 communityId, uint256 quantity, uint256 nonce, bytes calldata signature)*
Mints the specified quantity using the ERC20 MX token.
Similar validation and security mechanisms as mintWithUSDT.
Emits MintedWithMX event.


**Transfer**
- *safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes memory data)*
Overrides the standard ERC1155 transfer function.
Updates community ownership details after a successful transfer.


**Community Management**
- *publishCommunties(uint256 _toBePublished)*
 Publishes new communities for minting.

**Metadata Management**
- *uri(uint256 tokenId) public view override returns (string memory)*
 Returns the URI for a specific token ID.

- *setBaseURI(string memory newBaseURI) external onlyOwner*
 Allows the owner to set or update the base URI for metadata.

**Price Management**

- *toggleUsdtPurchases(bool enabled) external onlyOwner*
Enables or disables USDT purchases.

- *setUsdtPrice(uint256 newPrice) external onlyOwner*
Allows the owner to set the price of NFTs in USDT.

- *setMXPrice(uint256 newPrice) external onlyOwner*
Allows the owner to set the price of NFTs in MX tokens.

**Token Management**
- *withdrawTokens(address to, uint256 amount, bool isUSDT) external onlyOwner*
Allows the owner to withdraw collected USDT or MX tokens.

**View Function**
- *getCommunityOwners(uint256 communityId) external view returns (Owner[] memory)*
Returns the list of owners for a specific community.
Each community can have 10 owners max.

**Internal Utility**
- *updateCommunityOwners(address from, address to, uint256 id, uint256 amount)*
Updates the community ownership details whenever a transfer or minting occurs.
Adds or removes owners based on the transferred quantity.

## Security Considerations

- **Signature Verification**: Ensures that only authorized users can mint NFTs by validating off-chain signatures.
- **Reentrancy Protection:**: Implemented using the `ReentrancyGuard` modifier to prevent reentrancy attacks..
- **Ownership Transfer Tracking**:  Keeps an updated list of owners for each community, which is crucial for transparency and revenue sharing.

This contract inherits from OpenZeppelin's Ownable and ReentrancyGuard contracts to provide secure ownership and reentrancy protection, respectively. Users are encouraged to review the code and perform their own audits.

**License**
This project is licensed under the MIT License.


### Usage

1. Ensure you have the appropriate version of Solidity set up.
2. Deploy the contract with the required parameters.
3. Interact with the contract functions as needed for minting and managing NFTs.

### Installation

```bash
git clone
cd root
npm install
```
### Compile, Test and Deploy

```shell

npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network testnet
npx hardhat verify --network testnet <contractaddress> <usdtAddress> <mxTokenAddress> <baseURI> <mxPrice> <usdtPrice> <authoriseAddress>

```
