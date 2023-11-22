import { useState } from "react";
import Head from "next/head";
import { Modal } from "./Modal";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import { COOKIES } from "@/lib/constants";

export default function Settings({ setShowSettings, data }: any) {
  const [newName, setNewName] = useState(data?.name || "Unknown User");
  const [newProfilePic, setNewProfilePic] = useState(data?.pic || "/nopic.svg");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const router = useRouter();

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
        console.log(res.token, cookie);

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

  return (
    <>
      <Modal setModal={setShowSettings}>
        <section
          className="w-full h-[55vh] mx-auto rounded-3xl shadow-lg "
          style={{ textAlign: "center" }}
        >
          <h1 className="text-white text-xl font-bold mb-6">Edit Profile</h1>
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
                src={newProfilePic}
                className="rounded-full w-28"
                alt="profile picture"
              />
              <span
                className="absolute rounded-full p-1"
                style={{
                  bottom: 0,
                  right: 0,
                  background: "rgb(0, 156, 233)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style={{ margin: 5 }}
                  className="lucide lucide-pencil"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </span>
            </label>
          </div>
          <div
            className="mt-8 flex"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className=" text-center text-white font-bold text-l tracking-wide bg-transparent border-b border-white"
              style={{
                border: "2px solid rgb(0, 156, 233)",
                padding: 5,
                width: "70% ",
              }}
            />
            <span
              className=" rounded-full p-1"
              style={{
                margin: "0 0  0 10px",
                background: "rgb(0, 156, 233)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                style={{ margin: 5 }}
                className="lucide lucide-pencil"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
            </span>
          </div>

          <span style={{ color: "red", textAlign: "center" }}>{err}</span>
          <div className="mt-4">
            <button
              onClick={handleSave}
              className="bg-#087cad text-white px-4 py-2 rounded-full"
              style={{
                color: "white",
                background: "rgb(0, 156, 233)",
                width: "50%",
                marginTop: 20,
              }}
            >
              Save
            </button>
          </div>
        </section>
      </Modal>
    </>
  );
}
