"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { truncateAddress } from "./Navbar";
import Link from "next/link";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { COOKIES } from "@/lib/constants";
import { useAuth } from "@/contexts/AuthContexts";
import { montserrat } from "@/lib/fonts";
import {
  ArchiveIcon,
  BookmarkIcon,
  CaretSortIcon,
  ExitIcon,
  GearIcon,
  InfoCircledIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

export default function HamburgerSidebar() {
  const [currentPage, setCurrentPage] = useState("/dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const pathname = router.pathname;
  const authContext = useAuth();
  const data = authContext ? authContext.data : null;
  useEffect(() => {
    setCurrentPage(router.pathname);
  }, [router.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      {isMenuOpen ? (
        <div
          ref={menuRef}
          className={
            "fixed  h-screen z-50 flex flex-col w-[80%] p-5 overflow-y-auto bg-[#222222] " +
            montserrat.className
          }
        >
          <div className="flex items-center gap-3">
            <Image src="/smalllogo.png" width={20} height={20} alt="" />
            <h3 className="text-white text-md">XMessenger</h3>
          </div>
          <div className="flex items-center justify-between w-full my-4">
            <div className="rounded-full w-1/5">
              <Image
                src="/XMessenger_White 1.png"
                className="rounded-full"
                width={50}
                height={50}
                alt=""
              />
            </div>
            <div className="flex flex-col ml-2 w-4/5">
              <h4 className="text-white text-md">
                {data?.name || "Unknown User"}
              </h4>
              <div>
                <h4 className="text-sm text-[#6D6D6D] truncate w-28">
                  {`0x${address || ""}`}
                </h4>
              </div>
            </div>
            <div
              className="flex w-1/5 items-center cursor-pointer"
              onClick={toggleMenu}
            >
              <Image src="/Arrowleft.png" width={20} height={20} alt="" />
            </div>
          </div>

          <nav className="flex flex-col gap-4 w-full">
            <Link href="/chat" onClick={() => setIsMenuOpen(false)}>
              <div className="flex items-center gap-4">
                <div style={{ width: 35, height: 35 }}></div>
                <h4 className="text-white text-md">Chat</h4>
              </div>
            </Link>
            {/* 
            <div className="flex items-center gap-4">
              <Image src="/Bookmark.svg" width={35} height={35} alt="" />
              <h4 className="text-white text-md">Saved Messages</h4>
            </div>
            <div className="flex items-center gap-4">
              <Image src="/Person.svg" width={35} height={35} alt="" />
              <h4 className="text-white text-md">Contacts</h4>
            </div>
            <div className="flex items-center gap-4">
              <Image src="/Call.svg" width={35} height={35} alt="" />
              <h4 className="text-white text-md">Calls</h4>
            </div>
            <div className="flex items-center gap-4">
              <Image src="/Mail Inbox.svg" width={35} height={35} alt="" />
              <h4 className="text-white text-md">Archived Chats</h4>
            </div>
            <div className="flex items-center gap-4">
              <Image src="/Info.svg" width={35} height={35} alt="" />
              <h4 className="text-white text-md">Xmessenger Features</h4>
            </div>
            <div className="flex items-center gap-4">
              <Image src="/Bug.svg" width={35} height={35} alt="" />
              <h4 className="text-white text-md">Report bugs</h4>
            </div> */}

            <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
              <div className="flex items-center gap-4">
                <BookmarkIcon width={20} height={20} />
                <h4 className="text-white text-md">Dashboard</h4>
              </div>
            </Link>
            <Link href="/transfer" onClick={() => setIsMenuOpen(false)}>
              <div className="flex items-center gap-4">
                <PersonIcon width={20} height={20} />
                <h4 className="text-white text-md">Saved messages</h4>
              </div>
            </Link>
            <Link href="/nodes" onClick={() => setIsMenuOpen(false)}>
              <div className="flex items-center gap-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.04952 5.25789C3.85895 4.0016 4.74556 2.87044 6.10106 2.45589C6.60025 2.30322 7.13207 2.56524 7.31521 3.05407L7.74977 4.21405C7.8928 4.59584 7.78974 5.02623 7.48929 5.30181L6.19678 6.48738C6.06735 6.6061 6.00987 6.78486 6.04509 6.95693L6.05657 7.00916C6.06371 7.04035 6.07423 7.08449 6.08841 7.13968C6.11673 7.24995 6.15987 7.40502 6.22025 7.58965C6.34038 7.95694 6.53193 8.45094 6.81693 8.94457C7.10193 9.43821 7.43397 9.85109 7.69199 10.1388C7.82169 10.2834 7.93442 10.3983 8.01575 10.4779C8.05646 10.5178 8.08943 10.549 8.11287 10.5708L8.153 10.6074C8.28441 10.7239 8.46732 10.763 8.63485 10.7102L10.3078 10.1837C10.6967 10.0613 11.121 10.1872 11.3801 10.502L12.1716 11.4634C12.501 11.8635 12.4623 12.4509 12.0832 12.8044C11.046 13.7713 9.62007 13.9694 8.62749 13.1718C7.6706 12.403 6.54446 11.2603 5.6037 9.64314C4.66075 8.02216 4.23383 6.4729 4.04952 5.25789ZM7.09257 7.02268L8.16525 6.03875C8.76615 5.48757 8.97228 4.6268 8.68622 3.86323L8.25165 2.70325C7.88315 1.71964 6.81305 1.19242 5.8086 1.49961C4.12597 2.01421 2.77493 3.52305 3.06083 5.40786C3.2605 6.72414 3.72231 8.39771 4.73931 10.146C5.75219 11.8871 6.9662 13.1198 8.00112 13.9514C9.48857 15.1466 11.4753 14.7384 12.7651 13.5358C13.5307 12.8221 13.6089 11.6359 12.9436 10.8278L12.1521 9.8664C11.6339 9.23688 10.7854 8.985 10.0076 9.22981L8.61916 9.66682C8.56576 9.61194 8.5039 9.54631 8.43643 9.47109C8.20831 9.21673 7.92295 8.86025 7.68296 8.44457C7.44296 8.02889 7.27692 7.60352 7.17071 7.27878C7.1393 7.18274 7.11339 7.09636 7.09257 7.02268Z"
                    fill="white"
                  />
                </svg>

                <h4 className="text-white text-md">Calls</h4>
              </div>
            </Link>
            <Link href="/validators" onClick={() => setIsMenuOpen(false)}>
              <div className="flex items-center gap-4">
                <ArchiveIcon width={20} height={20} />
                <h4 className="text-white text-md">Archived chats</h4>
              </div>
            </Link>
            <Link href="/treasury" onClick={() => setIsMenuOpen(false)}>
              <div className="flex items-center gap-4">
                <InfoCircledIcon width={20} height={20} />
                <h4 className="text-white text-md">XMessenger Features</h4>
              </div>
            </Link>
            <Link href="/treasury" onClick={() => setIsMenuOpen(false)}>
              <div className="flex items-center gap-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.63599 1.5C7.63599 1.22386 7.41213 1 7.13599 1C6.85984 1 6.63599 1.22386 6.63599 1.5V2.3C6.63599 2.58901 6.70811 2.86118 6.83533 3.09949C5.96934 3.35179 5.2976 4.05998 5.09729 4.94688C4.65548 4.80407 4.33594 4.38935 4.33594 3.9V2.5C4.33594 2.22386 4.11208 2 3.83594 2C3.5598 2 3.33594 2.22386 3.33594 2.5V3.9C3.33594 4.923 4.06743 5.77515 5.03589 5.96194V7H2.83594C2.5598 7 2.33594 7.22386 2.33594 7.5C2.33594 7.77614 2.5598 8 2.83594 8H5.03589V9.7C5.03589 9.80799 5.04108 9.91478 5.05122 10.0201C4.0815 10.1583 3.33594 10.9921 3.33594 12V13.5C3.33594 13.7761 3.5598 14 3.83594 14C4.11208 14 4.33594 13.7761 4.33594 13.5V12C4.33594 11.4591 4.76546 11.0184 5.30206 11.0006C5.80681 12.1764 6.97517 13 8.33589 13C9.69661 13 10.865 12.1764 11.3697 11.0006C11.9064 11.0184 12.3359 11.459 12.3359 12V13.5C12.3359 13.7761 12.5598 14 12.8359 14C13.1121 14 13.3359 13.7761 13.3359 13.5V12C13.3359 10.9921 12.5903 10.1583 11.6206 10.0201C11.6307 9.91477 11.6359 9.80799 11.6359 9.7V8H13.8359C14.1121 8 14.3359 7.77614 14.3359 7.5C14.3359 7.22386 14.1121 7 13.8359 7H11.6359V5.96196C12.6044 5.77521 13.3359 4.92303 13.3359 3.9V2.5C13.3359 2.22386 13.1121 2 12.8359 2C12.5598 2 12.3359 2.22386 12.3359 2.5V3.9C12.3359 4.38939 12.0164 4.80412 11.5745 4.94691C11.3742 4.06005 10.7025 3.35188 9.83662 3.09953C9.96386 2.86122 10.036 2.58903 10.036 2.3V1.5C10.036 1.22386 9.81213 1 9.53599 1C9.25984 1 9.03599 1.22386 9.03599 1.5V2.3C9.03599 2.6866 8.72259 3 8.33599 3C7.94939 3 7.63599 2.6866 7.63599 2.3V1.5ZM6.03594 7.5L6.03589 7.49294V5.50999L6.03599 5.5L6.03591 5.49135C6.04057 4.6669 6.71035 4 7.53589 4H9.13589C9.96432 4 10.6359 4.67157 10.6359 5.5V9.7C10.6359 10.9703 9.60614 12 8.33589 12C7.06563 12 6.03589 10.9703 6.03589 9.7V7.50706L6.03594 7.5Z"
                    fill="white"
                  />
                </svg>

                <h4 className="text-white text-md">Report Bug</h4>
              </div>
            </Link>
          </nav>

          <div className="fixed bottom-8 w-full flex flex-col gap-6">
            <div className="flex w-full items-center gap-4">
              <GearIcon width={20} height={20} />
              <h4 className="text-white text-md">Settings</h4>
            </div>
            <div
              className="flex w-full items-center gap-4"
              onClick={() => {
                disconnect();
              }}
            >
              <ExitIcon width={20} height={20} color="red" />
              <h4 className="text-red-700 font-bold text-md">Log out</h4>
            </div>
          </div>
        </div>
      ) : (
        <div className="md:hidden fixed top-3 z-50 flex items-center p-2 cursor-pointer">
          <button onClick={toggleMenu} className="text-white bg-transparent">
            <Image src="/Menu.png" width={30} height={30} alt="Menu" />
          </button>
          {pathname === "/chat" && (
            <>
              <div className="flex sm:hidden font-bold text-4xl w-full flex items-center justify-center">
                Chats
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
