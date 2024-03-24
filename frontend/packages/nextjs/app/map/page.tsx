"use client"

import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo } from "react";

const stations = [
  {
    x: -23.5571341,
    y: -46.7043563,
    address: "Rua piracanjuba, 240",
    maxVoltage: 45,
    availablePlugs: "Tipo S2, BYD, BMW",
    availableEnergyPercentage: 12,

  },
  {
    x: -23.5561341,
    y: -46.7030563,
    address: "Rua piracanjuba, 242",
    maxVoltage: 45,
    availablePlugs: "Tipo S2, BYD, BMW",
    availableEnergyPercentage: 30,
  },
  {
    x: -23.5591341,
    y: -46.7001563,
    address: "Rua piracanjuba, 243",
    maxVoltage: 45,
    availablePlugs: "Tipo S2, BYD, BMW",
    availableEnergyPercentage: 93,
  },
  {
    x: -23.5553341,
    y: -46.7091563,
    address: "Rua piracanjuba, 232",
    maxVoltage: 45,
    availablePlugs: "Tipo S2, BYD, BMW",
    availableEnergyPercentage: 51,
  }
]


export default function Home() {

  const Map = useMemo(() => dynamic(
    () => import('~~/components/Map'),
    { 
      loading: () => <p>map is loading</p>,
      ssr: false
    }
  ), [])


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p>mapa pra quem está vendendo energia</p>
      <Map
      
        stations={stations}
        center={[-23.5571341,-46.7043563]}
        userLocation={[-23.5581341,-46.7043563]}
        showAuctionButton={true}
      />
        <p className="mt-8">mapa pra quem quer abastecer seu carro</p>
      <Map
        stations={stations}
        center={[-23.5571341,-46.7043563]}
        userLocation={[-23.5581341,-46.7043563]}
        showAuctionButton={false}
        
      />
      </div>
    </main>
  );
}
