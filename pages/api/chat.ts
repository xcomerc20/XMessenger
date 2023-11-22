import { getUser, validateAuth } from "@/lib/auth";
import { createSecret } from "@/lib/encryption";
import getDatabase from "@/lib/firebase";
import { Timestamp } from "firebase-admin/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  try {
    switch (method) {
      case "GET": {
        const { conv } = req.query;

        const data = await validateAuth(req, res);
        if (data.user_id && conv && conv?.length > 0) {
          const db = getDatabase();
          try {
            const docs = await db
              .collection(`conversations/${conv}/messages`)
              .orderBy("t", "desc")
              .limit(100)
              .get();
            const messages: any = [];
            docs.forEach((i: any) => {
              const m = { ...i.data(), id: i.id };
              messages.push(m);
            });
            res.send({ ok: true, messages });
          } catch (error) {
            console.log(error);
            res.send({ ok: false });
          }
        }

        break;
      }
      case "POST": {
        const { msg } = req.body;

        const data = await validateAuth(req, res);
        if (data?.user_id && msg?.m?.length > 0 && msg?.c) {
          const db = getDatabase();
          try {
            // get convconst docs = await db
            const convDoc = await db
              .collection(`conversations`)
              .doc(msg.c)
              .get();
            const conv = convDoc.data();
            if (conv?.members?.includes(data.user_id)) {
              const doc = await db
                .collection(`conversations/${msg.c}/messages`)
                .add({
                  ...msg,
                  s: data.user_id,
                  r: false,
                  t: Timestamp.fromMillis(Date.now()),
                });

              return res.send({ ok: true, id: doc.id });
            } else {
              return res.send({ ok: false });
            }
          } catch (error) {
            console.log(error);
            res.send({ ok: false });
          }
        } else {
          console.log(data.user_id, msg?.m?.length > 0, msg?.c);

          return res.send({ ok: false, err: "Invalid message" });
        }

        break;
      }
      case "PUT": {
        const { address } = req.body;

        const data = await validateAuth(req, res);
        if (data.user_id) {
          const db = getDatabase();
          let contact = await getUser(address);
          try {
            if (!contact?.id) {
              const contactDoc = await db.collection("users").add({ address });
              contact = { id: contactDoc.id, address };
            }
            const key = createSecret();
            const doc = await db.collection(`conversations`).add({
              owner: data.user_id,
              members: [data.user_id, contact.id],
              key,
            });
            return res.send({ ok: true, id: doc.id, contact, key });
          } catch (error) {
            console.log(error);
            return res.send({ ok: false });
          }
        }

        break;
      }
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.log(error);

    return res.send({ ok: false, err: "Internal Server Error" });
  }
}
