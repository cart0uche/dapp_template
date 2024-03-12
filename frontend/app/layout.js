"use client";
import "@rainbow-me/rainbowkit/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { hardhat, sepolia } from "@wagmi/core/chains";
import { WagmiProvider, http } from "wagmi";
import { ChakraProvider } from "@chakra-ui/react";
import { SimpleStorageProvider } from "@/context/simpleStorage";

const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: process.env.NEXT_PUBLIC_RAINBOW_APP_ID,

  chains: [hardhat, sepolia],

  transports: {
    [hardhat.id]: http(),
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <ChakraProvider>
                <SimpleStorageProvider>{children}</SimpleStorageProvider>
              </ChakraProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
