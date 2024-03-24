import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Progress } from "./ui/progress";
import { MapIcon, MapPinned } from "lucide-react";
import { useLocation } from "~~/contexts/LocationContext";
import Station from "~~/types/station";
import findClosestStation from "~~/utils/calculateNearestStation";
import queryAllStations from "~~/utils/queryAllStations";
import { stat } from "fs";
import { toast } from "react-toastify";

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

const MapSectionHomepage = () => {
  const { location, updateLocation } = useLocation();
  const [stations, setStations] = useState(mockStations);
  const [closestStation, setClosestStation] = useState<Station | null>(null);
  const [closestStationDistance, setClosestStationDistance] = useState<string | number>(0);

  useEffect(() => {
    queryAllStations().then(stations => {
      const { station: a, distance: b } = findClosestStation(stations, {
        x: location[0] || 0,
        y: location[1] || 0,
      });

      setStations(stations);

      setClosestStation(a);
      setClosestStationDistance(b);
    })
    .catch(err => {
      toast.error("Error fetching stations");
      const { station: a, distance: b } = findClosestStation(mockStations, {
        x: location[0] || 0,
        y: location[1] || 0,
      });

      setClosestStation(a);
      setClosestStationDistance(b);

    }
    )
  }, [location]);

  const Map = useMemo(
    () =>
      dynamic(() => import("~~/components/Map"), {
        loading: () => <p>map is loading</p>,
        ssr: false,
      }),
    [],
  );

  return (
    <div className="w-full">
      <div
        className="bg-green-500 text-white rounded-t-3xl shadow-lg pb-8 w-full flex justify-around items-center"
        style={{ backgroundImage: "linear-gradient(to right, #000000 , #14591F)" }}
      >
        <div className="flex">
          <p className="text-5xl text-white">Closest charging point:</p>
        </div>
        <div className="leading-[0]">
          <p className="text-2xl font-bold">
            {closestStation?.address || "Unnamed station"} <span className="font-normal text-xl">{closestStationDistance}Km</span>
          </p>
          <p className="text-lg font-semibold">Energy available:</p>
          <Progress value={closestStation?.availableEnergyPercentage || 50} className="bg-gray-100 " />
          <p className="text-xl">
            {closestStation?.availableEnergyPercentage || 50}%
          </p>
          <div className="flex gap-4">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={`https://www.google.com/maps/search/${closestStation?.latitude || 0},+${
                closestStation?.longitude || 0
              }?entry=tts`}
            >
              <button className=" flex font-semibold gap-2 text-xl bg-[#eee] rounded-lg text-black pl-3 pr-6 py-2 transition  hover:scale-105">
                <MapIcon size={30} /> Take me there!
              </button>
            </a>
          </div>
        </div>
      </div>
      <Map
        roundedTopCorners={false}
        roundedBottomCorners={true}
        stations={stations}
        center={location}
        userLocation={location}
        showAuctionButton={false}
      />
    </div>
  );
};

export default MapSectionHomepage;
