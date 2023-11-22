import { useTransaction } from "@/hooks";
import { ChainSelect } from "./ChainSelect";
import { Modal } from "./Modal";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Loader } from "./SVG/Loader";
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractReads,
  useContractWrite,
  useNetwork,
} from "wagmi";
import { parseEther } from "viem";
import { TokenSelect } from "./TokenSelect";

interface Props {
  msg: string;
  setMsg: Dispatch<SetStateAction<string>>;
  contact: any;
  setModal: Dispatch<SetStateAction<boolean>>;
  handleSend: () => Promise<void>;
}

export function Pay({ contact, setModal, setMsg, handleSend, msg }: Props) {
  const [amount, setAmount] = useState("");
  const [tokenAddress, setTokenAddress] = useState<`0x${string}`>();
  const [sendCoin, setSendCoin] = useState(true);
  const [chainId, setChainId] = useState(1);
  const [err, setErr] = useState("");

  const tokenContract = {
    abi: erc20ABI,
    address: tokenAddress,
    chainId: chainId,
  };

  const {
    data: contractData,
    isError: isContractError,
    isSuccess: isContractSuccess,
    isLoading: isContractLoading,
    write,
  } = useContractWrite({
    ...tokenContract,
    functionName: "transfer",
  });

  const { data: tokenData, isFetching } = useContractRead({
    ...tokenContract,
    functionName: "symbol",
  });

  const { sendTransaction, isTransactionGoing, isSuccess, isError, data } =
    useTransaction(contact.address, amount, chainId);

  const showLoader = isTransactionGoing || isContractLoading || isFetching;
  const txSuccess = isSuccess || isContractSuccess;
  const txError = isError || isContractError;
  const chainName = chainId === 1 ? "Ethereum Mainnet" : "Goerli Testnet";
  const { chain } = useNetwork();

  function sendCrypto() {
    if (Number(amount) <= 0) {
      setErr("Please enter an amount.");
    } else if (!tokenAddress && !sendCoin) {
      setErr("Please enter a token address.");
    } else if (!tokenData && !sendCoin) {
      setErr(`No token found on ${chainName}.`);
    } else if (chain?.id !== chainId) {
      setErr(`Please switch to ${chainName} in your wallet.`);
    } else {
      if (sendCoin) {
        if (sendTransaction) {
          sendTransaction();
        }
      } else {
        write({
          args: [contact.address, parseEther(amount)],
        });
      }
    }
  }

  useEffect(() => {
    let txHash: string | undefined;

    if (isSuccess) {
      txHash = data?.hash;
    } else if (isContractSuccess) {
      txHash = contractData?.hash;
    } else if (txError) {
      setErr("Transaction failed, might be due to a lack of funds.");
    }

    if (txSuccess || txError) {
      let newMsg = `tx:${chainId}:${txHash}`;
      if (!sendCoin) {
        newMsg += `:${tokenAddress}:${amount}`;
      }
      setMsg(newMsg);
    }
  }, [txSuccess, txError]);

  useEffect(() => {
    if (txSuccess) {
      handleSend();
    }
  }, [msg]);

  useEffect(() => {
    setErr("");
  }, [amount, tokenAddress]);

  return (
    <Modal setModal={setModal}>
      <h3 style={{ marginBottom: 20, fontSize: "1.5rem", textAlign: "center" }}>
        Pay
      </h3>

      <div className="flex flex-col gap-4 w-72">
        {err && <span style={{ color: "red" }}>{err}</span>}
        <div className="flex gap-4 justify-center">
          <button
            className={`px-4 py-2 w-1/2 transition-all ${
              !sendCoin ? "bg-[#2a3843]" : ""
            }`}
            onClick={() => setSendCoin(true)}
          >
            Coin
          </button>
          <button
            className={`px-4 py-2 w-1/2 transition-all ${
              sendCoin ? "bg-[#2a3843]" : ""
            }`}
            onClick={() => setSendCoin(false)}
          >
            Token
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex relative">
            <input
              className="bg-[#2a3843] px-3 py-3 text-white appearance-none outline-none w-full"
              type="text"
              value={amount}
              placeholder="Amount"
              onChange={(e) => {
                const inputAmount = e.target.value;

                if (!isNaN(Number(inputAmount))) {
                  setAmount(inputAmount);
                }
              }}
            />

            {tokenData && !sendCoin && (
              <div className="flex items-center px-2 absolute right-3 top-1/2 -translate-y-1/2 bg-[#2a3843]">
                {tokenData}
              </div>
            )}
          </div>

          {!sendCoin && (
            <>
              <input
                type="text"
                value={tokenAddress}
                className="bg-[#2a3843] px-3 py-3 text-white appearance-none outline-none"
                placeholder="ERC20 Token Address"
                onChange={(e) =>
                  setTokenAddress(e.target.value as `0x${string}`)
                }
              />

              {chainId === 1 && (
                <TokenSelect setTokenAddress={setTokenAddress} />
              )}
            </>
          )}
        </div>

        <ChainSelect chainId={chainId} setChainId={setChainId} />
      </div>

      <button
        onClick={sendCrypto}
        className="bg-#087cad text-white px-4 py-2 rounded-3xl flex items-center justify-center"
        style={{ width: 150, marginTop: 20 }}
        disabled={showLoader}
      >
        {showLoader ? <Loader /> : txSuccess ? <>Sent!</> : <>Send</>}
      </button>
    </Modal>
  );
}
