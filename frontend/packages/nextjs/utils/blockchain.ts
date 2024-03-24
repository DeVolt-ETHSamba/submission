import { encodeFunctionData, parseAbi } from "viem";

export const makeCartesiBytecode = (functionName:any, args:any) => {
  return encodeFunctionData({
    abi: parseAbi([
      "function withdraw(address)",
      "function placeBid(string,address,string,string)", //id da estação, address do sender, batteryAmount, price
      "function rechargeBattery(string,address,string)",
      "function batteryReport(string,string,string,string,string)",
    ]),
    functionName: functionName,
    args: args,
  });
};
