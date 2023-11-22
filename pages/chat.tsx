import ChatsList from "@/components/ChatsList";
import Conversation from "@/components/Conversation";
import Profile from "@/components/Profile";
import Settings from "@/components/Settings";
import Splash from "@/components/Splash";
import { COOKIES } from "@/lib/constants";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
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

export default function ChatPage() {
  const [data, setData] = useState<any>(undefined);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [chat, setChat] = useState<any>(undefined);
  const [currenSubs, setCurrenSubs] = useState<any>([]);
  const [updates, setUpdates] = useState<any>([]);
  const [user, setUser] = useState({});
  const convRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const updateChat = (newChat: any) => {
    const index = data?.history.findIndex((i: any) => i?.id === chat?.id);
    const history = [...data?.history];
    history.splice(index, 1, {
      ...chat,
      messages: [...(chat?.messages || []), ...newChat],
    });
    setData({ ...data, history });
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

  useEffect(() => {
    if (hasCookie(COOKIES.AUTH)) {
      const token = getCookie(COOKIES.AUTH);
      if (token) {
        (async () => {
          const promise = await fetch("/api/updates", {
            headers: {
              Authorization: token,
            },
          });
          const res = await promise.json();
          if (res.err) {
            deleteCookie(COOKIES.AUTH);
            router.replace("/");
          } else {
            setData({ token, ...res });
          }
        })();
      } else {
        router.replace("/");
      }
    } else {
      router.replace("/");
    }
  }, []);

  useEffect(() => {
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

  useEffect(() => {
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

  useEffect(() => {
    if (updates.length > 0) {
      updateChat(updates);
      setUpdates([]);
    }
  }, [updates]);

  const contact = chat?.members?.find((i: any) => i.id !== data.user_id);

  console.log(chat, "chat here");

  return (
    <main style={{ display: "flex", width: "100vw", overflowY: "hidden" }}>
      {data ? (
        <>
          <div
            className={`flex justify-center ${
              showProfile && chat ? "no-mobile" : ""
            }`}
            style={{ width: "100%" }}
          >
            <div className="flex w-full h-screen " style={{ width: "100%" }}>
              <ChatsList
                data={data}
                setChat={setChat}
                chat={chat}
                setShowSettings={setShowSettings}
              />
              <Conversation
                data={data}
                showProfile={showProfile}
                setShowProfile={() => setShowProfile(!showProfile)}
                setChat={setChat}
                chat={chat}
                setMessages={updateChat}
              />
            </div>
          </div>

          {showProfile && (
            <Profile
              setShowProfile={() => setShowProfile(false)}
              data={contact}
            />
          )}
          {showSettings && (
            <Settings setShowSettings={setShowSettings} data={data} />
          )}
        </>
      ) : (
        <Splash />
      )}
    </main>
  );
}
