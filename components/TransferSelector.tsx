import React, { useEffect, useState } from "react";

export interface Token {
  name: string;
  fullName: string;
  imageUrl: string;
  network: string;
}

interface TokenSelectorPopupProps {
  label: string;
  initialToken: Token;
  setToken: (token: Token) => void;
  onTokenSelect: (token: Token) => void;
}
export const tokens = [
  {
    name: "BTC",
    fullName: "Bitcoin",
    network: "BITCOIN NETWORK",
    imageUrl: "https://sideshift.ai/coin-icons/btc.svg",
  },
  {
    name: "ETH",
    fullName: "Ethereum",
    network: "ETHEREUM NETWORK",
    imageUrl: "https://sideshift.ai/coin-icons/eth.svg",
  },
  {
    name: "SOL",
    fullName: "Solana",
    network: "SOLANA NETWORK",
    imageUrl: "https://sideshift.ai/coin-icons/sol.svg",
  },
  {
    name: "TRX",
    fullName: "Tron",
    network: "TRON NETWORK",
    imageUrl: "https://sideshift.ai/coin-icons/trx.svg",
  },
  {
    name: "TON",
    fullName: "TON",
    network: "TON NETWORK",
    imageUrl: "https://sideshift.ai/coin-icons/ton.svg",
  },
];
export const TransferSelectorPopup: React.FC<TokenSelectorPopupProps> = ({
  label,
  initialToken,
  setToken,
  onTokenSelect,
}) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const handleTokenSelect = (token: Token) => {
    setPopupVisible(false);
    setToken(token);
    onTokenSelect(token);
  };

  return (
    <div className="w-full gap-2 flex" onClick={() => setPopupVisible(false)}>
      <div
        className="logo"
        onClick={(e) => {
          e.stopPropagation();
          setPopupVisible(true);
        }}
      >
        <img
          src={initialToken.imageUrl}
          alt={initialToken.name}
          className="w-[96px]"
        />
      </div>
      <div className="w-1/2">
        <p>{label}</p>
        <h2
          style={{
            fontSize: "1.85rem",
            fontWeight: 700,
            color: "#fff",
          }}
        >
          {initialToken.name}
        </h2>
        <h4>{initialToken.fullName}</h4>
        <div
          style={{
            textDecoration: "uppercase",
            background: "rgb(71 161 255 / 25%)",
            border: "1px solid #47a1ff",
            borderRadius: 5,
            padding: 5,
            marginTop: 5,
            cursor: "pointer",
          }}
        >
          {initialToken.network}
        </div>
      </div>

      {popupVisible && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#464646",
            border: "1px solid #47a1ff",
            borderRadius: 5,
            padding: 20,
            zIndex: 1000,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {tokens.map((token: Token) => (
            <div
              key={token.name}
              className="flex items-center justify-between gap-4 m-2 cursor-pointer"
              onClick={() => handleTokenSelect(token)}
              style={{
                padding: "10px",
                borderBottom: "1px solid #47a1ff",
              }}
            >
              <img src={token.imageUrl} alt={token.name} className="w-8 h-8" />
              <h1 className="text-xl text-white">{token.name}</h1>
              <h4 className="text-white">{token.fullName}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
