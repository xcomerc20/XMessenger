export const COOKIES = { AUTH: "X_CHAT_TOKEN_AUTH" };
export const blockScanners: { [key: number | string]: string } = {
  1: "https://etherscan.io",
  5: "https://goerli.etherscan.io",
};

export const currencies: { [key: number | string]: string } = {
  1: "ETH",
  5: "GeorliETH",
};

export const configuredChains: { [key: number | string]: string } = {
  1: "Ethereum Mainnet",
  56: "Binance Smart Chain",
  3: "Arbitrum",
  5: "Optimism",
  857: "Polygon",
  250: "Base",
};

export const mainnetTokens = {
  WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  BNB: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
  SOL: "0x5947f5068299B52A1288D56E7769fcbccC4a1f9e",
  USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  X: "0xaBeC00542D141BDdF58649bfe860C6449807237c",
};
