import Head from "next/head";
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
          background: "url('/login-bg.webp')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Login />
      </main>
    </>
  );
}
