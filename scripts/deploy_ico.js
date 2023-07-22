// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// eslint-disable-next-line import/no-extraneous-dependencies
const { ethers } = require("hardhat");
async function latestTime() {
  const block = await ethers.provider.getBlock("latest");
  return block.timestamp;
}
const duration = {
  seconds(val) {
    return val;
  },
  minutes(val) {
    return val * this.seconds(60);
  },
  hours(val) {
    return val * this.minutes(60);
  },
  days(val) {
    return val * this.hours(24);
  },
  weeks(val) {
    return val * this.days(7);
  },
  years(val) {
    return val * this.days(365);
  },
};
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  // deploy crowdsale contract
  const TokenCrowdsale = await ethers.getContractFactory("ICO");
  const rate = 50000; // 1ETH = 50000 FAC
  const minRate = "100000000000000000"; // min 0.1ETH
  const maxRate = "1000000000000000000"; // max 1ETH
  const collectWallet = "";
  const tokenAddress = ""
  const tokenWallet = ""
  const latestBlockTime = await latestTime();
  const openingTime = latestBlockTime + duration.minutes(1);
  // const openingTime = 1657843200; // 2022/7/15 00:00:00
  const closeTime = 1659312000; // 2022/8/1 00:00:00
  console.log("openingTime", openingTime);
  console.log("closeTime", closeTime);
  const tokenCrowdsale = await TokenCrowdsale.deploy(
    rate,
    collectWallet,
    tokenAddress,                            
    tokenWallet,
    openingTime,
    closeTime,
    minRate,
    maxRate
  );

  await tokenCrowdsale.deployed();
  console.log("TokenCrowdsale deployed to:", tokenCrowdsale.address);

  // approve crowdsale contract to spend 70% tokens
}  

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
