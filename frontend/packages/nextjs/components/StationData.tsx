import React, { useEffect } from 'react';
import Image from "next/image";
import Station from '~~/types/station';
import makePercentage from '~~/utils/makePercentage';

interface buyEnergyProps {
    selectedStation: Station;
}

export const StationData = ({ selectedStation }: buyEnergyProps) => {
    
    useEffect(() => {
        console.log(selectedStation)
    }, [selectedStation]);


    return (
        <>
            <p className="text-3xl text-[#37e231] font-bold">Station</p>
            <div className="flex gap-2 items-center my-4">
                <Image src="./pin.svg" alt="ttt" width={40} height={40} />
                <p className="font-bold">Address</p><span>{selectedStation["address"] || "-"}</span>
            </div>
            <div className="flex gap-2 items-center my-4">
                <Image src="./charger.svg" alt="ttt" width={40} height={40} />
                <b>Compatibility</b><span>BYD, EC20 and Volvo Plugs</span>
            </div>
            <div className="flex gap-2 items-center my-4">
                <Image src="./wallet.svg" alt="ttt" width={40} height={40} />
                <b>Price per Kw (Voltz)</b><span>{selectedStation.meanPrice|| "---"}</span>
            </div>
            <div className="flex gap-2 items-center my-4">
                <Image src="./capacity.svg" alt="ttt" width={40} height={40} />
                <p className="font-bold">Capacity</p><span>{selectedStation.batteryLevel && makePercentage(selectedStation.batteryLevel, selectedStation.maxCapacity).toFixed(0) || "---"}</span><span>%</span>
            </div>
        </>
    );
};
