"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { encodeFunctionData, parseAbi } from "viem";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { BuyEnergy } from "~~/components/BuyEnergy";
import GetUserGeolocationDialog from "~~/components/GetUserGeolocationDialog";
import Map from "~~/components/Map";
import { MapSectionBuypage } from "~~/components/MapSectionBuypage";
import { StationData } from "~~/components/StationData";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "~~/components/ui/dialog";
import { LocationProvider } from "~~/contexts/LocationContext";
import Station from "~~/types/station";

const BuyPower: NextPage = () => {
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
  const [hallo, setHallo] = useState(0)

  const abi = parseAbi([
    "function withdraw(address)",
    "function placeBid(string,address,string,string)", //id da estação, address do sender, batteryAmount, price
    "function rechargeBattery(string,address,string)",
    "function batteryReport(string,string,string,string,string)",
  ]);

  const bytecode = encodeFunctionData({
    abi: abi,
    functionName: 'placeBid',
    args: ['id', '0x0000000000000000000000000000000000000000', '10', '10']
  })

  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "InputBox",
    functionName: "addInput",
    args: ["0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC", bytecode],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });


  

  const [selectedStation, setSelectedStation] = useState<Station>({
    id: 0,
    latitude: 0,
    longitude: 0,
    address: "",
    maxVoltage: 0,
    availablePlugs: "",
    batteryLevel: 0,
    maxCapacity: 0,
    meanPrice: 0,
  });
  const [stations, setStations] = useState<Station[]>(mockStations);
  const [value, setValue] = useState(0);
  const [address, setAddress] = useState("");
  const [compatibility, setCompatibility] = useState("");
  const [averagePrice, setAveragePrice] = useState(0);
  const [availableEnergyPercentage, setAvailableEnergyPercentage] = useState(0);
  const [openPopUp, setOpenPopUp] = useState(false);

  const [disableButton, setDisableButton] = useState("disabled bg-[#7c7c7c] pointer-events-none");

  const [metaverseDialog, setMetaverseDialog] = useState(true);

  return (
    <LocationProvider>
      <Dialog open={metaverseDialog}>
        <DialogContent className="bg-[#1a1a1a] border-none shadow-lg">
          <DialogTitle className="text-3xl flex text-white pb-2 gap-3"> Warning: Metaverse ahead!</DialogTitle>
          <p className="font-semibold">
            In the real world, drivers shouldn't need to buy their gas (or energy) on a website before filling their
            tank up. This also apply to DeVolt, obviously.
          </p>
          <p className="">
            Keep in mind that this page only simulates what a driver would do in a charge station. In the real scenario,
            the driver would just pull up to the station, plug their car in, connect his/her wallet and choose the
            amount of energy to buy.
          </p>
          <button
            onClick={() => setMetaverseDialog(false)}
            className="bg-primary text-black font-semibold px-4 py-2 rounded-lg hover:scale-105 transition"
          >
            Got it!
          </button>
        </DialogContent>
      </Dialog>
      <GetUserGeolocationDialog />
      <div className="flex flex-col mx-8 my-2">
        <h1 className="text-neutral text-5xl my-8">Choose your charger point</h1>
        <div className="p-4 px-8 rounded-3xl bg-black">
          <MapSectionBuypage
            roundedTopCorners={true}
            roundedBottomCorners={true}
            stations={stations}
            setStations={setStations}
            width={"95%"}
            setSelectedStation={setSelectedStation}
          />
          <div className="bg-[#010101] w-full -mt-12 z-0 ml-8 py-8 rounded-lg">
            <div className="flex gap-x-5 w-full my-4 mx-8 divide-x">
              <div className="w-[30%]">
                <StationData selectedStation={selectedStation} />
              </div>
              <div className="w-[70%] pl-12">
                <BuyEnergy value={value} setValue={setValue} averagePrice={averagePrice}>
                  <button
                    onClick={() => setOpenPopUp(true)}
                    className={`rounded-full px-8 py-2 text-[#1e1e1e] font-bold hover:scale-95 duration-100 ${disableButton}`}
                  >
                    Buy energy
                  </button>
                </BuyEnergy>
              </div>
            </div>
          </div>
          <Dialog open={openPopUp}>
            <DialogContent className="bg-[#1a1a1a] border-none shadow-lg">
              <DialogTitle className="text-3xl flex text-white pb-2 gap-3"> Review you purchase:</DialogTitle>
              <DialogDescription className="leading-[1px] text-center">
                <p className="text-xl font-semibold">Selected Station:</p>
                <p className="text-xl font-semibold">Address:</p>
                <p>{address}</p>
                <p className="pt-6 text-xl font-semibold">Price for each Kw:</p>
                <p>{averagePrice} Voltz/Kw</p>
                <p className="pt-6 text-xl font-semibold">Amount of Kw you are buying:</p>
                <p>{value} Kws</p>
                <p className="pt-6 text-xl font-semibold">Total to be paid:</p>
                <p>{value * averagePrice} Kws</p>
              </DialogDescription>
              <button className="bg-primary text-black font-semibold px-4 py-2 rounded-lg hover:scale-105 transition">
                Place Bid
              </button>
              <button
                onClick={() => {
                  setOpenPopUp(false)
                 } }
                className="bg-[#444] text-white px-4 py-2 rounded-lg hover:scale-105 transition"
              >
                Go back
              </button>
            </DialogContent>
          </Dialog>
        </div>
        <button
                onClick={() => {
                  writeAsync()
                 } }
                className="bg-[#444] text-white px-4 py-2 rounded-lg hover:scale-105 transition"
              >
                Go back
              </button>
      </div>
    </LocationProvider>
  );
};

export default BuyPower;
