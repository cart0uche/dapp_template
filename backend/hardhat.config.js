require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const DEPLOYER_PRIVATE_KEY =
   process.env.DEPLOYER_PRIVATE_KEY ||
   "0xfake1private2key3fake4private5key6fake7private8key";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
   solidity: {
      version: "0.8.18",
      defaultNetwork: "localhost",
      settings: {
         optimizer: {
            enabled: true,
            // https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options
            runs: 200,
         },
      },
   },

   defaultNetwork: "hardhat",

   networks: {
      hardhat: {},
      sepolia: {
         url: "https://sepolia.infura.io/v3/" + process.env.INFURA_KEY,
         accounts: [DEPLOYER_PRIVATE_KEY],
      },
   },
};
