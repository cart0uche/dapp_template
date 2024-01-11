"use client";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { hardhat, sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ChakraProvider } from "@chakra-ui/react";
import { SimpleStorageProvider } from "@/context/simpleStorage";

const { chains, publicClient } = configureChains(
   [sepolia, hardhat],
   [
      alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
      publicProvider(),
   ]
);

const { connectors } = getDefaultWallets({
   appName: "My RainbowKit App",
   projectId: process.env.NEXT_PUBLIC_RAINBOW_APP_ID,
   chains,
});

const wagmiConfig = createConfig({
   autoConnect: true,
   connectors,
   publicClient,
});

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body>
            <WagmiConfig config={wagmiConfig}>
               <RainbowKitProvider chains={chains}>
                  <ChakraProvider>
                     <SimpleStorageProvider>
                        {children}
                     </SimpleStorageProvider>
                  </ChakraProvider>
               </RainbowKitProvider>
            </WagmiConfig>
         </body>
      </html>
   );
}
