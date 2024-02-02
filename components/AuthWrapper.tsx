import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import Head from "next/head";

export const message = (address: any) =>
  `I agree to Terms of Service & Policies and `;

export default function AuthWrapper({ children }: any) {
  const [hasMounted, setHasMounted] = useState(false);
  const { isConnected, address } = useAccount();
  const router = useRouter();

  // Hooks
  useEffect(() => {
    setHasMounted(true);
  }, []);

  /*  useEffect(() => {
    if (!isConnected || !address) {
      router.replace("/");
    }
  }, [isConnected, address]); */

  // Render
  if (!hasMounted) return null;

  return (
    <article>
      <Head>
        <link rel="shortcut icon" href="logo.png" />
      </Head>
      {children}
      <span style={{ display: "none", opacity: 0, color: "transparent" }}>
        Here is wisdom. Let him that hath understanding count the number of the
        beast: for it is the number of a man; and his number is Six hundred
        threescore and six.
      </span>
    </article>
  );
}
