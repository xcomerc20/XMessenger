import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { hasCookie, setCookie } from "cookies-next";
import { COOKIES } from "@/lib/constants";
import Splash from "./Splash";

export default function Login() {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const [data, setData] = useState({} as any);
  const [nameInput, setInput] = useState("");
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();
  const [auth, setAuth] = useState<{
    loading?: boolean;
    nonce?: string;
    exists?: boolean;
    token?: string;
    error?: string;
  }>({});

  const fetchNonce = async () => {
    setAuth({ ...auth, loading: true });
    try {
      const nonceRes = await fetch(`/api/nonce?address=${address}`);
      const { nonce, exists } = await nonceRes.json();
      setAuth({ ...auth, nonce, exists, loading: false });
    } catch (error) {
      setAuth((x) => ({ ...x, error: "Failed to fetch", loading: false }));
    }
  };

  const signIn = async () => {
    try {
      const chainId = chain?.id;
      if (!address || !chainId) return;

      setAuth((x) => ({ ...x, loading: true }));
      // Create SIWE message with pre-fetched nonce and sign with wallet
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the X Messenger.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce: auth.nonce,
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      // Verify signature
      const verifyRes = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature, address, name: nameInput }),
      });
      const data = await verifyRes.json();
      if (verifyRes.ok && data?.token) {
        // set cookie
        setCookie(COOKIES.AUTH, data.token);
        setAuth((x) => ({
          ...x,
          token: data.token,
          loading: false,
          error: undefined,
        }));
        router.push("/chat");
      } else {
        setAuth((x) => ({
          ...x,
          loading: false,
          nonce: undefined,
          error: "Failed to login",
        }));
      }
    } catch (error) {
      setAuth((x) => ({
        ...x,
        loading: false,
        nonce: undefined,
        error: "Failed to login",
      }));
      fetchNonce();
    }
  };

  useEffect(() => {
    if (hasCookie(COOKIES.AUTH)) {
      router.replace("/chat");
    } else if (
      isConnected &&
      address &&
      !auth.nonce &&
      !auth.loading &&
      !auth.error
    ) {
      fetchNonce();
    }
  }, [isConnected, address, auth.loading, isConnected]);

  useEffect(() => {
    if (
      isConnected &&
      auth.nonce &&
      auth.exists &&
      !auth.loading &&
      !auth.error &&
      !auth.token
    ) {
      signIn();
    }
  }, [auth.nonce, auth.loading, isConnected, auth.exists]);

  return (
    <>
      {auth.loading ? (
        <Splash />
      ) : (
        <div
          className="login flex-center"
          style={{
            minHeight: auth.loading ? "100vh" : "60vh",
            width: auth.loading ? "100vw" : "400px ",
            borderRadius: auth.loading ? "0" : "1.5rem",
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
              width: auth.loading ? "5vw" : "20%",

              borderRadius: "50%",
              margin: auth.loading ? "auto" : "40px 0 0",
            }}
            alt=""
          />
          {!isConnected && (
            <>
              <h1
                style={{
                  margin: "40px 20px  0",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                Welcome Back !
              </h1>
              <p style={{ margin: 5, color: "#aaa" }}>
                Login with your Web3 wallet
              </p>
              <button onClick={() => open()} style={{ margin: 30 }}>
                Connect Wallet
              </button>
            </>
          )}
          {isConnected && !auth.loading && (
            <>
              {!auth.exists && (
                <>
                  <h3 style={{ margin: "20px  0" }}>Get Started</h3>
                  <input
                    value={nameInput}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your name"
                    style={{ marginTop: 30, width: "90%" }}
                  />
                  <button
                    onClick={() => {
                      if (nameInput.trim().length > 0) {
                        setData({ ...data, name: nameInput });
                        signIn();
                      }
                    }}
                    style={{ margin: 20 }}
                  >
                    Continue
                  </button>
                </>
              )}
              {auth.error && <h4>{auth?.error}</h4>}
            </>
          )}
        </div>
      )}
    </>
  );
}
