import PageWrapper from "@/components/PageWrapper";
import { montserrat } from "@/lib/fonts";
import React from "react";

export default function Validators() {
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
          <h1 className="text-2xl lgtext-3xl font-thin">Choose</h1>
          <h1 className="text-2xl lg:text-6xl font-bold">Validators</h1>
        </div>
        <div className="flex gap-10 flex-col lg:flex-row items-center justify-center  lg:p-[50px] ">
          {[1, 2, 3].map((item) => (
            <div
              className="flex flex-col items-center w-full "
              style={{
                border: "1px solid #DBD388",
                borderRadius: 24,
                padding: 30,
                background: "url('/validator_card.png')",
                backgroundPositionY: "50%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundColor: "transparent",
              }}
              key={item}
            >
              <h2 style={{ fontSize: 32, fontWeight: "bold" }}>
                Validator {item}
              </h2>
              <br />
              <p className={"text-[#FFFFFF] " + montserrat.className}>
                SLOTS 50/100
              </p>
              <br />
              <button
                style={{
                  padding: "0px 50px",
                  fontSize: 20,
                  border: "1px solid #FFC7004D",
                  borderRadius: 8,
                  background: "#FFC7004D",
                }}
              >
                Stake NFT
              </button>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
