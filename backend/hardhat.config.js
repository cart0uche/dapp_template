require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const DEPLOYER_PRIVATE_KEY =
   process.env.DEPLOYER_PRIVATE_KEY ||
   "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

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
