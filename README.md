# Mars-X Community Smart Contract

## Overview

The **Mars-X Community** smart [contract](https://amoy.polygonscan.com/address/0xdb9d09ae2977a316e0ec7519d1d122f811df031b#code) is an ERC1155-based contract that facilitates the minting of NFTs with two payment options: USDT (a stablecoin) and an ERC20 token called MX. This contract is designed for community-driven NFT projects, allowing multiple owners to hold and manage their NFTs securely.

## Features

- **Minting NFTs**: Users can mint NFTs using either USDT or MX tokens.
- **Owner Management**: Tracks owners of each community and their respective quantities.
- **Price Management**: Adjustable prices for minting NFTs with USDT and MX tokens.
- **Base URI Management**: Set or update the base URI for NFT metadata.
- **Token Withdrawal**: The owner can withdraw collected USDT and MX tokens.
- **Reentrancy Protection**: Uses OpenZeppelin's `ReentrancyGuard` to prevent reentrancy attacks.

## Contract Details

- **Name**: Mars-X Community
- **Symbol**: MXC
- **Token Standards**: ERC1155
- **Supported Tokens**:
  - USDT: 6 decimals
  - MX: 18 decimals

## Contract Variables

- `usdtPrice`: Price of NFTs in USDT.
- `mxPrice`: Price of NFTs in MX tokens.
- `communityOwners`: A mapping from community IDs to a list of owners.
- `lastMintedItemId`: Tracks the last minted item ID for each community.
- `usdtEnabled`: Boolean indicating whether USDT purchases are enabled.
- `baseURI`: The base URI for NFT metadata.
- `usdtToken`: The ERC20 token contract for USDT.
- `mxToken`: The ERC20 token contract for MX.

## Events

- `MintedWithUSDT`: Emitted when NFTs are minted with USDT.
- `MintedWithMX`: Emitted when NFTs are minted with MX.
- `BaseURISet`: Emitted when the base URI is set or updated.
- `TokensWithdrawn`: Emitted when tokens are withdrawn by the owner.

## Constructor

```solidity
constructor(
    address _usdtAddress,   // Address of the USDT token contract.
    address _erc20Address,  // Address of the MX token contract.
    string memory _baseURI, // Base URI for the metadata.
    uint256 _mxPrice,       // Initial price for minting with MX tokens.
    uint256 _usdtPrice      // Initial price for minting with USDT.
)
```



## Functions

**Minting Functions**
- *mintWithUSDT (uint256 communityId, uint256 quantity)*
Allows users to mint NFTs using USDT.
Emits MintedWithUSDT event.

- *mintWithMX(uint256 communityId, uint256 quantity)*
Allows users to mint NFTs using MX tokens.
Emits MintedWithMX event.

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

**Owner Management**
- *getCommunityOwners(uint256 communityId) external view returns (Owner[] memory)*
Returns the list of owners for a specific community.
Each community can have 10 owners max.

**Security Considerations**
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
npx hardhat verify --network testnet <contractaddress> <usdtAddress> <mxTokenAddress> <baseURI> <mxPrice> <usdtPrice>

```
