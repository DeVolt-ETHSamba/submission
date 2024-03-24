import React, { useState } from 'react';

interface buyEnergyProps {
    averagePrice: number;
    value: number;
    setValue: any;
    children: React.ReactNode;
  }

export const BuyEnergy = ({averagePrice, value, setValue, children}: buyEnergyProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
    };

    
  return (
    <div className="w-[90%] bg-[#3c3c3c] h-full rounded-xl py-4 px-8">
    <p className="text-2xl font-bold">Buy Energy</p>
    <p>Amount of energy:</p>
    <div className="flex flex-col justify-center items-center">
      <input type="range" min={0} max={100} value={value} onChange={handleChange} className="range px-2" />
      <p className="font-bold text-2xl px-2">{value}</p>
      <p className="text-sm -m-3 px-2">VOLTZ/KW</p>
    </div>
    <div className="flex justify-between mt-2">
      <p className="font-bold text-xl">Total to be paid: {value * averagePrice}</p>
      {children}
    </div> 
  </div>   
  ); 
};
