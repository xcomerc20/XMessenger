import React, { Dispatch, SetStateAction } from "react";
import * as Select from "@radix-ui/react-select";
import { SelectItem } from "./SelectItem";
import { useNetwork } from "wagmi";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface Props {
  chainId: number;
  setChainId: Dispatch<SetStateAction<number>>;
}

export function ChainSelect({ chainId, setChainId }: Props) {
  const { chain } = useNetwork();

  return (
    <Select.Root onValueChange={(value) => setChainId(Number(value))}>
      <Select.Trigger
        className="z-[100] bg-[#2a3843] text-center text-white"
        aria-label="Food"
      >
        <div className="flex justify-center gap-2">
          <Select.Value
            className="[&>*]:mx-auto"
            placeholder="Ethereum Mainnet"
            defaultValue={String(chain?.id)}
          />
          <Select.Icon className="flex items-center">
            <ChevronDownIcon />
          </Select.Icon>
        </div>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="z-[100] bg-white text-black p-2 rounded-sm w-52">
          <Select.Viewport>
            <SelectItem
              className="px-4 py-2 hover:bg-slate-100 text-center"
              value="1"
            >
              Ethereum Mainnet
            </SelectItem>
            <SelectItem
              className="px-4 py-2 hover:bg-slate-100 text-center"
              value="5"
            >
              Eth Goerli Testnet
            </SelectItem>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
