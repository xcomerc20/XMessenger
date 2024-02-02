import React from "react";
import Image from "next/image";
import NodeChart from "@/components/NodeChart";
import PerformanceChart from "@/components/PerformanceChart";
import TableComponent from "@/components/CompletionTable";
import Chart from "@/components/Chaartmtps";
import PerformanceTableComponent from "@/components/performanceTable";
import { useAccount } from "wagmi";
import Splash from "@/components/Splash";
import PageWrapper from "@/components/PageWrapper";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps) => (
  <div
    className="w-full p-4 sm:p-6 lg:p-10 rounded-lg"
    style={{
      background:
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url('/Group 73.png')",
      backgroundSize: "cover",
    }}
  >
    <h1 className="text-xl sm:text-2xl lg:text-3xl font-thin">{title}</h1>
    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold">{subtitle}</h1>
  </div>
);

const ControlPanel = ({
  isRealtimeUpdatesEnabled,
  setIsRealtimeUpdatesEnabled,
}: {
  isRealtimeUpdatesEnabled: boolean;
  setIsRealtimeUpdatesEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div
    className="w-full mt-4 sm:mt-6 lg:mt-10 flex p-2 sm:p-4 lg:p-6 items-center justify-between rounded-lg"
    style={{
      background: "linear-gradient(180deg, #000000 0%, #234772 100%)",
      border: "1px solid #3E3E3E",
      color: "#fff",
    }}
  >
    <div className="w-full flex flex-wrap justify-between gap-4 items-center">
      <div className="flex items-center gap-2">
        <h3 className="text-sm sm:text-base lg:text-lg font-bold mr-2">
          Realtime Updates
        </h3>
        <label className="switch">
          <input
            type="checkbox"
            checked={isRealtimeUpdatesEnabled}
            onChange={(e) => setIsRealtimeUpdatesEnabled(e.target.checked)}
          />
          <span className="slider round"></span>
        </label>
        <Image
          src="/realtime.png"
          width={30}
          height={30}
          alt="realtime"
          className="ml-5"
        />
      </div>
      <div className="flex items-center gap-2">
        <h3 className="text-sm sm:text-base lg:text-lg font-bold">Refresh</h3>
        <Image src="/Refresh.png" width={30} height={30} alt="Refresh" />
      </div>
    </div>
  </div>
);

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  gradient: string;
}

const StatCard = ({ title, value, subtitle, gradient }: StatCardProps) => (
  <div className="node-card  rounded-lg">
    <div
      className="w-full p-2 sm:p-3 flex items-center justify-center"
      style={{ background: gradient }}
    >
      <h3 className="text-xs sm:text-base lg:text-lg text-center font-bold">
        {title}
      </h3>
    </div>
    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold p-2 sm:p-3">
      {value}
    </h1>
    {subtitle && (
      <p className="text-xs sm:text-sm text-center font-thin">{subtitle}</p>
    )}
  </div>
);

const WorldMap = () => (
  <div className="node-card  rounded-lg">
    <div
      className="w-full p-1 sm:p-2 flex items-center justify-center"
      style={{
        background:
          "linear-gradient(180deg,rgba(255, 199, 0, 0.3) 0%,rgba(90, 90, 90, 0.3) 100%)",
      }}
    >
      <h3 className="text-sm sm:text-base lg:text-lg font-bold">
        Nodes (Worldwide)
      </h3>
    </div>
    <div className="flex justify-center items-center mt-2 sm:mt-3 w-full p-2 sm:p-3">
      <div className="relative">
        <Image src="/world.jpg" width={480} height={480} alt="World Map" />
        {/*   <div className="absolute top-2 left-4 flex flex-col items-center">
          <Image src="/Up Squared.png" width={30} height={30} alt="Up Icon" />
          <Image
            src="/Down Squared.png"
            width={30}
            height={30}
            alt="Down Icon"
          />
        </div> */}
      </div>
    </div>
    <p className="text-xs sm:text-sm font-thin text-center">
      Mean 24hr Latency (Seconds)
    </p>
  </div>
);

const PerformanceSection = () => (
  <div className="node-card  rounded-lg">
    <div
      className="w-full flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg,#0000 0%,#525252 100%)",
      }}
    >
      <h3 className="text-sm sm:text-base lg:text-lg font-bold">Performance</h3>
    </div>
    <div className="flex flex-col sm:flex-row justify-center sm:justify-between w-full gap-4 p-2 sm:p-4 items-center">
      <div className="h-full w-full sm:w-1/2 bg-black rounded-lg">
        <PerformanceChart />
      </div>
      <div className="h-full w-full sm:w-1/2">
        <PerformanceTableComponent />
      </div>
    </div>
  </div>
);

