import React, { Dispatch, SetStateAction, useEffect } from "react";
import * as Select from "@radix-ui/react-select";
import { SelectItem } from "./SelectItem";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { mainnetTokens } from "@/lib/constants";

interface Props {
  setTokenAddress: Dispatch<SetStateAction<`0x${string}` | undefined>>;
}

export function TokenSelect({ setTokenAddress }: Props) {
  useEffect(() => {
    setTokenAddress(
      Object.values(mainnetTokens)[0] as `0x${string}` | undefined
    );
  }, []);

  return (
    <Select.Root
      onValueChange={(value) =>
        setTokenAddress(value as `0x${string}` | undefined)
      }
    >
      <Select.Trigger
        className="z-[100] border-[#2a3843] border-2 border-solid text-center text-white"
        aria-label="Food"
      >
        <div className="flex justify-center gap-2">
          <Select.Value
            className="[&>*]:mx-auto"
            placeholder={Object.keys(mainnetTokens)[0]}
            defaultValue={Object.values(mainnetTokens)[0]}
          />
          <Select.Icon className="flex items-center">
            <ChevronDownIcon />
          </Select.Icon>
        </div>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="z-[100] bg-white text-black p-2 rounded-sm w-52">
          <Select.Viewport>
            {Object.entries(mainnetTokens).map(([name, address]) => (
              <SelectItem
                className="px-4 py-2 hover:bg-slate-100 text-center"
                value={address}
              >
                {name}
              </SelectItem>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
