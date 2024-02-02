import { msgIsValid, parseTime } from "@/lib/helpers";
import { useState } from "react";
import NewChat from "./NewChat";
import SimpleAes from "simple-aes-crypto";
import { getCrypt } from "@/lib/encryption";
import { useTxData } from "@/hooks";
import Image from "next/image";
import ChatItem from "./ChatItem";

export default function ChatsList({
  data,
  chat,
  setChat,
  setShowSettings,
}: any) {
  const [newChat, setNewChat] = useState(false);

  return (
    <div
      className={` sm:flex flex flex-col w-full h-full ${
        chat ? "no-mobile overflow-hidden" : "full-screen"
      }`}
      style={{
        borderRight: "1px solid rgba(134,150,160,0.15)",
        width: "70%",
        maxWidth: "33vw",
        background: " #000000a1",
        height: "calc(100vh - 48px)",
        overflowY: "auto",
      }}
    >
      {/* <div className="flex mt-10 mb-5 items-center justify-between w-full px-4">
        <div className="hidden md:flex flex gap-2 items-center align-bottom">
          <div className="">
            <Image src="/smalllogo.png" width={30} height={20} alt="" />
          </div>
          <h2 className="font-bold text-xl">XMESSENGER</h2>
        </div>
      </div> */}
      <div className="hidden md:flex w-full h-[80px] items-center justify-center px-3 py-2">
        <div className="flex relative justify-between w-full h-full gap-2">
          <div
            //open settings
            className="flex cursor-pointer w-10 h-10 items-center justify-center"
            onClick={() => setShowSettings(true)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.5 3C0.364583 3 0.247396 2.95052 0.148438 2.85156C0.0494792 2.7526 0 2.63542 0 2.5C0 2.36458 0.0494792 2.2474 0.148438 2.14844C0.247396 2.04948 0.364583 2 0.5 2H15.5C15.6354 2 15.7526 2.04948 15.8516 2.14844C15.9505 2.2474 16 2.36458 16 2.5C16 2.63542 15.9505 2.7526 15.8516 2.85156C15.7526 2.95052 15.6354 3 15.5 3H0.5ZM0.5 8C0.364583 8 0.247396 7.95052 0.148438 7.85156C0.0494792 7.7526 0 7.63542 0 7.5C0 7.36458 0.0494792 7.2474 0.148438 7.14844C0.247396 7.04948 0.364583 7 0.5 7H15.5C15.6354 7 15.7526 7.04948 15.8516 7.14844C15.9505 7.2474 16 7.36458 16 7.5C16 7.63542 15.9505 7.7526 15.8516 7.85156C15.7526 7.95052 15.6354 8 15.5 8H0.5ZM0.5 13C0.364583 13 0.247396 12.9505 0.148438 12.8516C0.0494792 12.7526 0 12.6354 0 12.5C0 12.3646 0.0494792 12.2474 0.148438 12.1484C0.247396 12.0495 0.364583 12 0.5 12H15.5C15.6354 12 15.7526 12.0495 15.8516 12.1484C15.9505 12.2474 16 12.3646 16 12.5C16 12.6354 15.9505 12.7526 15.8516 12.8516C15.7526 12.9505 15.6354 13 15.5 13H0.5Z"
                fill="white"
                fillOpacity="0.8956"
              />
            </svg>
          </div>
          <div className="w-full">
            <input
              style={{
                border: "1px solid",
                borderImageSource:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.0578) 90.58%, rgba(0, 0, 0, 0.1622) 100%)",
              }}
              className="w-full h-9 rounded-lg bg-[#FFFFFFB2] placeholder-[#0000009B] font text-md px-3"
              placeholder="Search"
              defaultValue=""
            />
          </div>
          <div
            // new chat
            className="flex cursor-pointer w-10 h-10 items-center justify-center sm:mr-0"
            onClick={() => setNewChat(true)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.8294 1.85355C15.0247 1.65829 15.0247 1.34171 14.8294 1.14645C14.6342 0.951184 14.3176 0.951185 14.1223 1.14645L6.12234 9.14645L5.97597 10L6.82944 9.85355L14.8294 1.85355ZM4.47589 2C3.09518 2 1.97589 3.11929 1.97589 4.5V11.5C1.97589 12.8807 3.09518 14 4.47589 14H11.4759C12.8566 14 13.9759 12.8807 13.9759 11.5V6.5C13.9759 6.22386 13.752 6 13.4759 6C13.1997 6 12.9759 6.22386 12.9759 6.5V11.5C12.9759 12.3284 12.3043 13 11.4759 13H4.47589C3.64746 13 2.97589 12.3284 2.97589 11.5V4.5C2.97589 3.67157 3.64746 3 4.47589 3H9.48048C9.75662 3 9.98048 2.77614 9.98048 2.5C9.98048 2.22386 9.75662 2 9.48048 2H4.47589Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex md:mt-0 flex-col w-full" id="conversation">
        {data?.history?.length === 0 && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <p>No conversations yet.</p>
            <button
              className="x-auto mt-10 text-l font-bold text-black bg-white rounded-lg flex "
              type="button"
              onClick={() => setNewChat(true)}
            >
              Start a new chat &nbsp;
              <svg
                width="24"
                height="24"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.8294 1.85355C15.0247 1.65829 15.0247 1.34171 14.8294 1.14645C14.6342 0.951184 14.3176 0.951185 14.1223 1.14645L6.12234 9.14645L5.97597 10L6.82944 9.85355L14.8294 1.85355ZM4.47589 2C3.09518 2 1.97589 3.11929 1.97589 4.5V11.5C1.97589 12.8807 3.09518 14 4.47589 14H11.4759C12.8566 14 13.9759 12.8807 13.9759 11.5V6.5C13.9759 6.22386 13.752 6 13.4759 6C13.1997 6 12.9759 6.22386 12.9759 6.5V11.5C12.9759 12.3284 12.3043 13 11.4759 13H4.47589C3.64746 13 2.97589 12.3284 2.97589 11.5V4.5C2.97589 3.67157 3.64746 3 4.47589 3H9.48048C9.75662 3 9.98048 2.77614 9.98048 2.5C9.98048 2.22386 9.75662 2 9.48048 2H4.47589Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        )}
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
