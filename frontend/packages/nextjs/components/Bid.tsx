import React, { useState } from 'react';

interface bidProps {
    wallet: string;
    price: number;
    quantity: number;
  }

export const Bid = ({wallet, price, quantity}: bidProps) => {
    
  return (
    <div className="bg-[#333] rounded-lg px-2">
        <p className="text-xs font-bold"> Wallet:</p><p className="text-xs -mt-3">{wallet}</p>
        <p className="text-xs font-bold"> Price:</p><p className="text-xs -mt-3">{price}</p>
        <p className="text-xs font-bold"> Quantity:</p><p className="text-xs -mt-3">{quantity}</p>
    </div> 
  ); 
};
