import Head from "next/head";

export default function Profile({ setShowProfile, data }: any) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <section
        style={{ width: "40%", fontFamily: "Montserrat" }}
        className=" bg-[#202d36] flex font-medium items-center justify-center h-screen full-screen"
      >
        <section
          className="w-full h-[90vh]  mx-auto bg-[#24353f] rounded-3xl rounded-br-none rounded-bl-none px-8 py-6 shadow-lg "
          style={{ textAlign: "center", marginTop: "20%" }}
        >
          <div className="flex items-center justify-between">
            <button
              className="text-gray-400 text-sm flex align-items-center bg-transparent "
              style={{ alignItems: "center", paddingLeft: 5 }}
              onClick={setShowProfile}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back
            </button>
            <span className="text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </span>
          </div>
          <div className="mt-6 w-fit mx-auto">
            <img
              src={data.pic || "/nopic.svg"}
              className="rounded-full w-28 "
              alt="profile picture"
              srcSet=""
            />
          </div>
          <div className="mt-8 ">
            <h2 className="text-white font-bold text-2xl tracking-wide">
              {data?.name || "Unknown User"}
            </h2>
          </div>
          <p className="text-emerald-400 font-semibold mt-2.5">
            {data?.address.slice(0, 12) +
              "..." +
              data?.address.slice(-12, data?.address?.length) ||
              "Address not found"}
          </p>
          <button
            className="rounded-full mt-[50%]  "
            style={{
              color: "red",
              border: "2px solid red",
              background: "transparent",
            }}
          >
            Block User
          </button>
        </section>
      </section>
    </>
  );
}
