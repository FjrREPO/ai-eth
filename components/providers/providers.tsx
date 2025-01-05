"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";
import { WagmiProvider } from "wagmi"
import { config } from "@/lib/wagmi"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { sepolia } from "viem/chains";
import "@rainbow-me/rainbowkit/styles.css";
import { CustomAvatar } from "../web3/button-connect-wallet";

interface Props {
  children: ReactNode;
}

export const Providers = (props: Props) => {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider modalSize="wide" initialChain={sepolia} showRecentTransactions={true} avatar={CustomAvatar}>
          {props.children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
};