import { useState } from "react";
import { Modal } from "./Modal";
import { useRouter } from "next/router";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { COOKIES } from "@/lib/constants";
import { useDisconnect } from "wagmi";
import { Loader } from "./SVG";
import { montserrat } from "@/lib/fonts";

export default function Settings({ setShowSettings, data }: any) {
  const [newName, setNewName] = useState(data?.name || "Unknown User");
  const [newProfilePic, setNewProfilePic] = useState(data?.pic);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const router = useRouter();
  const { disconnect, isLoading: isDisconnecting } = useDisconnect();

  const handleSave = async () => {
    setLoading(true);
    try {
      setErr("");
      let payload: any = {};
      if (newName && newName.trim().length > 0 && newName !== data?.name) {
        payload.name = newName;
      }
      if (
        newProfilePic &&
        newProfilePic.trim().length > 0 &&
        newProfilePic !== data?.pic
      ) {
        payload.pic = newProfilePic;
      }
      const promise = await fetch("/api/settings", {
        method: "POST",
        headers: {
          Authorization: data.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const res = await promise.json();
      if (res.ok && res?.token) {
        // set cookie
        setCookie(COOKIES.AUTH, res.token);
        const cookie = getCookie(COOKIES.AUTH);

        if (cookie == res.token) {
          router.reload();
        }
      } else {
        setErr("Failed to update");
      }
    } catch (error) {
      setErr("Failed to update");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    deleteCookie(COOKIES.AUTH);
    disconnect();
    router.reload();
  };

  return (
    <>
      <Modal setModal={setShowSettings}>
        <section
          className="w-full h-[55vh] mx-auto rounded-3xl"
          style={{ textAlign: "center" }}
        >
          <h1 className={"text-white text-2xl font-bold mb-6 " + montserrat.className}>Edit Profile</h1>
          <div className="mt-6 w-fit mx-auto relative">
            <label htmlFor="file-upload" className="cursor-pointer">
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target?.result) {
                        setNewProfilePic(event.target.result as string);
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <img
                src={newProfilePic ?? "/nopic.svg"}
                className="rounded-full w-28"
                alt="profile picture"
                style={{
                  backgroundColor: "#D9D9D9",
                }}
              />
              {/* <span
                className="absolute rounded-full p-1 bg-white"
                style={{
                  bottom: -10,
                  right: 35,
                  color: "#3B3B3B",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ margin: 5 }}
                  className="lucide lucide-pencil"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </span> */}
            </label>
          </div>
          <div
            className="mt-8 flex"
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="flex"
              style={{
                border: "1px solid #BDBDBD",
                borderRadius: 12,
                background: "#BDBDBD",
                width: "80%",
              }}
            >
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className=" text-center text-[#0000009B] font-bold text-l tracking-wide bg-transparent"
                style={{
                  padding: 5,
                  width: "97%",
                  borderRadius: 4,
                  border: "none",
                }}
              />
              {/* <i className=" rounded-full p-1 text-[#3B3B3B]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ margin: 5 }}
                  className="lucide lucide-pencil"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </i> */}
            </div>
          </div>

          <span style={{ color: "red", textAlign: "center" }}>{err}</span>
          <div className="mt-4 flex flex-col items-center gap-1">
            <button
              onClick={handleSave}
              className={"px-4 py-2 rounded-full " + montserrat.className}
              style={{
                backgroundColor: "white",
                border: "1px solid #BDBDBD",
                color: "black",
                borderRadius: 8,
                width: "40%", // Set to the same width as the input
                padding: 5,
                marginTop: 20,
              }}
            >
              Save
            </button>

            <button
              onClick={handleLogout}
              className={"px-4 py-2 rounded-full border-2 border-solid border-red-500 text-white " + montserrat.className}
              style={{
                width: "40%", // Set to the same width as the input
                background: "#FF3636",
                border: "1px solid #BA0404E4",
                padding: 5,
                borderRadius: 8,
                marginTop: 10,
              }}
            >
              {isDisconnecting ? (
                <div className="flex justify-center gap-2">
                  <Loader />
                  Logging Out...
                </div>
              ) : (
                "Logout"
              )}
            </button>
          </div>
        </section>
      </Modal>
    </>
  );
}
