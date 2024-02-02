import { Modal } from "@/components/Modal";
import Splash from "@/components/Splash";
import TransferUIElement from "@/components/TransferUIElement";
import Image from "next/image";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/zoom.css";
import TokenSelector, { Swaptokens } from "@/components/TokenSelector";
import { tokens, Token } from "@/components/TransferSelector";
import PageWrapper from "@/components/PageWrapper";
import { montserrat } from "@/lib/fonts";

export default function Transfer() {
  const [mode, setMode] = React.useState("swap");
  const [sendDrop, setSendDrop] = React.useState(false);
  const [swapAmount, setSwapAmount] = React.useState(0);
  const [receiveAmount, setReceiveAmount] = React.useState(0);
  const { isConnected } = useAccount();

  const [showSlippageModal, setShowSlippageModal] = React.useState(false);
  const [slippage, setSlippage] = React.useState(3);

  const [sendToken, setSendToken] = React.useState<Token>(tokens[0]);
  const [receiveToken, setReceiveToken] = React.useState<Token>(tokens[1]);
  useEffect(() => {
    if (sendToken === receiveToken) {
      setReceiveToken(tokens[(tokens.indexOf(sendToken) + 1) % tokens.length]);
    }
  }, [sendToken, receiveToken]);
  useEffect(() => {
    if (mode === "swap") {
      setSendToken(Swaptokens[1]);
      setReceiveToken(Swaptokens[0]);
    } else {
      setSendToken(tokens[0]);
      setReceiveToken(tokens[1]);
    }
  }, [mode]);
  if (!isConnected) {
    return <Splash />;
  }

  return (
    <PageWrapper>
      <div
        className="flex-col w-full h-[90vh] px-4 overflow-auto bg-black sm:px-8 lg:px-14"
        style={{
          color: "#fff",
          background: "linear-gradient(180deg, #000000 0%, #222222 100%)",
        }}
      >
        {showSlippageModal && (
          <Modal setModal={setShowSlippageModal}>
            <div className="p-4 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-bold text-white">Set Slippage</h2>
              <input
                type="range"
                min={1}
                max={50}
                value={slippage}
                onChange={(e) => setSlippage(Number(e.target.value))}
                className="w-full mt-4"
              />
              <p className="mt-2 text-white">Slippage: {slippage}%</p>
            </div>
          </Modal>
        )}

        <div
          className="w-full h-auto p-6 bg-center bg-cover rounded-lg mt-2"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url('/transferbg.png')",
          }}
        >
          <h1 className="text-xl font-thin text-white sm:text-3xl">
            Untraceable
          </h1>
          <h1 className="text-3xl font-bold text-white sm:text-6xl">
            Cryptocurrency
            <br /> Transfer
          </h1>
        </div>
        <div className="flex flex-col items-center h-full">
          <div className="flex flex-col items-center justify-center w-full gap-4 p-4 mt-10 sm:p-10 sm:mt-20 sm:gap-8">
            <h1 className="text-4xl font-bold text-center sm:text-6xl">
              {mode === "swap" ? "Swap" : "Send"} Tokens
            </h1>
            <p
              className={
                "max-w-3xl text-lg font-thin text-center sm:text-2xl " +
                montserrat.className
              }
              style={{
                color: "#FFFFFF",
              }}
            >
              Swap, send, or bridge tokens effortlessly, and privately.
              XMessenger delivers secure, low cost transactions that leave no
              trace between the sending and receiving addresses.
            </p>
          </div>
          <div className="flex flex-col items-center w-full gap-4 p-4 sm:w-3/4 lg:w-2/3 xl:w-1/2">
            <div className="flex items-center justify-between w-full mb-4 sm:mb-0">
              <div className="flex gap-4">
                <button
                  className="w-16 px-0 py-2 font-bold text-white rounded-md md:w-24"
                  style={{
                    background: mode === "swap" ? "#474747" : "transparent",
                    color: "#FFFFFF80",
                  }}
                  onClick={() => setMode("swap")}
                >
                  Swap
                </button>
                <button
                  className="w-16 px-0 py-2 font-bold text-white rounded-md md:w-24"
                  style={{
                    background: mode === "send" ? "#474747" : "transparent",
                    color: "#FFFFFF80",
                  }}
                  onClick={() => setMode("send")}
                >
                  Send
                </button>
              </div>
              {mode === "swap" && (
                <div
                  className="flex justify-center items-center h-full gap-4 bg-[#FFC7004D]/30 rounded-md px-4 py-2 cursor-pointer"
                  onClick={() => setShowSlippageModal(true)}
                >
                  <h3 className="text-[#FFC700] text-sm sm:text-base">
                    {slippage}% Slippage
                  </h3>
                  <Image src="/Settings.png" width={30} height={30} alt="" />
                </div>
              )}
            </div>
            {mode === "swap" && (
              <div className="relative flex flex-col items-center w-full gap-10">
                <div className="w-full py-2 pl-8 bg-gray-800 card rounded-3xl">
                  <div className="flex justify-between min-w-[120px]">
                    <div className="flex flex-col gap-3 mb-4 w-[50%] sm:w-1/3 sm:mb-0">
                      <h3
                        className={
                          "text-md sm:text-lg text-[#FFFFFF80] font-semibold " +
                          montserrat.className
                        }
                      >
                        Sell
                      </h3>
                      <input
                        type="number"
                        className="p-0 text-3xl font-bold sm:text-4xl bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={receiveAmount}
                        onChange={(e) =>
                          setReceiveAmount(Number(e.target.value))
                        }
                      />{" "}
                      <h3
                        className={
                          "text-md font-semibold sm:text-lg text-[#FFFFFF80] " +
                          montserrat.className
                        }
                      >
                        $0
                      </h3>
                    </div>
                    <div className="flex flex-col items-end w-full gap-3 sm:w-1/3 sm:static -ml-10 sm:ml-0">
                      <TokenSelector
                        token={sendToken}
                        setToken={setSendToken}
                        otherToken={receiveToken}
                      />
                      <p
                        className={
                          "text-sm text-right font-semibold text-[#FFFFFF80] self-end pr-4 " +
                          montserrat.className
                        }
                      >
                        Balance: 0{" "}
                        <span className="text-bold text-white">Max</span>
                      </p>
                    </div>
                  </div>
                </div>
                <Image
                  className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1"
                  src="/swap.png"
                  width={70}
                  height={70}
                  alt=""
                  onClick={() => {
                    setSendToken(receiveToken);
                    setReceiveToken(sendToken);
                  }}
                />
                <div className="w-full py-2 pl-8 bg-gray-800 card rounded-3xl">
                  <div className="flex justify-between">
                    <div className="flex flex-col w-[50%] gap-3 mb-4 sm:mb-0">
                      <h3
                        className={
                          "text-md sm:text-lg text-[#FFFFFF80] font-semibold " +
                          montserrat.className
                        }
                      >
                        Sell
                      </h3>
                      <input
                        type="number"
                        className="p-0 text-3xl font-bold sm:text-4xl bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={swapAmount}
                        onChange={(e) => setSwapAmount(Number(e.target.value))}
                        style={{ appearance: "textfield" }}
                      />
                      <h3
                        className={
                          "text-md font-semibold sm:text-lg text-[#FFFFFF80] " +
                          montserrat.className
                        }
                      >
                        $0
                      </h3>
                    </div>
                    <div className="flex flex-col items-end w-full gap-3 sm:w-1/3 sm:static -ml-10 sm:ml-0">
                      <TokenSelector
                        token={receiveToken}
                        setToken={setReceiveToken}
                        otherToken={sendToken}
                      />
                      <p
                        className={
                          "text-sm text-right font-semibold text-[#FFFFFF80] self-end pr-12 " +
                          montserrat.className
                        }
                      >
                        Balance: 0
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {mode === "send" && (
              // <div
              //   className="flex gap-4 m-10 flex-col lg:flex-row"
              //   style={{ color: "rgb(179 187 202)" }}
              // >
              //   <div
              //     className="from flex gap-8 p-[44px] w-[380px]  rounded-[10px]"
              //     style={{ border: "2px solid #fff", borderBottomWidth: 5 }}
              //   >
              //     <TransferSelectorPopup
              //       label="YOU SEND"
              //       initialToken={sendToken}
              //       setToken={setSendToken}
              //       onTokenSelect={setSendToken}
              //     />
              //   </div>
              //   {/* New div with left arrow */}
              //   <div
              //     className="flex items-center justify-center"
              //     onClick={() => {
              //       setSendToken(receiveToken);
              //       setReceiveToken(sendToken);
              //     }}
              //   >
              //     <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
              //       <svg
              //         xmlns="http://www.w3.org/2000/svg"
              //         className="w-6 h-6 text-black"
              //         fill="none"
              //         viewBox="0 0 24 24"
              //         stroke="currentColor"
              //       >
              //         <path
              //           strokeLinecap="round"
              //           strokeLinejoin="round"
              //           strokeWidth="2"
              //           d="M9 5l7 7-7 7"
              //         />
              //       </svg>
              //     </div>
              //   </div>
              //   <div
              //     className="to flex gap-8 p-[44px] w-[380px] rounded-[10px]"
              //     style={{ border: "2px solid #fff", borderBottomWidth: 5 }}
              //   >
              //     <TransferSelectorPopup
              //       label="YOU RECEIVE"
              //       initialToken={receiveToken}
              //       setToken={setReceiveToken}
              //       onTokenSelect={setReceiveToken}
              //     />
              //   </div>
              // </div>
              <div className="w-full">
                <h2 style={{ padding: 10 }}>From</h2>
                <div className="w-full py-5 pl-8 card rounded-3xl">
                  <div className="flex justify-between min-w-[120px]">
                    <div className="flex flex-col item-center gap-2 mb-4 w-full sm:w-1/2 sm:mb-0">
                      <h3
                        className={
                          "text-md sm:text-lg text-[#FFFFFF80] font-semibold " +
                          montserrat.className
                        }
                      >
                        Wallet Address :
                      </h3>
                      <h3
                        className={
                          "text-sm sm:text-md text-white font-semibold truncate " +
                          montserrat.className
                        }
                      >
                        0x1A2345678B9C012DE345678FG90H1I234567JK8L90
                      </h3>
                    </div>
                    <div className="hidden lg:flex flex-col items-end w-full gap-3 sm:w-1/3 sm:static -ml-10 sm:ml-0">
                      <TokenSelector
                        token={sendToken}
                        setToken={setSendToken}
                        otherToken={receiveToken}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full py-2 pl-8 bg-gray-800 card rounded-3xl mt-10">
                  <div className="flex justify-between min-w-[120px]">
                    <div className="flex flex-col gap-3 mb-4 w-[50%] sm:w-1/3 sm:mb-0">
                      <h3
                        className={
                          "text-md sm:text-lg text-[#FFFFFF80] font-semibold " +
                          montserrat.className
                        }
                      >
                        Amount
                      </h3>
                      <input
                        type="number"
                        className="p-0 text-3xl font-bold sm:text-4xl bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        value={receiveAmount}
                        onChange={(e) =>
                          setReceiveAmount(Number(e.target.value))
                        }
                      />{" "}
                      <h3
                        className={
                          "text-md font-semibold sm:text-lg text-[#FFFFFF80] " +
                          montserrat.className
                        }
                      >
                        $0
                      </h3>
                    </div>
                    <div className="flex flex-col mt-auto items-end w-full">
                      <div className="flex flex-col items-end w-full gap-3 sm:w-1/3 sm:static -ml-10 sm:ml-0 lg:hidden mb-5">
                        <TokenSelector
                          token={sendToken}
                          setToken={setSendToken}
                          otherToken={receiveToken}
                        />
                      </div>
                      <p
                        className={
                          "text-sm text-right font-semibold text-[#FFFFFF80] pr-4 " +
                          montserrat.className
                        }
                      >
                        Balance: 10.07834601{" "}
                        <span className="text-bold text-white">Max</span>
                      </p>
                    </div>
                  </div>
                </div>
                <h2 style={{ padding: 10, marginTop: 20 }}>To</h2>
                <div className="w-full py-5 pl-8 card rounded-3xl">
                  <div className="flex justify-between min-w-[120px]">
                    <input
                      type="text"
                      className={
                        "text-[#FFFFFF80] w-full py-4 text-sm font-bold bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none " +
                        montserrat.className
                      }
                      value={""}
                      onChange={() => {}}
                      placeholder="Enter public address (0x) or ENS name"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-full px-4 sm:w-3/4 lg:w-2/3 xl:w-1/2">
            <button
              className="btn-box w-full py-1 mx-auto mt-4 text-3xl font-bold text-black bg-white rounded-lg h-fit"
              type="button"
            >
              {mode === "send" ? "Continue" : "Enter Amount"}
            </button>
          </div>

          <div
            className={
              "w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 " + montserrat.className
            }
          >
            <div
              className={
                "mx-4 bg-[#434343] text-[#FFFFFF] mt-10 p-5 rounded-lg " +
                montserrat.className
              }
            >
              <p style={{ overflowWrap: "anywhere" }}>
                Receiving Wallet: 0x1A2345678B9C0123De4567890fg12h3i45678Jk9l01
              </p>
              <p>Status: Transaction Pending</p>
            </div>
          </div>

          <TransferUIElement />
        </div>
      </div>
    </PageWrapper>
  );
}
