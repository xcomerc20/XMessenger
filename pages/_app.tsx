import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Chain, WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { mainnet, bsc, bscTestnet } from "wagmi/chains";
import AuthWrapper from "@/components/AuthWrapper";

export default function App({ Component, pageProps }: AppProps) {
  const PROJECT_ID = "2aace780a77a24eac53619a6372be13e";
  const { chains } = configureChains(
    [mainnet, bsc, bscTestnet],
    [publicProvider()]
  );
  const wagmiConfig = defaultWagmiConfig({
    chains,
    projectId: PROJECT_ID,
    appName: "xchat",
  });

  createWeb3Modal({
    wagmiConfig,
    projectId: PROJECT_ID,
    chains,
    themeVariables: { "--w3m-accent": "#2bae36" },
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </WagmiConfig>
  );
}
