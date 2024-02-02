import { COOKIES } from "@/lib/constants";
import initFire from "@/lib/initfire";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { getAuth } from "firebase-admin/auth";
import { signInWithCustomToken, signOut } from "firebase/auth";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import HamburgerSidebar from "./HamburgerSidebar";
import { useDisconnect } from "wagmi";
import { useAuth } from "@/contexts/AuthContexts";
import { useRouter } from "next/router";

export function truncateAddress(
  address: string,
  maxLength: number = 11
): string {
  if (address?.length <= maxLength) {
    return address;
  }

  const start = address.substring(0, 4);
  const end = address.substring(address.length - 4, address.length);
  return `${start}...${end}`;
}
const Navbar = () => {
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  const authContext = useAuth();
  const data = authContext ? authContext.data : null;
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const router = useRouter();
  const pathname = router.pathname;

  return (
    <>
      <div
        className="flex justify-between item-center p-5 w-full text-white cursor-pointer h-[10vh]"
        style={{
          background: "transparent",
        }}
      >
        <h3 className="opacity-0 md:opacity-100 text-white font-bold text-xl m10">
          {pathname === "/chat" && (
            <div className="flex items-center gap-3">
              <Image src="/smalllogo.png" width={20} height={20} alt="" />
              <h3 className="text-white font-bold text-xl">XMESSENGER</h3>
            </div>
          )}
          {pathname === "/" && "XMESSENGER"}
        </h3>

        {isConnected && address ? (
          <>
            <div
              className="flex items-center gap-2 rounded-full"
              style={{
                border: "1px solid #0000000F",
                background: "#FFFFFF40",
                padding: "2px 10px",
              }}
              onClick={() => setIsPopupVisible(true)}
            >
              <Image
                src={data?.pic ?? "/user.png"}
                width={15}
                height={15}
                alt="Chat Icon"
                className="rounded-full"
              />
              <h3
                className="text-white hidden md:flex font-bold"
                style={{
                  fontSize: 11,
                }}
              >
                {truncateAddress(address || "")}
              </h3>
              <Image src="/Down.png" width={20} height={20} alt="Chat Icon" />
            </div>
            {isPopupVisible && (
              <div className="fixed  top-20 right-8 flex items-center justify-center bg-gray-800 rounded-[20px] ">
                <div className="p-8 shadow-lg">
                  <h2 className="text-lg font-bold mb-4">Sign Out</h2>
                  <p className="mb-4">Are you sure you want to sign out?</p>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setIsPopupVisible(false)}
                      className="bg-[#6D6D6D00] px-4 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        disconnect();
                        deleteCookie(COOKIES.AUTH);
                        setIsPopupVisible(false);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => open()}
            style={{
              padding: "3px 13px",
              borderRadius: 17,
              backgroundColor: "#FFFFFF",
              color: "#000000",
              fontSize: 12,
            }}
          >
            CONNECT WALLET
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
