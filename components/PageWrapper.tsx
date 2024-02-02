import ChatBar from "./ChatBar";
import Navbar from "./Navbar";

export default function PageWrapper({ children }: any) {
  return (
    <>
      <Navbar />
      <ChatBar />
      {children}
    </>
  );
}
