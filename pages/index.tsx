import Login from "@/components/Login";
import PageWrapper from "@/components/PageWrapper";

export default function Home() {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, #2E2E2E 0%, #262626 0.01%, #000000 99.99%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          // border: "1px solid grey",
          background: "url('/background.png')",
          backgroundPositionY: "50%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundColor: "transparent",
        }}
        className="flex flex-col"
      >
        <PageWrapper>
          <main
            style={{
              width: "100%",
              height: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <h3 className="md:hidden text-white font-bold text-xl m10">
              XMESSENGER
            </h3>
            <Login />
          </main>
        </PageWrapper>
      </div>
    </div>
  );
}
