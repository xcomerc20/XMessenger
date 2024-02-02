import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

import Conversation from "@/components/ConversationWidget";

import { COOKIES } from "@/lib/constants";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/router";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import initFire from "@/lib/initfire";
import { getApps } from "firebase/app";
import ChatsPopup from "./ChatsPopup";
import { useAccount } from "wagmi";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContexts";

const ChatBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatBarRef = useRef(null); // Ref for the chat bar
  const buttonRef = useRef(null); // Ref for the floating button

  const toggleChatBar = () => setIsOpen(!isOpen);
  const authContext = useAuth();
  const data = authContext ? authContext.data : null;
  const setData = authContext ? authContext.setData : null;
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [chat, setChat] = useState<any>(undefined);
  const [currenSubs, setCurrenSubs] = useState<any>([]);
  const [updates, setUpdates] = useState<any>([]);
  const [user, setUser] = useState({});
  const [showChat, setShowChat] = useState(false);
  const convRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const redirectToChat = () => {
    router.push("/chat");
  };
  const updateChat = (newChat: any) => {
    const index = data?.history.findIndex((i: any) => i?.id === chat?.id);
    const history = [...data?.history];
    history.splice(index, 1, {
      ...chat,
      messages: [...(chat?.messages || []), ...newChat],
    });
    if (setData) {
      setData({ ...data, history });
    }
    setChat(history[index]);
    if (convRef.current) {
      const conv = convRef.current as HTMLDivElement;
      const lastMessage = conv.children[conv.childElementCount - 1];
      if (lastMessage) {
        lastMessage.scrollIntoView();
      }
    }
  };

  const handleMessageUpdate = async (
    querySnapshot: QuerySnapshot<DocumentData, DocumentData>
  ) => {
    const newChat: any = [];
    querySnapshot.docChanges().forEach((change) => {
      if (
        change.type === "added" &&
        !chat?.messages?.find((i: any) => i.id == change.doc.id)
      ) {
        newChat.push({ id: change.doc.id, ...change.doc.data() });
      } /* else if (change.type === "modified") {
        console.log("Message modified:", change.doc.data());
      } else if (change.type === "removed") {
        console.log("Message removed:", change.doc.data());
      } */
    });
    setUpdates((prev: any) => [...prev, ...newChat]);
  };

  useMemo(() => {
    initFire();
    const auth = getAuth();
    const fn = async () => {
      try {
        const promise = await fetch("/api/auth", {
          method: "GET",
          headers: {
            Authorization: data.token,
            "Content-Type": "application/json",
          },
        });
        const res = await promise.json();
        if (res.token) {
          const cred = await signInWithCustomToken(auth, res.token);
          setUser(cred.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (!auth.currentUser && chat) fn();
  }, [chat]);

  useMemo(() => {
    (async () => {
      if (user && chat?.id && !currenSubs?.includes(chat?.id)) {
        const db = getFirestore(getApps()[0]);

        const q = query(
          collection(db, "conversations", chat.id, "messages"),
          orderBy("t", "desc"),
          limit(1)
        );
        const unsubscribe = onSnapshot(q, handleMessageUpdate);
        setCurrenSubs([...currenSubs, chat.id]);
        console.log("Sub " + chat.id);

        return () => unsubscribe();
      }
    })();
  }, [chat]);

  useMemo(() => {
    if (updates.length > 0) {
      updateChat(updates);
      setUpdates([]);
    }
  }, [updates]);
  const { isConnected } = useAccount();

  const notificationCount = data?.history?.reduce((acc: any, i: any) => {
    if (i?.messages?.length > 0) {
      const last = i.messages[i.messages.length - 1];
      if (last?.from !== data.user_id && !last?.seen) {
        return acc + 1;
      }
    }
    return acc;
  }, 0);

  const contact = chat?.members?.find((i: any) => i.id !== data.user_id);
  // Close the chat bar if clicking outside of it
  const handleClickOutside = (event: MouseEvent) => {
    if (
      chatBarRef.current &&
      (chatBarRef.current as any).contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  if (router.pathname == "/chat") return <></>;
  if (!isConnected) return <> </>;

  return (
    <div>
      {/* Floating Button */}

      {/* Chat Bar */}
      {isOpen ? (
        <div
          ref={chatBarRef}
          style={{
            background: "linear-gradient(180deg,#2F2F2F 50%,#2F2F2F 100%)",
          }}
          className="fixed -bottom-10 right-0 z-50 flex flex-col w-full m-5 text-white rounded-lg h-1/2 md:w-[25%] w-[30%]"
        >
          <div
            ref={buttonRef}
            className="z-50 flex items-center justify-between w-full h-12 p-5 text-white rounded-lg cursor-pointer chat-bar z-60"
          >
            <div className="flex items-center gap-2">
              <Image
                src="/smalllogo.png"
                width={24}
                height={24}
                alt="Chat Icon"
              />
              <h3 className="text-lg font-bold text-white">XMESSENGER</h3>
            </div>
            <div
              className="flex items-center justify-end w-1/3 gap-1 p-2"
              onClick={toggleChatBar}
            >
              {notificationCount > 0 && (
                <div className="bg-[#6D6D6D] flex w-6 h-6 items-center justify-center rounded-full p-2">
                  {notificationCount}
                </div>
              )}

              <Image src="/Down.png" width={24} height={24} alt="Chat Icon" />
            </div>
          </div>
          <div className="flex items-center justify-center w-full px-0">
            {!showChat ? (
              <ChatsPopup
                data={data}
                setChat={setChat}
                chat={chat}
                setShowSettings={setShowSettings}
                setShowChat={setShowChat}
                setIsOpen={setIsOpen}
              />
            ) : (
              <Conversation
                data={data}
                setShoWChat={setShowChat}
                showProfile={showProfile}
                setShowProfile={() => setShowProfile(!showProfile)}
                setChat={setChat}
                chat={chat}
                setMessages={updateChat}
              />
            )}
          </div>
        </div>
      ) : (
        <>
          <Link href="/chat">
            <div
              ref={buttonRef}
              className="fixed z-50 flex items-center justify-between h-12 text-white rounded-lg cursor-pointer md:hidden bottom-10 right-10"
              // onClick={toggleChatBar}
            >
              <Image
                src={"/Chat Room.png"}
                width={50}
                height={50}
                alt="Chat Icon"
                onClick={redirectToChat}
              />
            </div>
          </Link>
          <div
            ref={buttonRef}
            className="fixed bottom-0 z-50 flex items-center justify-between hidden h-12 gap-1 p-5 text-white rounded-lg cursor-pointer md:flex chat-bar right-10"
            onClick={toggleChatBar}
          >
            <div className="flex items-center gap-2">
              <Image
                src="/smalllogo.png"
                width={24}
                height={24}
                alt="Chat Icon"
              />
              <h3 className="text-lg font-bold text-white">XMESSENGER</h3>
            </div>
            <div className="flex items-center justify-end w-1/3 gap-1 p-2">
              {notificationCount > 0 && (
                <div className="bg-[#6D6D6D] flex w-6 h-6 items-center justify-center rounded-full p-2">
                  {notificationCount}
                </div>
              )}

              <Image
                src="/Double Up.png"
                width={24}
                height={24}
                alt="Chat Icon"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBar;
