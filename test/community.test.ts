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
    const marsxCommunity = await MarsxCommunity.deploy(
      usdtToken,
      mxToken,
      baseURI,
      mxPrice,
      usdtPrice
    );

    // Fund some USDT and MX tokens to addr1 for testing
    await usdtToken.transfer(addr1.address, '1000000000'); // 1000 USDT
    await mxToken.transfer(addr1.address, '1000000000000000000000'); // 10000 MX

    return { marsxCommunity, usdtToken, mxToken, owner, addr1, addr2, mxPrice, usdtPrice };
  }

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      const { marsxCommunity } = await loadFixture(deployMarsxCommunityFixture);

      expect(await marsxCommunity.name()).to.equal("Mars-X Community");
      expect(await marsxCommunity.symbol()).to.equal("MXC");
    });
  });

  describe("Minting", function () {
    it("Should mint NFTs with USDT", async function () {
      const { marsxCommunity, usdtToken, addr1, usdtPrice } = await loadFixture(deployMarsxCommunityFixture);

      // Approve USDT transfer
      await usdtToken.connect(addr1).approve(marsxCommunity, usdtPrice);

      // Mint with USDT
      await expect(marsxCommunity.connect(addr1).mintWithUSDT(1, 1))
        .to.emit(marsxCommunity, "MintedWithUSDT")
        .withArgs(addr1.address, 1, 1);

      const balance = await marsxCommunity.balanceOf(addr1.address, 1);
      expect(balance).to.equal(1);
    });

    it("Should mint NFTs with MX", async function () {
      const { marsxCommunity, mxToken, addr1, mxPrice } = await loadFixture(deployMarsxCommunityFixture);

      // Approve MX transfer
      await mxToken.connect(addr1).approve(marsxCommunity, mxPrice);

      // Mint with MX
      await expect(marsxCommunity.connect(addr1).mintWithMX(1, 1))
        .to.emit(marsxCommunity, "MintedWithMX")
        .withArgs(addr1.address, 1, 1);

      const balance = await marsxCommunity.balanceOf(addr1.address, 1);
      expect(balance).to.equal(1);
    });

    it("Should revert if USDT purchases are disabled", async function () {
      const { marsxCommunity, addr1, usdtToken, usdtPrice } = await loadFixture(deployMarsxCommunityFixture);

      // Disable USDT purchases
      await marsxCommunity.toggleUsdtPurchases(false);

      // Approve USDT transfer
      await usdtToken.connect(addr1).approve(marsxCommunity, usdtPrice);

      await expect(marsxCommunity.connect(addr1).mintWithUSDT(1, 1))
        .to.be.revertedWith("USDT purchases are disabled");
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
      const { marsxCommunity, usdtToken, addr1, owner, usdtPrice } = await loadFixture(deployMarsxCommunityFixture);
      
      await usdtToken.connect(addr1).approve(marsxCommunity, usdtPrice);
      await marsxCommunity.connect(addr1).mintWithUSDT(1, 1);

      const balanceBefore = await usdtToken.balanceOf(owner.address);
      await marsxCommunity.withdrawTokens(owner.address, usdtPrice, true);
      const balanceAfter = await usdtToken.balanceOf(owner.address);

      expect(balanceAfter - balanceBefore).to.equal(usdtPrice);
    });

    it("Should allow owner to withdraw MX tokens", async function () {
      const { marsxCommunity, mxToken, mxPrice, owner, addr1 } = await loadFixture(deployMarsxCommunityFixture);

      await mxToken.connect(addr1).approve(marsxCommunity, mxPrice);
      await marsxCommunity.connect(addr1).mintWithMX(1, 1);

      const balanceBefore = await mxToken.balanceOf(owner.address);
      await marsxCommunity.withdrawTokens(owner.address, mxPrice, false);
      const balanceAfter = await mxToken.balanceOf(owner.address);

      expect(balanceAfter - balanceBefore).to.equal(mxPrice);
    });
  });

})