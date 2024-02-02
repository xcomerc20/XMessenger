import { msgIsValid, parseTime } from "@/lib/helpers";
import { MessageProps } from ".";
import { useEffect, useState } from "react";

export function ChatMessage({ aes, message, user_id }: MessageProps) {
  const [msg, setMsg] = useState("");
  useEffect(() => {
    try {
      if (message.type === "temp") {
        setMsg(message.m);
      } else {
        const decryptedMsg = aes?.decrypt(message?.m);
        setMsg(decryptedMsg);
      }
    } catch (error) {
      console.log(error);
    }
  }, [message]);

  return (
    <>
      {message.m && msgIsValid(msg) ? (
        <div
          className={`flex flex-col ${message?.s === user_id ? "items-end" : "items-start"
            } w-full h-max`}
          key={message?.id}
        >
          <div
            className={`flex flex-col min-w-[20%] max-w-[80%] h-max ${message?.s === user_id
              ? "bg-[#DADADA] rounded-br-none text-black"
              : "bg-[#3B3B3B] rounded-bl-none text-white"
              }  p-2 rounded-lg mb-3`}
          >
            <div className="flex flex-col w-full break-words">
              <span>{msg}</span>
            </div>

            <div className="flex justify-end text-[#9B9B9B] text-xs mt-1">
              <span>{message?.t ? parseTime(message.t) : ".."}</span>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
