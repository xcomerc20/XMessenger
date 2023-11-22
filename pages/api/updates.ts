import { validateAuth } from "@/lib/auth";
import getDatabase from "@/lib/firebase";
import { compareTime } from "@/lib/helpers";
import {
  DocumentReference,
  FieldPath,
  Timestamp,
} from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;
  switch (method) {
    case "GET": {
      try {
        const data = await validateAuth(req, res);
        if (data?.user_id && data?.name) {
          const db = getDatabase();

          // Get chats

          const chats = await db
            .collection("conversations")
            .where("members", "array-contains", data.user_id)
            .get();
          const chatData: any[] = [];
          chats.forEach((i) => chatData.push({ ...i.data(), id: i.id }));

          // Get messages
          const messagesRef = await db
            .collectionGroup("messages")
            .where(
              "c",
              "in",
              chatData.map((i) => i.id)
            )
            .orderBy("t", "desc")
            .limit(100)
            .get();
          const messagesData: any = {};
          messagesRef.forEach((i: any) => {
            const m = { ...i.data(), id: i.id };
            if (messagesData[m?.c]) {
              messagesData[m.c].push(m);
            } else {
              messagesData[m.c] = [m];
            }
          });

          // Get contacts
          const userIds: string[] = [];
          chatData.map((i) =>
            userIds.push(...i?.members?.filter((x: any) => x !== data.user_id))
          );

          const usersRef = await db
            .collection("users")
            .where(FieldPath.documentId(), "in", userIds)
            .select("name", "pic", "address")
            .get();

          const userData: any[] = [];
          usersRef.forEach((i) => userData.push({ ...i.data(), id: i.id }));

          // Merge data

          const history: any[] = chatData
            .map((i) => ({
              ...i,
              messages:
                messagesData[i.id]?.sort((a: any, b: any) =>
                  compareTime(a.t, b.t)
                ) || [],
              members: i.members.map((m: string) => {
                const members = userData.find((u) => u.id === m) || {};

                return {
                  id: m,
                  ...members,
                };
              }),
            }))
            .sort((a, b) =>
              a.messages.length > 0 && b.messages.length > 0
                ? compareTime(a.messages[0].t, b.messages[0].t)
                : 0
            );

          return res.send({ ...data, history });
        } else {
          return res.send({ err: "No name" });
        }
      } catch (_error) {
        console.log(_error);

        res.json({ ok: false });
      }
      break;
    }
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
