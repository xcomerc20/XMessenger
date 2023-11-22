import SimpleAes from "simple-aes-crypto";

export const getCrypt = (key: string) => {
  return new SimpleAes({
    key: key, // optional by default auto generate
    bit: 256, // optional by default 256
  });
};

export const createSecret = () =>
  require("crypto").randomBytes(48).toString("hex");
