import axios, { AxiosResponse } from "axios";
import { hexToString } from "viem";
import Station from "~~/types/station";

export default async function queryAllStations() {
  const result: AxiosResponse = await axios.get("https://495b-177-92-77-170.ngrok-free.app/inspect/stations", {
    headers: {
      "ngrok-skip-browser-warning": "yes",
    },
  });
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  return JSON.parse(hexToString(result.data.reports[0].payload)).stations as Station[];
}
