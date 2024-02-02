import { getUser } from "@/lib/auth";
import getDatabase, { db } from "@/lib/firebase";
import { NextApiRequest, NextApiResponse } from "next";
import { generateNonce } from "siwe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      console.log("GET");
      const { address } = req.query;
      // const db = getDatabase();
      
      const nonce = generateNonce();

      try {
        const user = await getUser(address);
        if (!user.id) {
          const doc = await db.collection("users").add({ address, nonce });
        } else {
          const doc = await db
            .collection("users")
            .doc(user.id)
            .update({ nonce });
        }
        return res.send({ nonce, exists: !!user.name });
      } catch (error) {
        console.log(error);
        return res.send({ nonce, exists: false });
      }

      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
