import { authenticateUser, getUser, validateAuth } from "@/lib/auth";
import getDatabase, { db } from "@/lib/firebase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST": {
      const { name, pic } = req.body;

      const data = await validateAuth(req, res);
      if (data.user_id) {
        let updates: any = {};
        if (pic && pic.length > 0 && pic !== data?.pic) {
          updates.pic = pic;
        }
        if (name && name.length > 0 && name !== data?.name) {
          updates.name = name;
        }
        if (updates.name || updates.pic) {
          // const db = getDatabase();
          
          try {
            const token = await authenticateUser({
              id: data.user_id,
              address: data.address,
              name: data.name,
              ...updates,
            });
            res.json({ ok: true, token });
          } catch (error) {
            console.log(error);
            res.send({ ok: false });
          }
        } else {
          res.send({ ok: false, err: "Bad Data" });
        }
      }

      break;
    }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
