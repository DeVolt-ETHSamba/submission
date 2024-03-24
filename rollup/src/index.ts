import { createApp } from "@deroll/app";
import { createRouter } from "@deroll/router";
import { createWallet } from "@deroll/wallet";
import {
  decodeFunctionData,
  encodeFunctionData,
  parseAbi,
  Address,
  toHex,
} from "viem";
import { Station } from "./models/Station";
import { Bid } from "./models/Bid";
import { WhitelistedBid } from "./models/WhitelistedBid";

const ROLLUP_SERVER =
  process.env.ROLLUP_HTTP_SERVER_URL || "http://127.0.0.1:5004";

export const app = createApp({ url: ROLLUP_SERVER });
const wallet = createWallet();
const router = createRouter({ app });

export let stations: Station[] = [];
export let whitelist: WhitelistedBid[] = [];

const abi = parseAbi([
  "function withdraw(address)",
  "function placeBid(string,address,string,string)",
  "function rechargeBattery(string,address,string)",
  "function batteryReport(string,string,string,string,string)",
]);

const contractAbi = parseAbi(["function mint(address,uint256)"]);

app.addAdvanceHandler(wallet.handler);

app.addAdvanceHandler(async ({ payload, metadata }) => {
  try {
    const { functionName, args } = decodeFunctionData({ abi, data: payload });
    let id: string,
      latitude,
      longitude,
      maxCapacity,
      batteryLevel,
      batteryAmount,
      pricePerAmount,
      encodedData,
      token: Address,
      seller: string;
    switch (functionName) {
      case "batteryReport":
        [id, latitude, longitude, maxCapacity, batteryLevel] = args;

        let station = stations.find((station) => station.id === id);

        if (!station) {
          station = new Station(
            id,
            parseFloat(latitude),
            parseFloat(longitude),
            parseFloat(maxCapacity),
            parseFloat(batteryLevel)
          );
          stations.push(station);
          app.createNotice({
            payload: toHex(`New station created with ID: ${id}\n`),
          });
        } else {
          app.createNotice({
            payload: toHex(`Station with ID: ${id} found.\n`),
          });
        }
        if (station.auction && station.auction.ongoing) {
          if (station.auction.endTime <= metadata.timestamp) {
            station.finalizeAuction(metadata.timestamp);
            app.createNotice({
              payload: toHex(
                `Auction finalized for station with ID: ${id}\nBids: ${station.auction.winningBids}-${station.auction.winningBids.length}\n`
              ),
            });
          }
        } else {
          let batteryDeficit =
            station.maxCapacity * (station.batteryLevel / 100);
          let reqCharge = station.maxCapacity - batteryDeficit;
          if (reqCharge >= 20) {
            station.createAuction(reqCharge, metadata.timestamp);
            app.createNotice({
              payload: toHex(
                `Auction created for station with ID: ${id}\n, and currenTime: ${metadata.timestamp}\n`
              ),
            });
          }
        }

        app.createNotice({
          payload: toHex(
            `Battery report received for station with ID: ${id}\n`
          ),
        });
        return "accept";
      case "placeBid":
        [id, seller, batteryAmount, pricePerAmount] = args;

        let bidStation = stations.find((station) => station.id === id);

        if (!bidStation) {
          app.createNotice({
            payload: toHex(`Station with ID: ${id} does not exist.\n`),
          });
          return "reject";
        }

        if (bidStation.auction && bidStation.auction.ongoing) {
          if (bidStation.auction.endTime >= metadata.timestamp) {
            let bid = new Bid(
              seller,
              parseFloat(batteryAmount),
              parseFloat(pricePerAmount)
            );
            bidStation.auction.bids.push(bid);
            app.createNotice({
              payload: toHex(`Bid placed for station with ID: ${id}.\n`),
            });
          } else {
            bidStation.finalizeAuction(metadata.timestamp);
            app.createNotice({
              payload: toHex(
                `Auction for station with ID: ${id} has already ended.\n`
              ),
            });
          }
        } else {
          app.createNotice({
            payload: toHex(
              `No ongoing auction for station with ID: ${id}.\nAuction has already ended.\n`
            ),
          });
        }
        return "accept";
      case "rechargeBattery":
        [id, seller, batteryAmount] = args;
        let rechargeBatteryStation = stations.find(
          (station) => station.id === id
        );

        whitelist.forEach((bid: WhitelistedBid) => {
          if (bid?.sender === seller) {
            bid.redeemed = true;
            rechargeBatteryStation?.setMeanPrice(bid.pricePerAmount);
          }
        });
        app.createNotice({
          payload: toHex(
            `The account ${metadata.msg_sender} is recharging ${batteryAmount} battery of station with ID: ${id}.`
          ),
        });
        return "accept";
      case "withdraw":
        [token] = args;
        let amountToWithdraw = 0;
        whitelist.forEach((bid: WhitelistedBid) => {
          if (
            bid.sender.toLowerCase() === metadata.msg_sender.toLowerCase() &&
            bid.redeemed
          ) {
            amountToWithdraw += bid.batteryAmount * bid.pricePerAmount;
          }
        });
        encodedData = encodeFunctionData({
          abi: contractAbi,
          functionName: "mint",
          args: [metadata.msg_sender, BigInt(amountToWithdraw)],
        });
        app.createVoucher({
          destination: token,
          payload: encodedData,
        });
        app.createNotice({
          payload: toHex(
            `The account ${metadata.msg_sender} is withdrawing ${amountToWithdraw} tokens of "0x5dD976d75eF97a70790Cf8c39e7A1f8F5ff239F6" at ${metadata.timestamp}.\n`
          ),
        });
        return "accept";
    }
  } catch (e) {
    return "reject";
  }
});

router.add<{ token: Address; sender: string }>(
  "wallet/balance/:token/:sender",
  ({ params: { token, sender } }) => {
    return JSON.stringify({
      balance: `${wallet.balanceOf(token, sender).toString()}`,
    });
  }
);

router.add<{ id: string }>(
  "station/:id/auction/winners",
  ({ params: { id } }) => {
    let station = stations.find((station) => station.id == id);
    if (!station) {
      throw new Error(`Station with id ${id} not found`);
    }
    if (!station.auction) {
      throw new Error(`Station with id ${id} has no auction`);
    }
    if (!station.auction.winningBids) {
      throw new Error(`Auction for station with id ${id} has no winning bids`);
    }
    let winningBids = station.auction.winningBids;
    return JSON.stringify({
      selected_bids: winningBids,
    });
  }
);

router.add<{ id: string }>("station/:id/auction/bids", ({ params: { id } }) => {
  let station = stations.find((station) => station.id == id);
  if (!station) {
    throw new Error(`Station with id ${id} not found`);
  }
  if (!station.auction) {
    throw new Error(`Station with id ${id} has no auction`);
  }
  if (!station.auction.bids) {
    throw new Error(`Auction for station with id ${id} has no winning bids`);
  }
  let bids = station.auction.bids;
  return JSON.stringify({
    bids: bids,
  });
});

router.add<{ id: string }>("station/:id", ({ params: { id } }) => {
  let station = stations.find((station) => station.id == id);
  if (!station) {
    throw new Error(`Station with id ${id} not found`);
  }
  return JSON.stringify({
    station: station,
  });
});

// get all stations
router.add("stations", () => {
  return JSON.stringify({
    stations: stations,
  });
});

app.addInspectHandler(router.handler);

app.start().catch((e) => {
  console.error("Error starting the app:", e);
  process.exit(1);
});
