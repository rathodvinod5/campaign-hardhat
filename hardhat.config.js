require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */

const { SEPOLIA_RUL, SECRET_KEY, ETHERSCAN_KEY } = process.env;

module.exports = {
  solidity: "0.8.9",
  // networks: {
  //   sepolia: {
  //     url: SEPOLIA_RUL || "",
  //     accounts: SECRET_KEY !== undefined ? [`0x${SECRET_KEY}`] : []
  //   }
  // },
  // etherscan: {
  //   apiKey: {
  //     sepolia: ETHERSCAN_KEY !== undefined || ""
  //   }
  // },
  // sourcify: {
  //   enabled: true
  // }
};
