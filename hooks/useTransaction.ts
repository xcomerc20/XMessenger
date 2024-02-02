import { useEffect } from "react";
import { useDebounce } from "use-debounce";
import { parseEther } from "viem";
import {
  useNetwork,
  useSendTransaction,
  useSwitchNetwork,
  useWaitForTransaction,
} from "wagmi";

export function useTransaction(
  to: string,
  amount: string,
  chainId: number
  // onSuccess?: any
) {
  const [debouncedTo] = useDebounce(to, 500);
  const [debouncedAmount] = useDebounce(amount, 500);

  // const { switchNetwork } = useSwitchNetwork();
  // useEffect(() => {
  //   if (switchNetwork) {
  //     switchNetwork(chainId);
  //   }
  // }, [chainId]);

  const transactionValue = debouncedAmount
    ? parseEther(debouncedAmount)
    : undefined;

  const {
    data,
    isLoading: isPending,
    sendTransaction,
  } = useSendTransaction({
    to: debouncedTo,
    value: transactionValue,
    // onSuccess: onSuccess(),
  });

  const { isLoading, isError, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const isTransactionGoing = isLoading || isPending;

  return { data, sendTransaction, isTransactionGoing, isSuccess, isError };
}
