import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Login from "@/components/Login";

export default function Home() {
  return (
    <>
      <Head>
        <title>SecureChat</title>
        <meta
          name="description"
          content="SecureChat - Encrypted Messaging Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
          // border: "1px solid grey",
          background:
            "url(https://crx.ie/_next/image?url=%2Fassets%2Flogin-bg.png&w=1080&q=75)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Login />
      </main>
    </>
  );
}
