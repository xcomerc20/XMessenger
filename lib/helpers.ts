import { MessageProps } from "@/components";
import { Timestamp } from "firebase/firestore";
import { erc20ABI, useContractRead, useTransaction } from "wagmi";
import { blockScanners, currencies } from "./constants";

export const compareTime = (a: any, b: any) =>
  a._seconds == b._seconds
    ? a._nanoseconds - b._nanoseconds
    : a._seconds - b._seconds;

export const parseTime = (timestamp: any) => {
  const { _seconds, seconds, nanoseconds, _nanoseconds } = timestamp;
  const ts = new Timestamp(
    seconds || _seconds,
    nanoseconds || _nanoseconds
  ).toMillis();
  const date = new Date(ts);
  return date
    .toLocaleTimeString("en-in", {
      hour: "numeric",
      hour12: false,
      minute: "numeric",
    })
    .toLocaleUpperCase();
};

export const readFile = (e: any) => {
  if (!e.target?.files || !e?.files[0]) return;

  const FR = new FileReader();

  FR.addEventListener("load", function (evt: any) {
    console.log(evt.target.result);
  });

  FR.readAsDataURL(e.files[0]);
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function msgIsTransaction(message: string) {
  return message.startsWith("tx");
}

export function msgIsValid(message: string) {
  const invalidMessages = [
    "invalid continuation byte",
    "invalid of encryption",
  ];

  const isMsgValid = !invalidMessages.includes(message?.toLowerCase());

  return isMsgValid;
}
