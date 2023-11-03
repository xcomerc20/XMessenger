import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Login() {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({} as any);
  const [nameInput, setInput] = useState("");

  useEffect(() => {
    if (isConnected && address) {
      if (data?.name) {
        //router.push("/chat");
      }
    }
  }, [isConnected, address, data]);

  return (
    <div
      className="login flex-center"
      style={{
        minHeight: data?.name ? "100vh" : "60vh",
        width: data?.name ? "100vw" : "400px ",
        borderRadius: data?.name ? "0" : "1.5rem",
        background: "#0c1521",
        padding: 30,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img
        src="/logo.jpg"
        style={{
          width: data?.name ? "5vw" : "20%",

          borderRadius: "50%",
          margin: data?.name ? "auto" : "40px 0 0",
        }}
        alt=""
      />
      {!isConnected && (
        <>
          <h1 style={{ margin: "40px 20px  0" }}>Welcome Back !</h1>
          <p style={{ margin: 5, color: "#aaa" }}>
            Login with your Web3 wallet
          </p>
          <button onClick={() => open()} style={{ margin: 30 }}>
            Connect Wallet
          </button>
        </>
      )}
      {isConnected && !data?.name && (
        <>
          <h3 style={{ margin: "20px  0" }}>Get Started</h3>
          <input
            value={nameInput}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your name"
            style={{ marginTop: 30, width: "90%" }}
          />
          <button
            onClick={() => setData({ ...data, name: nameInput })}
            style={{ margin: 20 }}
          >
            Continue
          </button>
        </>
      )}
    </div>
  );
}
