import { CheckIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import React, { ReactNode, Ref, forwardRef } from "react";

interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof Select.Item> {
  children: ReactNode;
  className?: string;
}

export const SelectItem = forwardRef(
  (
    { children, className, ...props }: SelectItemProps,
    forwardedRef: Ref<HTMLDivElement>
  ) => {
    return (
      <Select.Item className={className} {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
