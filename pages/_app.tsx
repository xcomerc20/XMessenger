import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { WagmiConfig, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { mainnet, goerli } from "wagmi/chains";
import AuthWrapper from "@/components/AuthWrapper";
import Sidebar from "@/components/Sidebar";

import { Sarpanch } from "next/font/google";
import Head from "next/head";
import ChatBar from "@/components/ChatBar";
import Navbar from "@/components/Navbar";
import HamburgerSidebar from "@/components/HamburgerSidebar";
import { AuthProvider } from "@/contexts/AuthContexts";
const sarpanch = Sarpanch({ weight: ["400", "700"], subsets: ["latin"] });
export default function App({ Component, pageProps }: AppProps) {
  const PROJECT_ID = "2aace780a77a24eac53619a6372be13e";
  const { chains } = configureChains([mainnet, goerli], [publicProvider()]);
  const wagmiConfig = defaultWagmiConfig({
    chains,
    projectId: PROJECT_ID,
  });

  createWeb3Modal({
    wagmiConfig,
    projectId: PROJECT_ID,
    chains,
    themeVariables: { "--w3m-accent": "#2bae36" },
  });

  return (
    <AuthProvider>
      <WagmiConfig config={wagmiConfig}>
        <AuthWrapper>
          <body className={sarpanch.className}>
            <Head>
              <title>SecureChat</title>
              <meta
                name="description"
                content="SecureChat - Encrypted Messaging Platform"
              />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <link rel="icon" href="/logo.png" />
            </Head>

            <div className="flex bg-transparent w-screen h-full">
              <Sidebar />
              <HamburgerSidebar />
              <div className="w-full">
                <Component {...pageProps} />
              </div>
            </div>
          </body>
        </AuthWrapper>
      </WagmiConfig>
    </AuthProvider>
  );
}
