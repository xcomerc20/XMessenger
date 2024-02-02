import { validateAuth } from "@/lib/auth";
import getDatabase, { db } from "@/lib/firebase";
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
        console.log("1 auth done");

        if (data?.user_id && data?.name) {
          // Get chats
          const chats = await db
            .collection("conversations")
            .where("members", "array-contains", data.user_id)
            .get();

          console.log("2 conv done");
          const chatData: any[] = [];
          chats.forEach((i) => chatData.push({ ...i.data(), id: i.id }));

          // Extract chat IDs and user IDs
          const chatIds = chatData.map((i) => i.id);
          const userIds: string[] = [];
          chatData.forEach((i) =>
            userIds.push(...i.members.filter((x: any) => x !== data.user_id))
          );

          // Check if chatIds or userIds are empty before proceeding
          if (chatIds.length === 0 || userIds.length === 0) {
            return res.status(200).json({ ...data, history: [] });
          }

          console.log("3 proc done");
          // Fetch messages and users concurrently
          const [messagesRef, usersRef] = await Promise.all([
            chatIds.length > 0
              ? db
                  .collectionGroup("messages")
                  .where("c", "in", chatIds)
                  .orderBy("t", "desc")
                  .limit(100)
                  .get()
              : [],
            userIds.length > 0
              ? db
                  .collection("users")
                  .where(FieldPath.documentId(), "in", userIds)
                  .select("name", "pic", "address")
                  .get()
              : [],
          ]);

          console.log("4 msg fet done");
          // Process messages
          const messagesData: any = {};
          messagesRef.forEach((i: any) => {
            const m = { ...i.data(), id: i.id };
            if (messagesData[m?.c]) {
              messagesData[m.c].push(m);
            } else {
              messagesData[m.c] = [m];
            }
          });

          // Process users
          const userData: any[] = [];
          usersRef.forEach((i) => userData.push({ ...i.data(), id: i.id }));

          console.log("5 msg format done");
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

          console.log("6 msg sort done");
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
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
