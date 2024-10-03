import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";


describe("MarsxCommunity", function () {
  async function deployMarsxCommunityFixture() {

    const [owner, addr1, addr2] = await ethers.getSigners();

    const MockERC20 = await ethers.getContractFactory("ERC20Mock");
    const usdtToken = await MockERC20.deploy("USDT", "USDT", 6); // Mock USDT with 6 decimals
    const mxToken = await MockERC20.deploy("MX Token", "MX", 18); // Mock MX Token with 18 decimals

    const MarsxCommunity = await ethers.getContractFactory("MarsxCommunity");
    const baseURI = "https://marsx.mypinata.cloud/ipfs/";
    const mxPrice = '1000000000000000000000'; // 1000 MX token
    const usdtPrice = '1000000000'; // 1000 USDT
    const authorizedSignerAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // considering addr1 as authorizer

    const marsxCommunity = await MarsxCommunity.deploy(
      usdtToken,
      mxToken,
      baseURI,
      mxPrice,
      usdtPrice,
      authorizedSignerAddress
    );

    // Fund some USDT and MX tokens to addr1 for testing
    await usdtToken.transfer(addr1.address, '1000000000'); // 1000 USDT
    await mxToken.transfer(addr1.address, '1000000000000000000000'); // 10000 MX
    await mxToken.transfer(addr2.address, '5000000000000000000000'); // 50000 MX
    await usdtToken.transfer(addr2.address, '5000000000'); // 50000 USDT

    return { authorizedSignerAddress, marsxCommunity, usdtToken, mxToken, owner, addr1, addr2, mxPrice, usdtPrice };
  }

  describe("Deployment", function () {
    it("Should set the correct name, symbol and owner", async function () {
      const { marsxCommunity, owner } = await loadFixture(deployMarsxCommunityFixture);

      expect(await marsxCommunity.name()).to.equal("Mars-X Community");
      expect(await marsxCommunity.symbol()).to.equal("MXC");
      expect(await marsxCommunity.owner()).to.equal(owner.address);
    });
  });


  describe("Publishing communities", function () {
    it("Should publish communities and update availability", async function () {
      const { marsxCommunity } = await loadFixture(deployMarsxCommunityFixture);
      await marsxCommunity.publishCommunties(10);
      expect(await marsxCommunity.totalPublished()).to.equal(10);
      for (let i = 1; i <= 10; i++) {
        expect(await marsxCommunity.available(i)).to.be.true;
      }
    });

    it("Should not publish more communities than the total supply", async function () {
      const { marsxCommunity } = await loadFixture(deployMarsxCommunityFixture);
      await expect(marsxCommunity.publishCommunties(1000001)).to.be.revertedWith(
        "Exceeds total supply"
      );
    });

    it("Should revert if anyone else try to publish other than the owner", async function () {
      const { marsxCommunity, addr1 } = await loadFixture(deployMarsxCommunityFixture);

      await expect(marsxCommunity.connect(addr1).publishCommunties(1))
        .to.be.reverted
    });

  });

  describe("Minting", function () {
    it("Should mint NFTs with USDT", async function () {

      const { authorizedSignerAddress, marsxCommunity, usdtToken, addr1, usdtPrice } = await loadFixture(deployMarsxCommunityFixture);
      const nonce = await marsxCommunity.nonces(addr1);
      const messageHash = ethers.solidityPackedKeccak256(
        ["address", "uint256", "uint256", "uint256", "address"],
        [authorizedSignerAddress, 1, 1, nonce, addr1.address]
      );

      // generating signature for a user to mint 
      const signature = await addr1.signMessage(ethers.getBytes(messageHash));

      // publishing the community
      await marsxCommunity.publishCommunties(1);

      // Approve USDT transfer
      await usdtToken.connect(addr1).approve(marsxCommunity, usdtPrice);

      // Mint with USDT
      await expect(marsxCommunity.connect(addr1).mintWithUSDT(1, 1, nonce, signature))
        .to.emit(marsxCommunity, "MintedWithUSDT")
        .withArgs(addr1.address, 1, 1);

      const balance = await marsxCommunity.balanceOf(addr1.address, 1);
      expect(balance).to.equal(1);
    });

    it("Should mint NFTs with MX", async function () {
      const { marsxCommunity, authorizedSignerAddress, mxToken, addr1, mxPrice } = await loadFixture(deployMarsxCommunityFixture);
      const nonce = await marsxCommunity.nonces(addr1);
      const messageHash = ethers.solidityPackedKeccak256(
        ["address", "uint256", "uint256", "uint256", "address"],
        [authorizedSignerAddress, 1, 1, nonce, addr1.address]
      );

      // generating signature for a user to mint 
      const signature = await addr1.signMessage(ethers.getBytes(messageHash));

      // publishing the community
      await marsxCommunity.publishCommunties(1);

      // Approve MX transfer
      await mxToken.connect(addr1).approve(marsxCommunity, mxPrice);

      // Mint with MX
      await expect(marsxCommunity.connect(addr1).mintWithMX(1, 1, nonce, signature))
        .to.emit(marsxCommunity, "MintedWithMX")
        .withArgs(addr1.address, 1, 1);

      const balance = await marsxCommunity.balanceOf(addr1.address, 1);
      expect(balance).to.equal(1);
    });

    it("Should revert if USDT purchases are disabled", async function () {
      const { marsxCommunity, authorizedSignerAddress, addr1, usdtToken, usdtPrice } = await loadFixture(deployMarsxCommunityFixture);
      const nonce = await marsxCommunity.nonces(addr1);
      const messageHash = ethers.solidityPackedKeccak256(
        ["address", "uint256", "uint256", "uint256", "address"],
        [authorizedSignerAddress, 1, 1, nonce, addr1.address]
      );

      // generating signature for a user to mint 
      const signature = await addr1.signMessage(ethers.getBytes(messageHash));

      // publishing the community
      await marsxCommunity.publishCommunties(1);
      // Disable USDT purchases
      await marsxCommunity.toggleUsdtPurchases(false);

      // Approve USDT transfer
      await usdtToken.connect(addr1).approve(marsxCommunity, usdtPrice);

      await expect(marsxCommunity.connect(addr1).mintWithUSDT(1, 1, nonce, signature))
        .to.be.revertedWith("USDT purchases are disabled");
    });

    it("Should revert if signature is invalid", async function () {
      const { marsxCommunity, authorizedSignerAddress, addr1, mxToken, mxPrice } = await loadFixture(deployMarsxCommunityFixture);
      const nonce = await marsxCommunity.nonces(addr1);
      const messageHash = ethers.solidityPackedKeccak256(
        ["address", "uint256", "uint256", "uint256", "address"],
        [authorizedSignerAddress, 1, 2, nonce, addr1.address] // generate hash with wrong data
      );

      // generating signature for a user to mint 
      const signature = await addr1.signMessage(ethers.getBytes(messageHash));

      // publishing the community
      await marsxCommunity.publishCommunties(1);

      // Approve MX transfer
      await mxToken.connect(addr1).approve(marsxCommunity, mxPrice);

      await expect(marsxCommunity.connect(addr1).mintWithMX(1, 1, nonce, signature))
        .to.be.revertedWith("Invalid signature");
    });



    it("Should revert if nonce is invalid", async function () {
      const { marsxCommunity, authorizedSignerAddress, addr1, mxToken, mxPrice } = await loadFixture(deployMarsxCommunityFixture);
      const nonce = await marsxCommunity.nonces(addr1);
      const messageHash = ethers.solidityPackedKeccak256(
        ["address", "uint256", "uint256", "uint256", "address"],
        [authorizedSignerAddress, 1, 1, 2, addr1.address] //provided the wrong nonce (sc will check right before execution)
      );

      // generating signature for a user to mint 
      const signature = await addr1.signMessage(ethers.getBytes(messageHash));

      // publishing the community
      await marsxCommunity.publishCommunties(1);

      // Approve MX transfer
      await mxToken.connect(addr1).approve(marsxCommunity, mxPrice);

      await expect(marsxCommunity.connect(addr1).mintWithMX(1, 1, 2, signature))
        .to.be.revertedWith("Invalid nonce");
    });



    it("Should revert if community not published", async function () {
      const { marsxCommunity, authorizedSignerAddress, addr1, mxToken, mxPrice } = await loadFixture(deployMarsxCommunityFixture);
      const nonce = await marsxCommunity.nonces(addr1);
      const messageHash = ethers.solidityPackedKeccak256(
        ["address", "uint256", "uint256", "uint256", "address"],
        [authorizedSignerAddress, 2, 1, nonce, addr1.address] //provided the wrong nonce (sc will check right before execution)
      );

      // generating signature for a user to mint 
      const signature = await addr1.signMessage(ethers.getBytes(messageHash));

      // publishing the community
      await marsxCommunity.publishCommunties(1);

      // Approve MX transfer
      await mxToken.connect(addr1).approve(marsxCommunity, mxPrice);

      await expect(marsxCommunity.connect(addr1).mintWithMX(2, 1, nonce, signature))
        .to.be.revertedWith("Community not yet published");
    });


    it("Should revert if amount is more than 10", async function () {
      const { marsxCommunity, authorizedSignerAddress, addr1, mxToken, mxPrice } = await loadFixture(deployMarsxCommunityFixture);
      const nonce = await marsxCommunity.nonces(addr1);
      const messageHash = ethers.solidityPackedKeccak256(
        ["address", "uint256", "uint256", "uint256", "address"],
        [authorizedSignerAddress, 1, 11, nonce, addr1.address] //provided the wrong nonce (sc will check right before execution)
      );

      // generating signature for a user to mint 
      const signature = await addr1.signMessage(ethers.getBytes(messageHash));

      // publishing the community
      await marsxCommunity.publishCommunties(1);

      // Approve MX transfer
      await mxToken.connect(addr1).approve(marsxCommunity, mxPrice);

      await expect(marsxCommunity.connect(addr1).mintWithMX(1, 11, nonce, signature))
        .to.be.revertedWith("Exceeds maximum supply");
    });


    it("Should revert if transfer doesn't succeed", async function () {
      const { marsxCommunity, authorizedSignerAddress, addr1, mxToken, mxPrice } = await loadFixture(deployMarsxCommunityFixture);
      const nonce = await marsxCommunity.nonces(addr1);
      const messageHash = ethers.solidityPackedKeccak256(
        ["address", "uint256", "uint256", "uint256", "address"],
        [authorizedSignerAddress, 1, 1, nonce, addr1.address]
      );

      // generating signature for a user to mint 
      const signature = await addr1.signMessage(ethers.getBytes(messageHash));

      // publishing the community
      await marsxCommunity.publishCommunties(1);

      // Approve MX transfer
      // await mxToken.connect(addr1).approve(marsxCommunity, mxPrice); // didn't approve the required amount

      await expect(marsxCommunity.connect(addr1).mintWithMX(1, 1, nonce, signature))
        .to.be.reverted;
    });


    it("Should update the owners list after transfer", async function () {
      const { marsxCommunity, authorizedSignerAddress, mxToken, addr1, addr2, mxPrice } = await loadFixture(deployMarsxCommunityFixture);
      const nonce = await marsxCommunity.nonces(addr2);
      const messageHash = ethers.solidityPackedKeccak256(
        ["address", "uint256", "uint256", "uint256", "address"],
        [authorizedSignerAddress, 1, 2, nonce, addr2.address]
      );

      // generating signature for a user to mint 
      const signature = await addr1.signMessage(ethers.getBytes(messageHash));

      // publishing the community
      await marsxCommunity.publishCommunties(1);

      // Approve MX transfer
      await mxToken.connect(addr2).approve(marsxCommunity, '2000000000000000000000');

      // Mint with MX
      await marsxCommunity.connect(addr2).mintWithMX(1, 2, nonce, signature)

      // Check the owners before transfer
      let owners = await marsxCommunity.getCommunityOwners(1);

      // addr2 should have 2 NFTs in the list
      expect(owners.length).to.equal(1);
      expect(owners[0].ownerAddress).to.equal(addr2.address);
      expect(owners[0].quantity).to.equal(2);

      //  addr2 transfers 1 NFTs to addr1
      await marsxCommunity.connect(addr2).safeTransferFrom(addr2.address, addr1.address, 1, 1, "0x");

      // Check the owners after transfer
      owners = await marsxCommunity.getCommunityOwners(1);

      // addr1 and addr2 both should have 1 nft record in the list
      expect(owners.length).to.equal(2);
      expect(owners[1].ownerAddress).to.equal(addr1.address);
      expect(owners[1].quantity).to.equal(1);
      expect(owners[0].ownerAddress).to.equal(addr2.address);
      expect(owners[0].quantity).to.equal(1);


      //  addr2 transfers  remaining 1 NFTs to addr1
      await marsxCommunity.connect(addr2).safeTransferFrom(addr2.address, addr1.address, 1, 1, "0x");

      // Check the owners after 2nd transfer
      owners = await marsxCommunity.getCommunityOwners(1);

      // addr1 should have quantity of 2 in the list and addrs2 should no longer exist
      expect(owners.length).to.equal(1);
      expect(owners[0].ownerAddress).to.equal(addr1.address);
      expect(owners[0].quantity).to.equal(2);

    });

  });



  describe("Base URI", function () {

    it("Should return correct URI for token ID", async function () {
      const { marsxCommunity } = await loadFixture(deployMarsxCommunityFixture);
      const uri = await marsxCommunity.uri(1);
      expect(uri).to.equal("https://marsx.mypinata.cloud/ipfs/1.json");
    });

    it("Should allow owner to set new base URI", async function () {
      const { marsxCommunity } = await loadFixture(deployMarsxCommunityFixture);
      await marsxCommunity.setBaseURI("https://marsx.mypinata.cloud/ipfs/ipns/");
      const uri = await marsxCommunity.uri(1);
      expect(uri).to.equal("https://marsx.mypinata.cloud/ipfs/ipns/1.json");
    });
  });

  describe("Price and Purchase Settings", function () {
    it("Should allow owner to change USDT price", async function () {
      const { marsxCommunity } = await loadFixture(deployMarsxCommunityFixture);

      await marsxCommunity.setUsdtPrice('2000000000');
      expect(await marsxCommunity.usdtPrice()).to.equal('2000000000');
    });

    it("Should allow owner to change MX price", async function () {
      const { marsxCommunity } = await loadFixture(deployMarsxCommunityFixture);

      await marsxCommunity.setMXPrice('2000000000000000000000');
      expect(await marsxCommunity.mxPrice()).to.equal('2000000000000000000000');
    });
  });

  describe("Withdrawals", function () {
    it("Should allow owner to withdraw USDT tokens", async function () {
      const { marsxCommunity, authorizedSignerAddress, usdtToken, addr1, owner, usdtPrice } = await loadFixture(deployMarsxCommunityFixture);
      const nonce = await marsxCommunity.nonces(addr1);
      const messageHash = ethers.solidityPackedKeccak256(
        ["address", "uint256", "uint256", "uint256", "address"],
        [authorizedSignerAddress, 1, 1, nonce, addr1.address]
      );

      // generating signature for a user to mint 
      const signature = await addr1.signMessage(ethers.getBytes(messageHash));

      // publishing the community
      await marsxCommunity.publishCommunties(1);

      await usdtToken.connect(addr1).approve(marsxCommunity, usdtPrice);
      await marsxCommunity.connect(addr1).mintWithUSDT(1, 1, nonce, signature);

      const balanceBefore = await usdtToken.balanceOf(owner.address);
      await marsxCommunity.withdrawTokens(owner.address, usdtPrice, true);
      const balanceAfter = await usdtToken.balanceOf(owner.address);

      expect(balanceAfter - balanceBefore).to.equal(usdtPrice);
    });

    it("Should allow owner to withdraw MX tokens", async function () {
      const { marsxCommunity, authorizedSignerAddress, mxToken, mxPrice, owner, addr1 } = await loadFixture(deployMarsxCommunityFixture);
      const nonce = await marsxCommunity.nonces(addr1);
      const messageHash = ethers.solidityPackedKeccak256(
        ["address", "uint256", "uint256", "uint256", "address"],
        [authorizedSignerAddress, 1, 1, nonce, addr1.address]
      );

      // generating signature for a user to mint 
      const signature = await addr1.signMessage(ethers.getBytes(messageHash));

      // publishing the community
      await marsxCommunity.publishCommunties(1);
      await mxToken.connect(addr1).approve(marsxCommunity, mxPrice);
      await marsxCommunity.connect(addr1).mintWithMX(1, 1, nonce, signature);

      const balanceBefore = await mxToken.balanceOf(owner.address);
      await marsxCommunity.withdrawTokens(owner.address, mxPrice, false);
      const balanceAfter = await mxToken.balanceOf(owner.address);

      expect(balanceAfter - balanceBefore).to.equal(mxPrice);
    });

    it("Should revert if anyone try to withdraw other than owner", async function () {
      const { marsxCommunity, authorizedSignerAddress, mxToken, mxPrice, owner, addr1 } = await loadFixture(deployMarsxCommunityFixture);
      const nonce = await marsxCommunity.nonces(addr1);
      const messageHash = ethers.solidityPackedKeccak256(
        ["address", "uint256", "uint256", "uint256", "address"],
        [authorizedSignerAddress, 1, 1, nonce, addr1.address]
      );

      // generating signature for a user to mint 
      const signature = await addr1.signMessage(ethers.getBytes(messageHash));

      // publishing the community
      await marsxCommunity.publishCommunties(1);
      await mxToken.connect(addr1).approve(marsxCommunity, mxPrice);
      await marsxCommunity.connect(addr1).mintWithMX(1, 1, nonce, signature);

      await expect(marsxCommunity.connect(addr1).withdrawTokens(addr1, mxPrice, false))  // addr1 instead of owner will revert
        .to.be.reverted;
    });


    it("Should revert if try to withdraw more than available", async function () {
      const { marsxCommunity, authorizedSignerAddress, mxToken, mxPrice, owner, addr1 } = await loadFixture(deployMarsxCommunityFixture);
      const nonce = await marsxCommunity.nonces(addr1);
      const messageHash = ethers.solidityPackedKeccak256(
        ["address", "uint256", "uint256", "uint256", "address"],
        [authorizedSignerAddress, 1, 1, nonce, addr1.address]
      );

      // generating signature for a user to mint 
      const signature = await addr1.signMessage(ethers.getBytes(messageHash));

      // publishing the community
      await marsxCommunity.publishCommunties(1);
      await mxToken.connect(addr1).approve(marsxCommunity, mxPrice);
      await marsxCommunity.connect(addr1).mintWithMX(1, 1, nonce, signature);

      await expect(marsxCommunity.connect(owner).withdrawTokens(addr1, '2000000000000000000000', false))  // addr1 instead of owner will revert
        .to.be.revertedWith("Insufficient balance for withdrawal");
    });

  });

})