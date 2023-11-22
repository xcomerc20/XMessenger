import { parseTime } from "@/lib/helpers";
import { useState } from "react";
import NewChat from "./NewChat";
import SimpleAes from "simple-aes-crypto";
import { getCrypt } from "@/lib/encryption";
import { useTxData } from "@/hooks";

export default function ChatsList({
  data,
  chat,
  setChat,
  setShowSettings,
}: any) {
  const [newChat, setNewChat] = useState(false);

  // function getLastMessage(conv: any) {
  //   return (
  //     conv?.messages?.length > 0 && conv?.messages[conv?.messages?.length - 1]
  //   );
  // }

  // data?.history?.sort((conv1: any, conv2: any) => {
  //   const lastMessage1 = getLastMessage(conv1);
  //   const lastMessage2 = getLastMessage(conv2);

  //   return -(lastMessage1.t._seconds - lastMessage2.t._seconds);
  // });

  return (
    <div
      className={` sm:flex flex flex-col w-full h-full bg-[#202d36] ${
        chat ? "no-mobile overflow-hidden" : "full-screen"
      }`}
      style={{
        borderRight: "1px solid rgba(134,150,160,0.15)",
        width: "70%",
        maxWidth: "33vw",
      }}
    >
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex bg-[#202d36] w-full h-14 py-3 items-center">
          <div className="flex cursor-pointer">
            <div className="rounded-full w-10">
              <span
                onClick={() => setShowSettings(true)}
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
                  src={data?.pic || "/nopic.svg"}
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
                    margin: "auto",
                    display: "block",
                    width: 0,
                    height: 0,
                    minWidth: "100%",
                    maxWidth: "100%",
                    minHeight: "100%",
                    maxHeight: "100%",
                    backgroundColor: "#22526e",
                  }}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div
            className="flex cursor-pointer w-10 h-10 items-center justify-center"
            onClick={() => setNewChat(true)}
          >
            <svg
              viewBox="0 0 24 24"
              width={24}
              height={24}
              className="text-[#AEBAC1]"
            >
              <path
                fill="currentColor"
                d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
              />
            </svg>
          </div>
          <div
            className="flex cursor-pointer w-10 h-10 items-center justify-center"
            onClick={() => setShowSettings(true)}
          >
            <svg
              viewBox="0 0 24 24"
              width={24}
              height={24}
              className="text-[#AEBAC1]"
            >
              <path
                fill="currentColor"
                d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex bg-[#111b21] w-full h-max px-3 py-2">
        <div className="relative w-[100%] h-max">
          <div className="absolute text-[#AEBAC1] h-full w-9">
            <svg
              viewBox="0 0 24 24"
              width={24}
              height={24}
              className="left-[50%] right-[50%] ml-auto mr-auto h-full"
            >
              <path
                fill="currentColor"
                d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"
              />
            </svg>
          </div>
          <div className="">
            <input
              className="w-[100%] h-9 rounded-lg bg-[#202d36] text-white text-sm px-10"
              placeholder="Search"
              defaultValue=""
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full overflow-y-auto" id="conversation">
        {data?.history?.map((conv: any) => {
          const aes: SimpleAes = conv?.key && getCrypt(conv?.key);
          const user = conv?.members.find((i: any) => i.id !== data?.user_id);
          const lastMessage =
            conv?.messages?.length > 0 &&
            conv?.messages[conv?.messages?.length - 1];
          // const text = lastMessage && aes?.decrypt(lastMessage?.m);

          const { action, amount, currency } = useTxData({
            message: lastMessage,
            user_id: data?.user_id,
          });

          let text;
          if (lastMessage?.m?.startsWith("tx")) {
            text = `${action} ${amount} ${currency}`;
          } else {
            text = aes?.decrypt(lastMessage?.m);
          }

          return (
            <div
              key={conv?.id}
              className={`flex items-center w-full h-[4.5rem] pl-3 pr-4 hover:bg-[#2A3942] cursor-pointer ${
                chat?.id === conv?.id ? "bg-[#087cad]" : ""
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
                  <div className="flex flex-col  w-full h-full ">
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
                      <h1 className="text-xs  ">{parseTime(lastMessage?.t)}</h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {newChat && (
        <NewChat setModal={setNewChat} setChat={setChat} data={data} />
      )}
    </div>
  );
}
