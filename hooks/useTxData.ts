import { MessageProps } from "@/components";
import { erc20ABI, useContractRead, useTransaction } from "wagmi";
import { blockScanners, currencies } from "@/lib/constants";

export function useTxData({ message, user_id }: Omit<MessageProps, "aes">) {
  const [chainId, hash, tokenAddress, tokenAmount] = (
    message.m?.split(":") ?? []
  ).slice(1);

  const { data: tokenData } = useContractRead({
    abi: erc20ABI,
    address: tokenAddress as `0x${string}`,
    chainId: Number(chainId),
    functionName: "name",
  });

  const { data } = useTransaction({
    hash: hash as `0x${string}` | undefined,
    chainId: Number(chainId),
  });

  const txDetails = `${blockScanners[chainId]}/tx/${hash}`;
  const amount = tokenAmount || Number(data?.value || 0) / 1e18;
  const currency = tokenData || currencies[chainId];
  const action = message?.s === user_id ? "Sent" : "Received";

  return { txDetails, amount, currency, action };
}
