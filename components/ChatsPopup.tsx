import { msgIsValid, parseTime } from "@/lib/helpers";
import { useState } from "react";
import NewChat from "./NewChat";
import SimpleAes from "simple-aes-crypto";
import { getCrypt } from "@/lib/encryption";
import { useTxData } from "@/hooks";
import Image from "next/image";
import ChatItem from "./ChatItem";

export default function ChatsPopup({
  data,
  chat,
  setChat,
  setShowChat,
  setIsOpen,
}: any) {
  const [newChat, setNewChat] = useState(false);

  return (
    <div
      className={` sm:flex flex flex-col w-full h-full ${
        chat ? "no-mobile overflow-hidden" : "full-screen"
      }`}
      style={{
        borderRight: "1px solid rgba(134,150,160,0.15)",
        maxWidth: "33vw",
        background: "linear-gradient(#000000, #222222)",
      }}
    >
      <div className="flex flex-col w-full overflow-y-auto" id="conversation">
        {data?.history?.reverse().map((conv: any) => (
          <ChatItem
            key={conv?.id}
            conv={conv}
            data={data}
            chat={chat}
            setChat={setChat}
          />
        ))}
      </div>
      {newChat && (
        <NewChat setModal={setNewChat} setChat={setChat} data={data} />
      )}
    </div>
  );
}
