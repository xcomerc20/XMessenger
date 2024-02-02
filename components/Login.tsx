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

  const [showSignMsgWarning, setSignMsgWarning] = useState(false);

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
      setSignMsgWarning(true);
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      setSignMsgWarning(false);
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
      // router.replace("/chat");
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
        <Splash
          message={showSignMsgWarning ? "Sign message in your wallet" : ""}
        />
      ) : (
        <div
          className="login flex-center items-center justify-center"
          style={{
            height: auth.loading ? "100vh" : "380px",
            width: auth.loading ? "100vw" : "400px ",
            border: "1px solid #0000005E",
            borderRadius: auth.loading ? "0" : "36px",
            padding: 30,
            boxShadow: "2px 4px 4px 4px #FFFFFF29",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            background: "#6B6B6B30",
          }}
        >
          <h3
            style={{
              color: "#FFFFFF",
              marginTop: 30,
              marginBottom: "30px",
              fontSize: 15
            }}
          >
            CruxDecussata Presents
          </h3>
          <img
            src="/newlogo.png"
            style={{
              width: 175,
              height: 140,
              marginBottom: 20,
            }}
            alt=""
          />
          {!isConnected && (
            <>
              {/* <h1
                style={{
                  marginTop: 35,
                  fontSize: 24,
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                WELCOME
              </h1> */}
              {/* <p style={{ margin: 5, color: "#6D6D6D", fontSize: 16 }}>
                Login with your Web3 wallet
              </p> */}
              <button
                onClick={() => open()}
                style={{
                  margin: "10px 0 5px 0",
                  padding: "3px 40px",
                  borderRadius: 4,
                  fontSize: 15,
                  color: "#000000",
                  background:
                    "linear-gradient(180deg, #FFFFFF 0%, #999999 100%)",
                }}
              >
                CONNECT WALLET
              </button>
              <h3
                style={{
                  marginBottom: 20,
                  color: "#FFFFFF",
                }}
              >
                Connect wallet to continue
              </h3>
            </>
          )}
          {isConnected && !auth.loading && (
            <>
              {!auth.exists && (
                <>
                  <h3
                    style={{
                      margin: "5px 0px",
                      width: 236,
                      fontSize: 20,
                    }}
                  >
                    Create Your Username
                  </h3>
                  <input
                    value={nameInput}
                    onChange={(e) => setInput(e.target.value)}
                    style={{
                      width: "80%",
                      backgroundColor: "#BDBDBD",
                      color: "#000000",
                      borderRadius: 10,
                      height: 30,
                      fontSize: 12,
                      padding: "18px 10px",
                      marginBottom: 10
                    }}
                  />
                  <button
                    onClick={() => {
                      if (nameInput.trim().length > 0) {
                        setData({ ...data, name: nameInput });
                        signIn();
                      }
                    }}
                    style={{
                      marginBottom: 30,
                      background: "linear-gradient(180deg, #FFFFFF 0%, #999999 100%)",
                      color: "#000000",
                      padding: "2px 6px",
                      borderRadius: 6,
                    }}
                  >
                    Create Account
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
