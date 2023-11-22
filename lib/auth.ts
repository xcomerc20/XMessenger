import { Address } from "wagmi";
import getDatabase from "./firebase";
import { NextApiRequest, NextApiResponse } from "next";
import { SignJWT, jwtVerify } from "jose";

export const jwtSign = async (data: any) => {
  const secret = new TextEncoder().encode(process.env.JWT_ACCESS_TOKEN_SECRET);
  const jwt = await new SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("180d")
    .sign(secret);

  return jwt;
};

export const verifyToken = async (token: string) => {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_ACCESS_TOKEN_SECRET)
  );
  return payload;
};

export const getUser = async (address: any): Promise<any> => {
  const db = getDatabase();

  let user;
  const querySnapshot = await db
    .collection("users")
    .where("address", "==", address)
    .get();
  if (querySnapshot.empty) {
    user = {};
  } else {
    querySnapshot.forEach((doc) => {
      user = { id: doc.id, ...doc.data() };
    });
  }
  return user;
};

export const authenticateUser = async (data: {
  address: any;
  name: string;
  id: string;
  pic?: string;
}): Promise<string> => {
  const db = getDatabase();

  const token = await jwtSign({
    user_id: data.id,
    name: data.name,
    address: data.address,
  });
  const doc = await db
    .collection("users")
    .doc(data.id)
    .update({
      token,
      nonce: "",
      name: data.name,
      ...(data?.pic ? { pic: data.pic } : {}),
    });

  return token;
};

export async function validateAuth(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<{ user_id: string; name: string; address: string } | any> {
  const token = req.headers.authorization;
  let hasData = true;

  if (!token) {
    hasData = false;
    return res.status(401).send({ message: "Auth token is required" });
  }

  const payload = await verifyToken(token as string);

  const db = getDatabase();

  const data = await db
    .collection("users")
    .doc(payload.user_id as string)
    .get();

  if (!data.exists) {
    hasData = false;
    return res.status(404).send({ message: "User not exist" });
  }

  const userData = data.data();

  if (userData?.token !== token && userData?.address === payload.address) {
    hasData = false;
    return res
      .status(401)
      .send({ ok: false, err: "Token not matched or outdated" });
  }
  if (hasData) {
    return { ...payload, pic: userData?.pic };
  }
}
