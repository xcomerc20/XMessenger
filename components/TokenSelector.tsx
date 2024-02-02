import React, { useState } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Token } from "./TransferSelector";
import { SimpleModal } from "./SimpleModal";
import { catamaran, montserrat } from "@/lib/fonts";

export const Swaptokens: Token[] = [
  {
    name: "ETH",
    imageUrl: "/ethereum 1.svg",
    network: "Ethereum Mainnet",
    fullName: "Ethereum",
  },
  {
    name: "BTC",
    imageUrl: "/bitcoin.png",
    network: "Bitcoin",
    fullName: "Bitcoin",
  },
  {
    name: "",
    imageUrl: "/bnb.png",
    network: "Binance Smart Chain",
    fullName: "Binance",
  },
  {
    name: "",
    imageUrl: "/shiba.png",
    network: "Ethereum Mainnet",
    fullName: "SHIBA INU",
  },
  {
    name: "",
    imageUrl: "/tron.png",
    network: "Tron",
    fullName: "Tron",
  },
  {
    name: "",
    imageUrl: "/litecoin.png",
    network: "Litecoin",
    fullName: "LITECOIN",
  },
  {
    name: "",
    imageUrl: "/dogs.png",
    network: "The Open Network",
    fullName: "Dogs",
  },
  {
    name: "",
    imageUrl: "/mango.png",
    network: "Solana",
    fullName: "Mango",
  },
  {
    name: "",
    imageUrl: "/toncoin.png",
    network: "The Open Network",
    fullName: "TONCOIN",
  },
  {
    name: "",
    imageUrl: "/doge.png",
    network: "Doge",
    fullName: "DOGE",
  },
  {
    name: "",
    imageUrl: "/usdc.png",
    network: "Ethereum Mainnet",
    fullName: "USDC",
  },
];

interface TokenSelectorProps {
  token: Token;
  setToken: any;
  otherToken: Token;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  token: selectedToken,
  setToken,
  otherToken,
}) => {
  const [swapDrop1, setSwapDrop1] = useState(false);

  const handleTokenSelect = (token: Token) => {
    setSwapDrop1(false);
    setToken(token);
  };

  return (
    <div>
      <div
        className="flex py-2 px-4 rounded-full bg-[#464646] gap-1 items-center cursor-pointer mt-3 mr-5"
        onClick={() => setSwapDrop1(!swapDrop1)}
      >
        <Image
          src={selectedToken.imageUrl}
          width={40}
          height={40}
          alt={selectedToken.name}
          className="min-w-[20px] min-h-[20px]"
        />
        <h1 className="text-xl text-white sm:text-2xl">{selectedToken.name}</h1>
        <div className="flex items-center">
          <ChevronDownIcon className="w-12 h-12 text-white" />
        </div>
      </div>

      {swapDrop1 && (
        <SimpleModal setModal={setSwapDrop1}>
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 2,
              maxWidth: "400px",
              width: "90%",
            }}
          >
            <div
              className="w-full mb-2 flex flex-col gap-2 p-2 bg-[#464646] rounded-lg"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.95) 0%, rgba(82, 82, 82, 0.94) 100%)",
              }}
            >
              <ChevronDownIcon className="ml-auto w-12 h-12 text-white" />
              <input
                type="text"
                placeholder="Search Currencies"
                className={montserrat.className}
                style={{
                  background: "#D9D9D94A",
                  padding: "2px 15px",
                  borderRadius: "39px",
                  color: "#FFFFFF6B",
                  marginRight: "50px",
                }}
              />
              <div
                className="custom-scroll"
                style={{
                  maxHeight: "700px",
                  overflow: "auto",
                }}
              >
                {Swaptokens.map((token) => (
                  <div
                    style={{
                      borderBottom: "2px solid #727272",
                      padding: "4px 0px",
                    }}
                  >
                    <div
                      key={token.name}
                      className="flex items-center gap-2 m-1 py-2 px-3 cursor-pointer"
                      style={{
                        borderRadius: "15px",
                        backgroundColor:
                          selectedToken.name === token.name ? "#D9D9D91A" : "",
                      }}
                      onClick={() => handleTokenSelect(token)}
                    >
                      <Image
                        src={token.imageUrl}
                        width={40}
                        height={40}
                        alt={token.name}
                      />
                      <h1
                        className={
                          "pl-3 text-2xl text-white " + catamaran.className
                        }
                      >
                        {token.fullName.toUpperCase()}
                      </h1>
                      <span
                        className={
                          "ml-auto bg-[#d9d9d94d] px-2 text-[#FFFFFFB8] rounded-lg " +
                          catamaran.className
                        }
                        style={{
                          fontSize: 13,
                          minWidth: "130px",
                          textAlign: "center",
                        }}
                      >
                        {token.network}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className={
                  "text-[#FFFFFF6B] text-sm bg-transparent " +
                  catamaran.className
                }
              >
                Load More
              </button>
            </div>
          </div>
        </SimpleModal>
      )}
    </div>
  );
};

export default TokenSelector;
