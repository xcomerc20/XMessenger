import PageWrapper from "@/components/PageWrapper";
import React from "react";

export default function Treasury() {
  return (
    <PageWrapper>
      <div className="w-full h-screen flex-col bg-black px-14 overflow-auto">
        <div
          className="w-full t-0 h-40 p-10 m-15 rounded-lg"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)),url('/Rectangle 10 (1).png')",
            backgroundSize: "cover",
          }}
        >
          <h1 className="text-3xl font-thin">CruxDecussata</h1>
          <h1 className="text-6xl font-bold">Treasury</h1>
        </div>
        <br />
        <br />
        <br />
        <br />
        <h4 className="w-full text-center text-3xl font-bold">Coming soon..</h4>
      </div>
    </PageWrapper>
  );
}
