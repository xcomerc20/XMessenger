import { isAddress } from "ethers";
import { useState } from "react";
import { Modal } from "./Modal";

export default function NewChat({ data, setChat, setModal }: any) {
  const [address, setAddress] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!loading && address.length > 0) {
      const exists = data?.history?.find((i: any) =>
        i?.members?.find((u: any) => u.address === address)
      );

      if (isAddress(address) && data?.address !== address && !exists) {
        setLoading(true);
        setErr("");
        try {
          const promise = await fetch("/api/chat", {
            method: "PUT",
            headers: {
              Authorization: data.token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              address,
            }),
          });
          const res = await promise.json();
          if (res.ok) {
            setChat({
              messages: [],
              id: res.id,
              members: [
                res?.contact,
                {
                  id: data?.user_id,
                  name: data?.name,
                  pic: data?.pic,
                  address: data?.address,
                },
              ],
              owner: data?.id,
              key: res.key,
            });
            setModal(false);
          }
        } catch (error) {}
        setLoading(false);
      } else {
        setErr("Invalid address");
      }
    }
  };

  return (
    <Modal setModal={setModal}>
      <h3 style={{ marginBottom: 20, fontSize: "1.5rem", textAlign: "center" }}>
        Start New Conversation
      </h3>
      <input
        className="bg-[#BDBDBD] rounded-lg w-full px-3 py-3 text-black"
        type="text"
        placeholder="Enter an address to start messaging"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onKeyUp={(e) => (e.key === "Enter" && !loading ? handleCreate() : "")}
        disabled={loading}
      />
      <button
        onClick={handleCreate}
        className=" text-black px-4 py-2 rounded-3xl"
        style={{
          width: 150,
          marginTop: 20,
          backgroundColor: "white",
          borderRadius: 4,
        }}
        disabled={loading}
      >
        Start
      </button>
      <span style={{ marginTop: 20, color: "red" }}>{err}</span>
    </Modal>
  );
}
