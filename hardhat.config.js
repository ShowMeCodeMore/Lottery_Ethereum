require('dotenv').config();
const { ethers } = require("ethers");
const { HardhatUserConfig } = require("hardhat/config");

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "https://rinkeby.infura.io/v3/your-project-id";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "your-private-key";

const config = {
  solidity: "0.8.20",
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY]
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  }
};

module.exports = config;
