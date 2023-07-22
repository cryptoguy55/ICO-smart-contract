require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config()
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ropsten_key}`,
      accounts: [`${process.env.private_key}`]
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.goerli_key}`,
      accounts: [`${process.env.private_key}`]
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.mainnet_key}`, // or any other JSON-RPC provider
      accounts: [`${process.env.private_key}`],
      gasPrice: 50000000000,
      saveDeployments: true,
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: `${process.env.etherscan_key}`
  }
};
