import { http, createConfig } from "wagmi"
import { holesky, mainnet, sepolia } from "wagmi/chains"
import { bitgetWallet, coinbaseWallet, metaMaskWallet, okxWallet, rabbyWallet, rainbowWallet, walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

export const projectId = "04251f8180896efb96c57a0984864657"

const connectors = connectorsForWallets(
    [
        {
            groupName: "Recommended",
            wallets: [
                okxWallet,
                rabbyWallet,
            ]
        },
        {
            groupName: "Others",
            wallets: [
                walletConnectWallet,
                metaMaskWallet,
                coinbaseWallet,
                rainbowWallet,
                bitgetWallet,
            ],
        },
    ],
    { appName: "RainbowKit App", projectId: projectId },
);

export const config = createConfig({
    chains: [mainnet, sepolia, holesky],
    connectors: connectors,
    transports: {
        [mainnet.id]: http("https://eth-mainnet.g.alchemy.com/v2/vwDTCZX0XZnU6flxj8YzYZuMaOKI3EX9"),
        [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/vwDTCZX0XZnU6flxj8YzYZuMaOKI3EX9"),
        [holesky.id]: http("https://eth-holesky.g.alchemy.com/v2/vwDTCZX0XZnU6flxj8YzYZuMaOKI3EX9"),
    }
})