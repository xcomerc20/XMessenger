import { useTxData } from "@/hooks";
import { getCrypt } from "@/lib/encryption";
import { msgIsValid, parseTime } from "@/lib/helpers";
import React from "react";
import SimpleAes from "simple-aes-crypto";

interface ChatItemProps {
  conv: any;
  data: any;
  chat: any;
  setChat: (conv: any) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({ conv, data, chat, setChat }) => {
  const aes: SimpleAes = conv?.key && getCrypt(conv?.key);
  const user = conv?.members.find((i: any) => i.id !== data?.user_id);
  const lastMessage =
    conv?.messages?.length > 0 && conv?.messages[conv?.messages?.length - 1];

  const { action, amount, currency } = useTxData({
    message: lastMessage,
    user_id: data?.user_id,
  });

  let text;
  if (lastMessage?.m?.startsWith("tx")) {
    text = `${action} ${amount} ${currency}`;
  } else {
    text = lastMessage?.m ? aes?.decrypt(lastMessage?.m) : "";
    if (!msgIsValid(text)) {
      text = "";
    }
  }

  return (
    <div
      key={conv?.id}
      className={`flex items-center w-full h-[4.5rem] pl-3 pr-4 hover:bg-[#2A3942] cursor-pointer ${
        chat?.id === conv?.id ? "bg-[#00000033]" : ""
      }`}
      onClick={() => setChat(conv)}
    >
      <div className="flex w-[4.8rem]">
        <div className="rounded-full w-12 h-12">
          <span
            style={{
              boxSizing: "border-box",
              display: "inline-block",
              overflow: "hidden",
              width: "initial",
              height: "initial",
              background: "none",
              opacity: 1,
              border: 0,
              margin: 0,
              padding: 0,
              position: "relative",
              maxWidth: "100%",
            }}
          >
            <span
              style={{
                boxSizing: "border-box",
                display: "block",
                width: "initial",
                height: "initial",
                background: "none",
                opacity: 1,
                border: 0,
                margin: 0,
                padding: 0,
                maxWidth: "100%",
              }}
            >
              <img
                style={{
                  display: "block",
                  maxWidth: "100%",
                  width: "initial",
                  height: "initial",
                  background: "none",
                  opacity: 1,
                  border: 0,
                  margin: 0,
                  padding: 0,
                }}
                alt=""
                aria-hidden="true"
                src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2796%27%20height=%2796%27/%3e"
              />
            </span>
            <img
              alt="Avatar Image"
              src={user?.pic || "/nopic.svg"}
              decoding="async"
              data-nimg="intrinsic"
              className="rounded-full"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                boxSizing: "border-box",
                padding: 0,
                border: "none",
                background: "#BDBDBD",
                margin: "auto",
                display: "block",
                width: 0,
                height: 0,
                minWidth: "100%",
                maxWidth: "100%",
                minHeight: "100%",
                maxHeight: "100%",
              }}
              srcSet="/nopic.svg 2x"
            />
          </span>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <hr
          style={{
            borderTop: "0px solid rgba(134,150,160,0.15)",
          }}
        />
        <div className="flex py-2">
          <div className="flex flex-col w-full h-full">
            <span className="overflow-y-hidden text-ellipsis text-white text-base">
              {conv?.name || user?.name || "Unknown User"}
            </span>
            {text && (
              <span className="overflow-y-hidden text-ellipsis text-[#aebac1] text-sm">
                {text?.slice(0, 35)}
                {text?.length > 35 && ".."}
              </span>
            )}
          </div>
          <div className="flex flex-col w-auto text-[#aebac1]">
            {lastMessage && lastMessage?.t && (
              <h1 className="text-xs">{parseTime(lastMessage?.t)}</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
