import { defineConfig } from "@wagmi/cli";
import { hardhat } from "@wagmi/cli/plugins";
import { react } from "@wagmi/cli/plugins";
import { hardhat as hardhatChain } from "wagmi/chains";

export default defineConfig({
   out: "src/generated.ts",
   contracts: [],
   plugins: [
      hardhat({
         project: "../backend",
         deployments: {
            SimpleStorage: {
               [hardhatChain.id]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
            },
         },
      }),
      react({
         useContractRead: true,
         useContractFunctionRead: true,
      }),
   ],
});
