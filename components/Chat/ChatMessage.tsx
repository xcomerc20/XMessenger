import { parseTime } from "@/lib/helpers";
import { MessageProps } from ".";

export function ChatMessage({ aes, message, user_id }: MessageProps) {
  return (
    <div
      className={`flex flex-col ${
        message?.s === user_id ? "items-end" : "items-start"
      } w-full h-max`}
      key={message?.id}
    >
      <div
        className={`flex flex-col min-w-[20%] max-w-[80%] h-max ${
          message?.s === user_id
            ? "bg-[#087cad] rounded-br-none"
            : "bg-[#1b2434] rounded-bl-none"
        }  p-2 text-white rounded-xl  mb-3`}
      >
        <div className="flex flex-col w-full break-words">
          <span>{aes?.decrypt(message?.m)}</span>
        </div>

        <div className="flex justify-end text-[hsla(0,0%,100%,0.6)] text-xs mt-1">
          <span>{parseTime(message?.t) || ".."}</span>
        </div>
      </div>
    </div>
  );
}
