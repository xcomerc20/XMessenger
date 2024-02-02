import React, { Dispatch, SetStateAction, useEffect } from "react";
import * as Select from "@radix-ui/react-select";
import { SelectItem } from "./SelectItem";
import { useNetwork } from "wagmi";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { configuredChains } from "@/lib/constants";

interface Props {
  chainId: number;
  setChainId: Dispatch<SetStateAction<number>>;
}

export function ChainSelect({ chainId, setChainId }: Props) {
  const { chain } = useNetwork();

  useEffect(() => {
    if (chain?.id) {
      if (!(chain.id in configuredChains)) {
        setChainId(1);
      } else {
        setChainId(chain.id);
      }
    }
  }, [chain]);

  return (
    <Select.Root onValueChange={(value) => setChainId(Number(value))}>
      <Select.Trigger
        className="z-[100] bg-[#6B6B6B30] text-center text-white"
        aria-label="Food"
      >
        <div className="flex justify-center gap-2">
          <Select.Value
            className="[&>*]:mx-auto"
            placeholder={
              configuredChains[chain?.id || 1] || configuredChains[1]
            }
            defaultValue={chainId}
          />
          <Select.Icon className="flex items-center">
            <ChevronDownIcon />
          </Select.Icon>
        </div>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="z-[100] bg-[#BDBDBD] text-black p-2 font-bold rounded-sm w-52">
          <Select.Viewport>
            {Object.keys(configuredChains).map((chainId, key) => (
              <SelectItem
                className="px-4 py-2 hover:bg-slate-100 text-center"
                value={chainId}
                key={key}
              >
                {configuredChains[chainId]}
              </SelectItem>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
