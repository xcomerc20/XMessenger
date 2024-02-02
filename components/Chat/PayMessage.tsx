import { parseTime } from "@/lib/helpers";
import { MessageProps } from ".";
import { Tick } from "../SVG";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useTxData } from "@/hooks";

export function PayMessage({ message, user_id }: MessageProps) {
  const { amount, currency, txDetails } = useTxData({ message, user_id });

  return (
    <div
      className={`flex flex-col ${
        message?.s === user_id ? "items-end" : "items-start"
      } w-full h-max`}
      key={message?.id}
    >
      <div
        className={`flex flex-col min-w-[25%] max-w-[80%] h-max ${
          message?.s === user_id
            ? "bg-white rounded-br-none text-black"
            : "bg-[#3B3B3B] rounded-bl-none text-white"
        }  p-2 rounded-lg  mb-3`}
      >
        <div className="flex flex-col gap-2 break-words p-4 pb-2">
          <h2 className="text-2xl font-semibold">
            {amount} {currency}
          </h2>
          <a
            className="flex justify-between items-center text-sm"
            href={txDetails}
            target="_blank"
          >
            <span className="flex items-center gap-2 capitalize">
              <Tick /> view transaction
            </span>{" "}
            <span>
              <ChevronRightIcon className="text-2xl" />
            </span>
          </a>
        </div>

        <div className="flex justify-end text-[hsla(0,0%,100%,0.6)] text-xs mt-1">
          <span>{message?.t ? parseTime(message?.t) : ".."}</span>
        </div>
      </div>
    </div>
  );
}
