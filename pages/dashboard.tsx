import Image from "next/image";
import Splash from "@/components/Splash";
import { useAccount } from "wagmi";
import PageWrapper from "@/components/PageWrapper";
import { catamaran } from "@/lib/fonts";

export default function Dashboard() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    <Splash />;
  }
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #000000 0%, #222222 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "#000000",
        overflowY: "auto",
        paddingBottom: "10rem", // Add padding at the bottom
        color: "#fff",
        height: "100vh",
      }}
    >
      <PageWrapper>
        <main
          className="flex flex-col p-4 sm:p-8 lg:p-10 w-full overflow-y-auto py-10"
          style={{ paddingTop: "0px" }}
        >
          <div className="w-full mb-16">
            <div
              style={{
                background: "url('/Rectangle 10.png')",
                backgroundPositionY: -353,
                backgroundSize: "cover",
                borderRadius: 10,
                boxShadow: "1px 2px 4px 0px #FFFFFF40",
              }}
            >
              <div
                className="w-full p-8 sm:px-8 lg:px-10"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(2, 2, 2, 0.8) 36.5%, rgba(102, 102, 102, 0) 100%)",
                }}
              >
                <h2
                  className={
                    "text-md sm:text-xl lg:text-1xl font-thin " +
                    catamaran.className
                  }
                >
                  WELCOME TO
                </h2>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  XCHAIN
                </h1>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row w-full gap-4">
            <div className="flex flex-col w-full lg:w-5/6 gap-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="card w-full lg:w-1/3 px-6 sm:px-12 py-2 sm:py-4">
                  <div className="flex justify-between lg:flex-col">
                    <div>
                      <h2
                        className={
                          "text-md sm:text-xl mt-3 " + catamaran.className
                        }
                      >
                        Your Nodes
                      </h2>
                      <h3
                        className={
                          "opacity-60 " +
                          catamaran.className
                        }
                      >
                        Currently running nodes
                      </h3>
                    </div>
                    <div>
                      <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl mt-4">
                        0
                      </h1>
                      <h3
                        className={
                          "opacity-60 " +
                          catamaran.className
                        }
                      >
                        on 0 blockchains
                      </h3>
                    </div>
                  </div>
                  <button
                    className="btn-box bg-white mt-6 py-1 px-24 lg:px-16 xl:px-24 hover:bg-gray-200 text-black font-boldrounded-full text-sm "
                    style={{
                      background:
                        "linear-gradient(180deg, #FFFFFF 0%, #999999 100%)",
                      border: "1px solid #0000005E",
                    }}
                  >
                    View
                  </button>
                </div>
                <div className="card w-full lg:w-2/3 px-6 sm:px-12 py-2 sm:py-4">
                  <div className="flex justify-between lg:flex-col">
                    <div>
                      <h2
                        className={
                          "text-md sm:text-xl mt-3 " + catamaran.className
                        }
                      >
                        All Nodes
                      </h2>
                      <h3
                        className={
                          "opacity-60 mb-5 " +
                          catamaran.className
                        }
                      >
                        Current running Nodes
                      </h3>
                    </div>
                    <div>
                      <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl">
                        730
                      </h1>
                      <h3
                        className={
                          "opacity-60 " +
                          catamaran.className
                        }
                      >
                        On 8 blockchains
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4">
                <div className="card w-full lg:w-1/2 px-6 sm:px-12 py-2 sm:py-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="w-full">
                      <h2
                        className={
                          "text-md sm:text-xl mt-3 " + catamaran.className
                        }
                      >
                        Blockchains
                      </h2>
                      <h3
                        className={
                          "opacity-60 mb-5 " +
                          catamaran.className
                        }
                      >
                        Available chains for deployment
                      </h3>
                      <h3 className={"text-base sm:text-lg mt-4 lg:mt-14 text-gray-400 " + catamaran.className}>
                        On 8 blockchains
                      </h3>
                    </div>
                    <Image
                      src="/crypto.png"
                      width={150}
                      height={150}
                      alt=""
                      style={{
                        height: 150,
                        width: 150,
                      }}
                      className="sm:w-auto"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 px-6 sm:px-12 py-2 sm:py-4">
                  <h2
                    className={"text-md sm:text-xl mt-3 " + catamaran.className}
                  >
                    Treasury
                  </h2>
                  <h3
                    className={
                      "opacity-60 mb-5 " +
                      catamaran.className
                    }
                  >
                    Total value locked
                  </h3>
                  <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl mt-4">
                    1,234,567
                  </h1>
                </div>
              </div>

              <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl mt-6">
                My Rewards
              </h1>

              <div
                className="flex flex-col lg:flex-row gap-4 mt-2"
                style={{ paddingBottom: 40 }}
              >
                <div className="card flex justify-between w-full px-6 sm:px-12 py-2 sm:py-4">
                  <h1
                    className={"text-md sm:text-lg mt-3 " + catamaran.className}
                  >
                    Rewards Earned
                  </h1>
                  <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl">
                    17738
                  </h1>
                </div>
                <div className="card flex justify-between w-full px-6 sm:px-12 py-2 sm:py-4">
                  <h1
                    className={"text-md sm:text-lg mt-3 " + catamaran.className}
                  >
                    Rewards Pending Claim
                  </h1>
                  <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl">
                    238
                  </h1>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex w-1/6">
              <div className="card w-full p-4 sm:p-6 flex flex-col">
                <h2 className={"text-md sm:text-xl  " + catamaran.className}>
                  Capacity
                </h2>
                <div className="flex-grow flex justify-center items-center">
                  <h1 className="font-bold text-4xl sm:text-5xl">1%</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="card lg:hidden w-full p-4 sm:p-6 mt-4 flex items-center justify-between">
            <h2 className="font-bold text-xl sm:text-2xl">Capacity</h2>
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl">1%</h1>
          </div>
        </main>
      </PageWrapper>
    </div>
  );
}