const NodeStatusBreakdown = () => (
  <div className="node-card rounded-lg">
    <div
      className="w-full p-1 sm:p-2 flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg,#0000 0%,#525252 100%)",
      }}
    >
      <h3 className="text-sm sm:text-base lg:text-lg font-bold">
        Node Status Breakdown
      </h3>
    </div>
    <div className="bg-black h-[400px] sm:h-[480px] lg:h-[580px] w-full p-2 sm:p-3 rounded-lg">
      <NodeChart />
    </div>
  </div>
);

export default function Nodes() {
  const [isRealtimeUpdatesEnabled, setIsRealtimeUpdatesEnabled] =
    React.useState(false);
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <PageWrapper>
        <Splash />
      </PageWrapper>
    );
  }
  return (
    <PageWrapper>
      <div className="w-full h-full bg-black px-4 sm:px-8 lg:px-14 overflow-y-auto">
        <Header title="Quick View" subtitle="Nodes" />
        <ControlPanel
          isRealtimeUpdatesEnabled={isRealtimeUpdatesEnabled}
          setIsRealtimeUpdatesEnabled={setIsRealtimeUpdatesEnabled}
        />
        <div className="w-full grid mt-4 sm:mt-6 lg:mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10">
          <div className="w-full flex flex-col md:flex-row gap-4 col-span-1 md:col-span-2">
            <StatCard
              title="mTPS"
              value="0"
              subtitle="Transactions Per Second"
              gradient="linear-gradient(180deg,rgba(255, 199, 0, 0.3) 0%,rgba(90, 90, 90, 0.3) 100%)"
            />
            <StatCard
              title="Latency"
              value="2.12"
              subtitle="Mean 24hr Latency (Seconds)"
              gradient="linear-gradient(180deg,rgba(255, 199, 0, 0.3) 0%,rgba(90, 90, 90, 0.3) 100%)"
            />
          </div>
          <div className="flex flex-col gap-4 col-span-1 lg:row-span-2">
            <WorldMap />
            <div className="node-card hidden md:block h-full">
              <div
                className="w-full p-1 sm:p-2 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(180deg,rgba(255, 199, 0, 0.3) 0%,rgba(90, 90, 90, 0.3) 100%)",
                }}
              >
                <h3 className="text-sm sm:text-base lg:text-lg font-bold">
                  24hr mTPS
                </h3>
              </div>
              <div className="w-full p-2 sm:p-3 h-[300px] sm:h-[400px] lg:h-[500px]">
                <Chart />
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 col-span-1 md:col-span-2">
            <StatCard
              title="Total Rounds"
              value="236.13M"
              gradient="linear-gradient(180deg,#0000 0%,#525252 100%)"
            />
            <StatCard
              title="Avg Throughput/Hr"
              value="11.6 GB"
              gradient="linear-gradient(180deg,#0000 0%,#525252 100%)"
            />
            <StatCard
              title="Total Throughput (24hr)"
              value="278 GB"
              gradient="linear-gradient(180deg,#0000 0%,#525252 100%)"
            />
            <StatCard
              title="Realtime Success Rate (24hr)"
              value="99.69%"
              gradient="linear-gradient(180deg,#0000 0%,#525252 100%)"
            />
            <StatCard
              title="Precomp Success Rate"
              value="94.69%"
              subtitle="Pre computation builds the mix and tests the team, failing any which do not pass -- accelerating delivery and shielding the network from message drops."
              gradient="linear-gradient(180deg,#0000 0%,#525252 100%)"
            />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <TableComponent />
          </div>
          <div className="node-card md:hidden p-4 sm:p-6 lg:p-8">
            <div
              className="w-full p-1 sm:p-2 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(180deg,rgba(255, 199, 0, 0.3) 0%,rgba(90, 90, 90, 0.3) 100%)",
              }}
            >
              <h3 className="text-sm sm:text-base lg:text-lg font-bold">
                24hr mTPS
              </h3>
            </div>
            <div className="w-full p-2 sm:p-3 h-[300px]">
              <Chart />
            </div>
          </div>
          <div className="w-full col-span-1 md:col-span-3">
            <PerformanceSection />
          </div>
          <div className="flex w-full flex-col col-span-1 gap-4">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatCard
                title="Active Validators"
                value="349/362"
                gradient="linear-gradient(180deg,#0000 0%,#525252 100%)"
              />
              <StatCard
                title="Min Server Version"
                value="3.1.0"
                gradient="linear-gradient(180deg,#0000 0%,#525252 100%)"
              />
            </div>
            <StatCard
              title="Min Gateway Version"
              value="3.0"
              gradient="linear-gradient(180deg,#0000 0%,#525252 100%)"
            />
          </div>
          <div className="w-full col-span-1 md:col-span-2">
            <NodeStatusBreakdown />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
