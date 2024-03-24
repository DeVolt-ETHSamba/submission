// src/components/Map.tsx
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, MapContainerProps, Marker, Popup, TileLayer, Tooltip, useMap } from "react-leaflet";
import { Progress } from "~~/components/ui/progress";
import Station from "~~/types/station";
import makePercentage from "~~/utils/makePercentage";

const iAmHereIcon = L.icon({
  iconUrl: "/mapIcon.svg",
  iconRetinaUrl: "/mapIcon.svg",
  iconSize: [32, 32],
  popupAnchor: [-1, -16],
});
const stationIcon = L.icon({
  iconUrl: "/mapIcon2.svg",
  iconRetinaUrl: "/mapIcon2.svg",
  shadowUrl: "/shadow.svg",
  shadowRetinaUrl: "/shadow.svg",
  shadowSize: [80, 80],
  shadowAnchor: [30, 45],
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [-1, -58],
});

const MapUpdater = ({ mapCenter }: any) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(mapCenter, 16, {
      animate: true,
      duration: 5.0, // Duração da animação em segundos
    });
  }, [mapCenter, map]);

  return null;
};

interface mapProps {
  stations: any;
  width?: string;
  height?: string;
  center: [number, number];
  userLocation: [number, number];
  buttonText?: string;
  roundedTopCorners: boolean;
  roundedBottomCorners: boolean;
  setSelectedStation?: (station: any) => void;
  hidden?: boolean;
}

const Map = ({
  stations,
  width,
  height,
  center,
  userLocation,
  buttonText,
  roundedTopCorners,
  roundedBottomCorners,
  setSelectedStation,
  hidden,
}: mapProps) => {
  const [containerStyle, setContainerStyle] = useState<MapContainerProps["style"]>({
    width: width || "100%",
    height: height || "550px",
    borderTopLeftRadius: roundedTopCorners ? "20px" : "0",
    borderTopRightRadius: roundedTopCorners ? "20px" : "0",
    borderBottomLeftRadius: roundedBottomCorners ? "20px" : "0",
    borderBottomRightRadius: roundedBottomCorners ? "20px" : "0",
    margin: "auto",
  });

  useEffect(() => {
    setContainerStyle({
      width: width || "100%",
      height: height || "550px",
      borderTopLeftRadius: roundedTopCorners ? "20px" : "0",
      borderTopRightRadius: roundedTopCorners ? "20px" : "0",
      borderBottomLeftRadius: roundedBottomCorners ? "20px" : "0",
      borderBottomRightRadius: roundedBottomCorners ? "20px" : "0",
      margin: "auto",
    });
  }, [width, height]);

  return (
    <>
        <style>
          {`
        .leaflet-popup-content-wrapper, .leaflet-popup-tip {
          background-color: #222;
          border-radius: 10px;
          text-color: white;
        }
        `}
        </style>
        <MapContainer center={center} zoom={1} scrollWheelZoom={true} style={containerStyle}>
          <MapUpdater mapCenter={center} />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker icon={iAmHereIcon} position={userLocation}>
            <Popup>Você está aqui!</Popup>
          </Marker>

          {/* map the stations prop */}

          {stations.map((station: Station, index: number) => {
            console.log(station.longitude)
            return (
              <Marker key={station.id} position={[station.latitude, station.longitude]} icon={stationIcon}>
                <Popup>
                  <div className="leading-[1px] text-white">
                    <p className="pb-4">{station.address||"Unnamed station"} </p>
                    <p>{station.address}</p>
                    <a href={`https://www.google.com/maps/search/${station.latitude},+${station.longitude}?entry=tts`}>
                      Ver no Google Maps
                    </a>
                    <p className="font-bold ">Carga disponível:</p>
                    <Progress className="bg-slate-300" value={makePercentage(station.batteryLevel, station.maxCapacity).toFixed(0) || 50}></Progress>
                    <p className="">{makePercentage(station.batteryLevel, station.maxCapacity).toFixed(0) || 50}% (12 A/h)</p>

                  <p className="font-bold pt-4">Compatibility:</p>
                  <p className=""> BYD, EC20 and Volvo Plugs</p>

                  <p className="font-bold pt-4">Price per Kw:</p>
                  <p className="">{station.meanPrice} Voltz</p>

                    {buttonText && <button
                      onClick={() => {
                        if (setSelectedStation) {
                            setSelectedStation(station);
                        }
                      }}
                      className="bg-primary p-4 px-6 rounded-full text-[#1e1e1e] font-bold hover:bg-green-400 transition"
                    >
                      {buttonText}
                    </button>}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
    </>
  );
};

export default Map;
