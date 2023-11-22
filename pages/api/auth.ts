// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { authenticateUser, getUser, validateAuth } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { SiweMessage } from "siwe";
import { getAuth } from "firebase-admin/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;
  switch (method) {
    case "GET": {
      try {
        const data = await validateAuth(req, res);
        const additionalClaims = { uid: data.user_id, address: data.address };
        await getAuth()
          .createCustomToken(data.user_id, additionalClaims)
          .then((customToken) => {
            return res.send({ token: customToken });
          })
          .catch((error) => {
            console.log("Error creating custom token:", error);
            return res.send({ error: "err" });
          });
      } catch (_error) {
        console.log(_error);

        return res.json({ ok: false });
      }
      break;
    }
    case "POST": {
      try {
        const { message, signature, address, name } = req.body;
        if (message && signature && address) {
          const siweMessage = new SiweMessage(message);
          const fields = await siweMessage.verify({ signature });

          const user = await getUser(address);
          if (
            (fields.success && fields.data.nonce !== user.nonce) ||
            (!user.name && name && name?.trim()?.length === 0)
          )
            return res.status(422).json({ message: "Invalid data." });

          const token = await authenticateUser({
            id: user.id,
            name: name || user.name,
            address,
            pic: user?.pic,
          });
          return res.json({ ok: true, token, pic: user?.pic });
        } else {
          return res.status(422).json({ message: "Missing data." });
        }
      } catch (_error) {
        res.json({ ok: false });
      }
      break;
    }
    default:
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
