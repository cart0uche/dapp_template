import { defineConfig } from "@wagmi/cli";
import { hardhat } from "@wagmi/cli/plugins";
import { react } from "@wagmi/cli/plugins";
import { hardhat as hardhatChain, sepolia } from "wagmi/chains";

export default defineConfig({
   out: "src/generated.ts",
   contracts: [],
   plugins: [
      hardhat({
         project: "../backend",
         deployments: {
            SimpleStorage: {
               [hardhatChain.id]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
               [sepolia.id]: "0x20dfeE5209da3f38e8F7E3E6D9B35Fee24b265CB",
            },
         },
      }),
      react({
         useContractRead: true,
         useContractFunctionRead: true,
      }),
   ],
});
