require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */

const { SEPOLIA_URL, SECRET_KEY, ETHERSCAN_KEY } = process.env;

module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: SEPOLIA_URL || "",
      accounts: SECRET_KEY !== undefined ? [`0x${SECRET_KEY}`] : []
    }
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_KEY !== undefined || ""
    }
  },
  sourcify: {
    enabled: true
  },
  namedAccounts: {
    deployer: {
      default: 0, // The default account to use as the deployer
    },
  },
};
