import { catamaran, montserrat } from "@/lib/fonts";
import Image from "next/image";
import React from "react";

const TransferUIElement = () => {
  const steps = [
    {
      icon: "/Hourglass.png",
      title: "Transaction Pending",
      description:
        "Your transaction is currently pending. This means that your request is being processed and is not yet completed. The time it takes for a transaction to move from pending to completed can vary.",
    },
    {
      icon: "/Receive Cash.png",
      title: "Transaction Received",
      description:
        'The transaction status "Received" means that the swap process is done.',
    },
    {
      icon: "/Blockchain Technology.png",
      title: "Sending to Demos Network",
      description:
        "This step is crucial as it involves the secure transfer of your digital assets from our platform to the blockchain ledger that forms part of the Demos Network.",
    },
    {
      icon: "/Satellite Signal.png",
      title: "Processed to X Chain",
      description:
        "The X Chain will handle the final steps of recording your transaction on its ledger, which includes confirmation by network nodes.",
    },
  ];

  return (
    <div className="bg-transparent p-6 rounded-lg max-w-2xl z-0 mx-auto">
      <div className="relative flex items-center h-full">
        {/* Vertical line */}
        <div className="flex flex-col h-[53%] w-[1px] items-center justify-between left-0 top-0 bottom-0 w-0.5 bg-zinc-500">
          {/* Dots */}
          <div className=" w-3 h-3 bg-zinc-500 rounded-full"></div>
          <div className=" w-3 h-3 bg-zinc-500 rounded-full"></div>
          <div className=" w-3 h-3 bg-zinc-500 rounded-full"></div>
          <div className=" w-3 h-3 bg-zinc-500 rounded-full"></div>
        </div>

        <div className="ml-5 flex flex-col gap-4">
          {steps.map((step, index) => (
            <div className="flex card h-1/4 p-2 items-center gap-2 justify-between" style={{
              boxShadow: '1px 1px 1px 0px #00000080',
              border: '1px solid #3E3E3E',
            }}>
              <Image
                src={step.icon}
                width={50}
                height={50}
                alt=""
                className=""
              />
              <div className="flex flex-col gap-2 w-full mr-4 my-2">
                <h3 className={"font-thin text-xs md:text-sm " + catamaran.className}>{step.title}</h3>
                <p className={"font-thin text-xs md:text-2xs text-[#FFFFFF] opacity-50 " + catamaran.className}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full pt-2 px-4 sm:px-5 gap-4 sm:gap-8 z-20">
        <p className={"font-thin text-[#FFFFFF] opacity-50 text-center " + montserrat.className}>
          Need help? Contact our support team at <a>help@cruxdecussata.com</a>
        </p>
      </div>
      <div className="pb-20"></div>
    </div>
  );
};

export default TransferUIElement;
