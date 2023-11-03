import { useWeb3Modal } from "@web3modal/wagmi/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAccount, useBalance, useConnect } from "wagmi";

const Header = () => {
  const { isConnected, address } = useAccount();
  const { data } = useBalance({ address });

  const { open } = useWeb3Modal();
  const [uiReady, setUiReady] = useState(false);
  useEffect(() => {
    setTimeout(() => setUiReady(true), 10000);
  }, []);

  const router = useRouter();

  return (
    <header
      style={{
        width: "100%",
        position: "fixed",
        background: "#1e2023",
        zIndex: 100,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <img
          src="/logo.jpg"
          alt=""
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            margin: "0 0 0 calc(50% - 25px) ",
          }}
        />
        {!isConnected && (
          <button
            _ngcontent-awa-c4=""
            className="btn-click"
            onClick={() => open({ view: "Connect" })}
            style={{
              fontWeight: 100,
            }}
          >
            Connect Wallet
          </button>
        )}
      </div>
      <div
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "center",
          padding: 10,
          borderTop: "2px solid #68d67c",
          margin: "auto",
        }}
      >
        <Link href="/">
          <h4 className={router.pathname === "/" ? "green" : ""}>Lock LP</h4>
        </Link>
        <Link href="/view">
          <h4 className={router.pathname === "/view" ? "green" : ""}>
            View Locks
          </h4>
        </Link>
        <Link href="/withdraw">
          <h4 className={router.pathname === "/withdraw" ? "green" : ""}>
            Withdraw
          </h4>
        </Link>
      </div>
    </header>
  );
};

export default Header;
