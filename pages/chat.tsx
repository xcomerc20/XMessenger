import ChatsList from "@/components/Chats";
import Conversation from "@/components/Conversation";
import Profile from "@/components/Profile";

export default function ChatPage() {
  return (
    <main style={{ display: "flex" }}>
      <ChatsList />
      <Conversation />
      <Profile />
    </main>
  );
}
