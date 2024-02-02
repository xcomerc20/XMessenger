import { getCrypt } from "@/lib/encryption";
import { msgIsTransaction, parseTime } from "@/lib/helpers";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { useEffect, useState } from "react";
import SimpleAes from "simple-aes-crypto";
import { Pay } from "./Pay";
import { Message } from "./Chat";

export default function Conversation({
  data,
  showProfile,
  setShowProfile,
  chat,
  setChat,
  setShoWChat,
  setMessages,
  convRef,
}: any) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const contact = chat?.members?.find((i: any) => i.id !== data.user_id);
  const aes: SimpleAes = chat?.key && getCrypt(chat?.key);

  useEffect(() => {
    setMsgs(chat?.messages);
  }, [chat]);

  const getChat = async () => {
    try {
      const promise = await fetch(`/api/chat?conv=${chat?.id}`, {
        headers: {
          Authorization: data.token,
          "Content-Type": "application/json",
        },
      });
      const res = await promise.json();
      if (res.ok) {
        setMessages(res?.messages);
      }
    } catch (error) {
      console.log("Failed to send");
    }
  };

  const handleSend = async () => {
    if (msg.length > 0 && !loading) {
      const tempMsg = {
        type: "temp",
        s: data?.user_id,
        m: msg,
      };

      setMsgs([...msgs, tempMsg]);
      setMsg("");

      setLoading(true);
      try {
        const promise = await fetch("/api/chat", {
          method: "POST",
          headers: {
            Authorization: data.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            msg: {
              m: !msg.startsWith("tx") ? aes?.encrypt(msg) : msg,
              c: chat.id,
            },
          }),
        });
        const res = await promise.json();

        if (res.ok) {
          setMsg("");
          setShowPay(false);
          if (!chat?.messages || chat?.messages?.length == 0) {
            getChat();
          }
        }
      } catch (error) {
        console.log("Failed to send");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chat) {
      setLoading(false);
    }
  }, [chat]);

  return (
    <div
      className={`flex w-full h-full bg-black ${
        !chat || showProfile ? "no-mobile" : ""
      }`}
    >
      {chat ? (
        <div
          className="flex flex-col w-full overflow-hidden"
          onKeyUp={(e) => e.key === "Escape" && setChat(undefined)}
          tabIndex={0}
        >
          <div
            className="flex justify-between w-full px-4 bg-[#222222]"
            style={{ alignItems: "center" }}
          >
            <div className="back" onClick={() => setShoWChat(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-left"
                onClick={() => setChat(undefined)}
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </div>
            <div
              className="flex justify-between bg-[#222222] w-full h-14"
              onClick={setShowProfile}
            >
              <div className="flex items-center gap-4 h-full">
                <div className="rounded-full w-10 h-10">
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
                        alt=""
                        aria-hidden="true"
                        src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2796%27%20height=%2796%27/%3e"
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
                      />
                    </span>
                    <img
                      alt="Avatar Image"
                      srcSet="/nopic.svg 2x"
                      src={contact?.name ?? "/nopic.svg"}
                      decoding="async"
                      data-nimg="intrinsic"
                      className="rounded-full "
                      style={{
                        position: "absolute",
                        inset: 0,
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
                        backgroundColor: "#BDBDBD",
                      }}
                    />
                  </span>
                </div>
                <h1 className="text-white font-normal">{contact?.name}</h1>
              </div>
              <div className="flex items-center text-[#8696a0] gap-2">
                <svg
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                >
                  <path
                    fill="currentColor"
                    d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
                  />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                >
                  <path
                    fill="currentColor"
                    d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            ref={convRef}
            className="flex flex-col w-full h-full px-10 py-6 overflow-y-auto  bg-[#000000]"
            style={{
              backdropFilter: "blur(52px)",
              background: "transparent",
            }}
          >
            {msgs?.map((message: any) => (
              <Message aes={aes} message={message} user_id={data?.user_id} />
            ))}
          </div>

          {showEmoji && (
            <EmojiPicker
              height={"60vh"}
              width={"100%"}
              onEmojiClick={(e) => setMsg(msg + e.emoji)}
              previewConfig={{ showPreview: false }}
              emojiStyle={EmojiStyle.APPLE}
            />
          )}
          {showPay && (
            <Pay
              msg={msg}
              setMsg={setMsg}
              contact={contact}
              setModal={setShowPay}
              handleSend={handleSend}
            />
          )}
          <footer className="flex items-center mx-1 mb-1 mt-4 w-full h-12 py-3 text-[#00000099]">
            <div className="fixed flex w-[22%] mb-10">
              <div className="flex w-full items-center mb-4 rounded-full bg-[#BDBDBD] w-[95%] mr-3">
                <div className="flex ml-2 gap-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.82844 10.4853L10.4853 4.82842C11.6569 3.65684 13.5564 3.65684 14.7279 4.82842C15.8995 5.99999 15.8995 7.89948 14.7279 9.07106L8.01042 15.7886C7.42463 16.3744 6.47488 16.3744 5.8891 15.7886C5.30331 15.2028 5.30331 14.253 5.8891 13.6673L11.8995 7.65684C12.0948 7.46158 12.0948 7.145 11.8995 6.94974C11.7042 6.75448 11.3877 6.75448 11.1924 6.94974L5.18199 12.9601C4.20568 13.9365 4.20568 15.5194 5.18199 16.4957C6.1583 17.472 7.74121 17.472 8.71752 16.4957L15.435 9.77816C16.9971 8.21607 16.9971 5.68341 15.435 4.12131C13.8729 2.55921 11.3403 2.55921 9.77818 4.12131L4.12133 9.77816C3.92607 9.97343 3.92607 10.29 4.12133 10.4853C4.31659 10.6805 4.63318 10.6805 4.82844 10.4853Z"
                      fill="#212121"
                    />
                  </svg>
                </div>
                <div
                  className="flex w-[90%] h-12 ml-3"
                  style={{ background: "#535353" }}
                >
                  <input
                    type="text"
                    className="bg-[#535353] rounded-lg w-full px-3 py-3 text-[#fff]"
                    placeholder="Write a message.."
                    value={!msgIsTransaction(msg) ? msg : ""}
                    onChange={(e) => setMsg(e.target.value)}
                    onKeyUp={(e) =>
                      e.key === "Enter" && !loading ? handleSend() : ""
                    }
                    disabled={loading}
                  />
                </div>
                <div className="flex py-1 pl-5 gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="cursor-pointer"
                    onClick={() => setShowPay(!showPay)}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                    <path d="M12 18V6" />
                  </svg>
                </div>
                <div className="flex py-1 pl-5 gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                    onClick={() => setShowEmoji(!showEmoji)}
                  >
                    <path
                      fill={showEmoji ? "#fff" : "currentColor"}
                      d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
                    />
                  </svg>
                </div>
                <div className="flex py-1 pl-5 pr-2 gap-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.0282 13C11.6851 13 13.0282 11.6568 13.0282 9.99998V5C13.0282 3.34315 11.6851 2 10.0282 2C8.37134 2 7.0282 3.34315 7.0282 5V9.99998C7.0282 11.6568 8.37134 13 10.0282 13ZM10.0282 12C8.92363 12 8.0282 11.1046 8.0282 9.99998V5C8.0282 3.89543 8.92363 3 10.0282 3C11.1328 3 12.0282 3.89543 12.0282 5V9.99998C12.0282 11.1046 11.1328 12 10.0282 12ZM5.0282 9.49998C5.30434 9.49998 5.5282 9.72384 5.5282 9.99998C5.5282 12.4853 7.54292 14.5 10.0282 14.5C12.5135 14.5 14.5282 12.4853 14.5282 9.99998C14.5282 9.72384 14.7521 9.49998 15.0282 9.49998C15.3043 9.49998 15.5282 9.72384 15.5282 9.99998C15.5282 12.869 13.3314 15.2249 10.5282 15.4776V17.5C10.5282 17.7761 10.3043 18 10.0282 18C9.75206 18 9.5282 17.7761 9.5282 17.5V15.4776C6.72495 15.2249 4.5282 12.869 4.5282 9.99998C4.5282 9.72384 4.75206 9.49998 5.0282 9.49998Z"
                      fill="#212121"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex justify-center items-center w-[5%] h-12">
                <img
                  src="/sendBtn.png"
                  alt=""
                  style={{
                    borderRadius: "50%",
                    height: 40,
                    position: "fixed",
                    width: 40,
                    marginLeft: 24,
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          </footer>
        </div>
      ) : (
        <div className="chatPlaceholder" style={{ width: "100%" }}></div>
      )}
    </div>
  );
}
