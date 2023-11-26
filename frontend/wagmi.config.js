import { defineConfig } from "@wagmi/cli";
import { hardhat } from "@wagmi/cli/plugins";
import { react } from "@wagmi/cli/plugins";

export default defineConfig({
   out: "src/generated.ts",
   contracts: [],
   plugins: [
      hardhat({
         project: "../backend",
         deployments: {
            SimpleStorage: {
               31337: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
            },
         },
      }),
      react({
         useContractRead: true,
         useContractFunctionRead: true,
      }),
   ],
});
