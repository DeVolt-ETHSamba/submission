"use client";
import { encodeFunctionData, parseAbi } from "viem";

import { useEffect, useState } from "react";
import Image from "next/image";
import SellFirstStep from "./SellFirstStep";
import { ArrowLeft } from "lucide-react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import GetUserGeolocationDialog from "~~/components/GetUserGeolocationDialog";
import { Step } from "~~/components/Step";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "~~/components/ui/dialog";
import { LocationProvider } from "~~/contexts/LocationContext";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { makeCartesiBytecode } from "~~/utils/blockchain";

interface Station {
  id: number;
  x: number;
  y: number;
  address: string;
  maxVoltage: number;
  availablePlugs: string;
  availableEnergyPercentage: number;
}

const SellPower: NextPage = () => {
  const [activeStep, setActiveStep] = useState(1);

  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [selectedStation, setSelectedStation] = useState<Station>({
    id: 0,
    x: 0,
    y: 0,
    address: "",
    maxVoltage: 0,
    availablePlugs: "",
    availableEnergyPercentage: 0,
  });

  const {address} = useAccount()

  const abi = parseAbi([
    "function withdraw(address)",
    "function placeBid(string,address,string,string)", //id da estação, address do sender, batteryAmount, price
    "function rechargeBattery(string,address,string)",
    "function batteryReport(string,string,string,string,string)",
  ]);

  const bytecode = encodeFunctionData({
    abi: abi,
    functionName: 'placeBid',
    args: [selectedStation.id.toString(), address||"0x455E5AA18469bC6ccEF49594645666C587A3a71B", selectedAmount.toString(), selectedPrice.toString()]
  })

  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "InputBox",
    functionName: "addInput",
    args: [
      "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
      bytecode,
    ], //id da estação, address do sender, batteryAmount, price)],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  useEffect(() => {
    if (selectedStation.id == 0) return;
    window.scrollBy({
      behavior: "smooth",
      top: 450,
    });
  }, [selectedStation]);

  const moveToStep1 = () => {
    window.scrollBy({
      behavior: "smooth",
      top: -550,
    });
    setActiveStep(1);
  };

  const moveToStep2 = () => {
    window.scrollBy({
      behavior: "smooth",
      top: window.innerHeight,
    });
    setActiveStep(2);
  };

  const moveToStep3 = () => {
    setActiveStep(3);
  };

  const moveToStep4 = () => {
    setActiveStep(4);
  };

  const finish = () => {
    console.log({
      id: selectedStation.id,
      price: selectedPrice,
      amount: selectedAmount,
      user: address,
    });
    writeAsync()
    
  };

  return (
    <>
      <LocationProvider>
        <GetUserGeolocationDialog />
        <div className="flex flex-col mx-8 my-2">
          <h1 className="text-neutral text-5xl mb-4">Sell your power</h1>

          <SellFirstStep
            selectedStation={selectedStation}
            setSelectedStation={setSelectedStation}
            isActive={activeStep == 1 ? true : false}
          >
            <button
              onClick={() => moveToStep2()}
              className="bg-[#1c1c1c] text-xl px-8 py-6 mx-auto rounded-full text-white hover:bg-primary hover:text-black transition"
            >
              Continue with this station
            </button>
          </SellFirstStep>

          <div className="flex gap-x-7 mb-40 rounded-md mt-8">
            <Step step="2" phrase="Set your price" isActive={activeStep == 2 ? true : false}>
              <input
                type="range"
                min={0}
                max={100}
                value={selectedPrice}
                onChange={e => setSelectedPrice(parseInt(e.target.value))}
                className="range"
              />
              <div className="flex flex-col justify-center items-center">
                <p className="font-bold text-3xl text-[#1e1e1e]">{selectedPrice}</p>
                <p className="text-[#1e1e1e] text-md -m-3">VOLTZ/KW</p>
                <p className="text-[#1e1e1e] text-sm">
                  *Competitive pricing attracts buyers, fostering a dynamic and fair exchange.
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <button className="rounded-full bg-[#1e1e1e] px-4 py-4" onClick={() => moveToStep1()}>
                  <ArrowLeft size={30} />
                </button>
                <button className="rounded-full bg-[#1e1e1e] px-8 py-2" onClick={() => moveToStep3()}>
                  Next step
                </button>
              </div>
            </Step>
            <Step
              step="3"
              phrase="Select the amount of power do you have avaliable to sell"
              isActive={activeStep == 3 ? true : false}
            >
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="number"
                  className="grow bg-[#1e1e1e]"
                  value={selectedAmount}
                  onChange={e => setSelectedAmount(parseInt(e.target.value))}
                  placeholder="Enter the desired amount"
                />
                <p className="font-bold">kW</p>
              </label>
              <div className="flex justify-between mt-28">
                <button className="rounded-full bg-[#1e1e1e] px-4 py-4" onClick={() => setActiveStep(2)}>
                  <ArrowLeft size={30} />
                </button>
                <button onClick={() => moveToStep4()} className="rounded-full bg-[#1e1e1e] px-8 py-2">
                  Sell energy power
                </button>
              </div>
            </Step>
          </div>
        </div>
        <Dialog open={activeStep == 4 ? true : false}>
          <DialogContent className="bg-[#1a1a1a] border-none shadow-lg">
            <DialogTitle className="text-3xl flex text-white pb-2 gap-3"> Review you bid:</DialogTitle>
            <DialogDescription className="leading-[1px] text-center">
              <p className="text-xl font-semibold">Selected Station:</p>
              <p>{selectedStation.address}</p>
              <p className="pt-6 text-xl font-semibold">Price for each Kw:</p>
              <p>{selectedPrice} Voltz/Kw</p>
              <p className="pt-6 text-xl font-semibold">Amount of Kw you are selling:</p>
              <p>{selectedAmount} Kws</p>
            </DialogDescription>
            <p className=" text-center text-[#ccc] ">
              after the auction is finished, you have 24 hours to recharge the chosen station.
            </p>
            <button
              onClick={finish}
              className="bg-primary text-black font-semibold px-4 py-2 rounded-lg hover:scale-105 transition"
            >
              Place Bid
            </button>
            <button
              onClick={moveToStep1}
              className="bg-[#444] text-white px-4 py-2 rounded-lg hover:scale-105 transition"
            >
              Go back
            </button>
          </DialogContent>
        </Dialog>
      </LocationProvider>
    </>
  );
};

export default SellPower;
