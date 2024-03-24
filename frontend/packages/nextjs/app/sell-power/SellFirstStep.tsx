import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLocation } from "~~/contexts/LocationContext";
import { Bid } from "~~/components/Bid";
import Station from "~~/types/station";
import queryAllStations from "~~/utils/queryAllStations";
import findClosestStation from "~~/utils/calculateNearestStation";
import makePercentage from "~~/utils/makePercentage";

const mockStations: Station[] = [
    {
      latitude: -22.979267, 
      longitude: -43.212659,
      address: "Rio de Janeiro, RJ, Brazil",
      maxVoltage: 45,
      availablePlugs: "Tipo S2, BYD, BMW",
      id: 1,
      meanPrice: 30,
      batteryLevel: 50,
      maxCapacity: 100,
    },
    {
      latitude: -22.970970,
      longitude: -43.217340,
      address: "Rio de Janeiro, RJ, Brazil",
      maxVoltage: 45,
      availablePlugs: "Tipo S2, BYD, BMW",
      id: 2,
      meanPrice: 30,
      batteryLevel: 50,
      maxCapacity: 100,
    },
    {
      latitude: -22.982116185222058, 
      longitude: -43.21677437969157,
      address: "Rio de Janeiro, RJ, Brazil",
      maxVoltage: 45,
      availablePlugs: "Tipo S2, BYD, BMW",
      id: 3,
      meanPrice: 30,
      batteryLevel: 50,
      maxCapacity: 100,
    }
  ];

interface Props {
  isActive: boolean;
  children: React.ReactNode;
  setSelectedStation: (station: Station) => void;
  selectedStation: Station;
}

const SellFirstStep = ({ isActive, children, setSelectedStation, selectedStation }: Props) => {

  const [stations, setStations] = useState(mockStations);
  const { location, updateLocation } = useLocation();

  useEffect(() => {
    queryAllStations().then(stations => {
      console.log(stations);

      setStations(stations);

    });
  }, [location]);

  const Map = useMemo(() => dynamic(
    () => import('~~/components/Map'),
    { 
      loading: () => <p>map is loading</p>,
      ssr: false
    }
  ), [])


  const blur = isActive ? "" : "blur-[6px] pointer-events-none";
  const background = isActive ? "bg-black" : "bg-[#000]";
  const [mapHeight, setMapHeight] = useState("550px");
  let titleCss = "text-3xl ml-20 pt-4 font-bold";
  titleCss += isActive ? "" : " text-black";
  let subtitleCss = "text-xl font-medium pb-2 ml-20 ";
  subtitleCss += isActive ? "" : " hidden";

  useEffect(() => {
    if (isActive) {
      setMapHeight("550px");
    } else {
      setMapHeight("0px");
    }
  }, [isActive]);

  return (
    <div className={`p-4 px-8 rounded-3xl ${background} transition`}>
      <div className={`${blur} `}>
        <p className={titleCss}>#1 Step:</p>
        <p className={subtitleCss}>Select the station you want to sell your power to</p>
        <div className=" mx-auto rounded-3xl mb-6">
          <Map
            roundedTopCorners={true}
            roundedBottomCorners={true}
            stations={stations}
            center={location}
            userLocation={location}
            width={"95%"}
            height={mapHeight}
            setSelectedStation={setSelectedStation}
            hidden={!isActive}
            buttonText="Sell energy here"
          />
        </div>
        <div className=" w-full -mt-12 z-0 py-12 rounded-lg">
          <div className="flex gap-x-5 w-full m-8 divide-x">
            <div className="w-[30%] text-lg ">
              <p className="text-3xl text-[#37e231] font-bold">Auction status</p>
              <p>{selectedStation.address}</p>
              <div className="flex gap-2 items-center my-4">
                <Image src="./wallet.svg" alt="ttt" width={40} height={40} />
                <p className="font-bold">
                  Lowest price bid: <span className="font-normal">{"  ---"}</span>{" "}
                </p>
              </div>
              <div className="flex gap-2 items-center my-4">
                <Image src="./capacity.svg" alt="ttt" width={40} height={40} />
                <p className="font-bold">
                  Energy amount offered: <span className="font-normal">{selectedStation.batteryLevel && makePercentage(selectedStation.batteryLevel, selectedStation.maxCapacity).toFixed(0) || "  ---"}</span>{" "}
                </p>
              </div>
              <div className="flex gap-2 items-center my-4">
                <Image src="./pin.svg" alt="ttt" width={40} height={40} />
                <p className="font-bold">
                  Station address: <span className="font-normal">{selectedStation.address || "  ---"}</span>{" "}
                </p>
              </div>
            </div>
            <div className="w-[70%] px-8">
              <p className="text-3xl text-[#37e231] font-bold backdrop-blur-lg">Last bids</p>
              <div className="grid grid-cols-4 gap-3 w-[95%]">
                <Bid price={0.5} wallet="0x000000000000000000" quantity={10} />
                <Bid price={0.5} wallet="0x000000000000000000" quantity={10} />
                <Bid price={0.5} wallet="0x000000000000000000" quantity={10} />
                <Bid price={0.5} wallet="0x000000000000000000" quantity={10} />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mb-2">{children}</div>
      </div>
    </div>
  );
};

export default SellFirstStep;
