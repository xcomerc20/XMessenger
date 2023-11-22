import SimpleAes from "simple-aes-crypto";
import { PayMessage } from "./PayMessage";
import { ChatMessage } from "./ChatMessage";
import { IMessage } from "@/lib/types";
import { msgIsTransaction } from "@/lib/helpers";

export interface MessageProps {
  aes: SimpleAes;
  message: IMessage;
  user_id: any;
}

export function Message({ message, ...rest }: MessageProps) {
  const props = { message, ...rest };

  if (msgIsTransaction(message.m)) {
    return <PayMessage {...props} />;
  }

  return <ChatMessage {...props} />;
}
