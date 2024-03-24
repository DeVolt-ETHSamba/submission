import Link from "next/link";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

type ChartData = {
  date: string;
  value: number;
};

const data: ChartData[] = [
  { date: "15 Nov", value: 0.8 },
  { date: "16 Nov", value: 0.2 },
  { date: "17 Nov", value: 0.62 },
  { date: "18 Nov", value: 0.91 },
  { date: "19 Nov", value: 0.5 },
];

const HomeHeroSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 md:grid-rows-2 gap-4">
      <div className="md:col-span-2 md:row-span-1 md:col-start-3 md:row-start-1">
        <div
          className="relative text-white p-4 rounded-3xl shadow-lg mb-4 flex flex-col w-full h-full"
          style={{ backgroundImage: `url('/img1.png')`, backgroundSize: "cover" }}
        >
          {/* Texto com um z-index mais alto */}
          <p className="text-4xl font-bold z-10 relative">Average energy price: 0,88/kW</p>
          {/* Gráfico com z-index mais baixo para ficar atrás do texto */}
          <div className="absolute left-0 right-0 bottom-0  h-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis
                  dataKey="date"
                  stroke="transparent"
                  tick={{ fill: "white" }}
                  textAnchor="start"
                  height={30}
                  interval="preserveStartEnd"
                  tickMargin={10}
                />
                {/* @ts-ignore */}
                <Tooltip contentStyle={{ backgroundColor: "transparent", border: "none", color: "#fff" }} />
                {/* @ts-ignore */}
                <Line type="monotone" dataKey="value" stroke="#13FF2B" strokeWidth={4} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="md:row-span-1 md:col-start-5 md:row-start-1">
        <div className="bg-[#D9D9D9] text-white p-4 rounded-3xl shadow-lg mb-4  flex flex-col flex-1 w-full h-full">
          <p className="font-bold text-2xl text-[#3c3c3c]">Your balance:</p>
          <h1>10.000 Volt </h1>
          <h3 className=" text-gray-500">1 Volt = 1 USD </h3>
          <div className="flex justify-end">
            <Link href="https://github.com/DeVolt-ETHSamba">
              <button className="mt-3 text-s bg-[#161616] rounded-full text-white px-3 py-2 transition  hover:bg-[#2e2e2e] hover:border-primary">
                Go to wallet
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="md:col-span-2 md:row-span-1 md:col-start-4 md:row-start-2">
        <div className="bg-green-500 text-white p-4 rounded-3xl shadow-lg flex flex-col items-center justify-center w-full h-full bg-gradient-to-tr from-black to-[#14591F]">
          <p className="text-3xl font-bold mb-8">Start using DeVolt right now</p>
          <div className="flex space-x-4">
            <Link href="/buy-power">
              <button className="font-semibold text-xl bg-primary  rounded-lg text-black px-8 py-3 transition  hover:bg-[#37e231] hover:border-primary">
                Buy Energy
              </button>
            </Link>
            <p className="text-lg font-semibold">or</p>
            <Link href="/sell-power">
              <button className="font-medium text-xl bg-[#333] rounded-lg text-[#c9c9c9] px-8 py-3 transition   hover:bg-[#1a1a1a] hover:border-primary">
                Sell your exceeding energy
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="md:row-span-1 md:col-start-3 md:row-start-2">
        <div
          className="bg-green-500 text-white p-4 rounded-lg shadow-lg w-full h-full "
          style={{ borderRadius: "25px", backgroundImage: "linear-gradient(to right, #171313 , #292929)" }}
        >
          <p className="text-4xl font-bold">Recharge With Renewable Energy</p>
          <img src="/lightning.svg" className="float-right w-10 pb-2" alt="" />
        </div>
      </div>

      <div className="md:col-span-2 md:row-span-2 md:col-start-1 md:row-start-1 ">
        <div
          className="text-white p-4 shadow-lg rounded-[2rem] flex flex-col flex-1 w-full h-full  "
          style={{ backgroundImage: "linear-gradient(to right, #13FF2B, #9EFF52)" }}
        >
          <h1 className="h1-big p-5">Embracing Decentralized Energy Economy</h1>

          <h2 className="mt-4">
            At DeVolt, our core mission is to dismantle the centralized paradigms of energy trade. We enable every
            household and business to take control of their energy destiny by offering a platform where they can trade
            energy assets directly. Join us to be part of a revolution that powers homes, supports communities, and
            sustains the planet with clean, peer-to-peer energy transactions.
          </h2>
          <Link href="https://github.com/DeVolt-ETHSamba">
            <button className="mt-3 text-s bg-[#161616] rounded-full text-white px-3 py-2 transition  hover:bg-[#2e2e2e] hover:border-primary">
              Solution GitHub
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroSection;
