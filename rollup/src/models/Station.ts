import { toHex } from "viem";
import { Auction } from "./Auction";
import { app, whitelist } from "..";
import { Bid } from "./Bid";
import { WhitelistedBid } from "./WhitelistedBid";

export class Station {
    // variables
  
    id: string; // 1
    latitude: number; // 43.120491
    longitude: number; // -83.617767
    maxCapacity: number; // 25000,00 kW
    batteryLevel: number; // 100 -> 100%
    prices: number[] = [];
    meanPrice: number = 0.0; // 80,50 ->
    auction: Auction | undefined = undefined; 
  
    constructor(
      id: string,
      latitude: number,
      longitude: number,
      maxCapacity: number,
      batteryLevel: number
    ) {
      this.id = id;
      this.latitude = latitude;
      this.longitude = longitude;
      this.maxCapacity = maxCapacity;
      this.batteryLevel = batteryLevel;
    }
  
    // methods

    setMeanPrice(pricePerAmount: number) {
      this.prices.push(pricePerAmount);
      this.meanPrice = this.prices.reduce((a, b) => a + b, 0) / this.prices.length;
    }
  
    createAuction(requiredCharge: number, currentTimestamp: number) {
      app.createNotice({
        payload: toHex(
          `Creating auction with requiredCharge: ${requiredCharge}\n and currentTime: ${currentTimestamp}\n`
        ),
      });
      let newAuction = new Auction(requiredCharge, currentTimestamp);
      this.auction = newAuction;
      this.auction.bids = [];
      this.auction.winningBids = [];
    }
  
    finalizeAuction(currentTimestamp: number) {
      app.createNotice({
        payload: toHex(
          `Finalizing auction with currentTime: ${currentTimestamp}\n`
        ),
      });
      if (
        this.auction &&
        this.auction.ongoing &&
        this.auction.endTime <= currentTimestamp
      ) {
        let acceptedBids: Bid[] = [];
        let energyNeeded = this.auction.requiredCharge;
  
        let sortedBids = this.auction.bids.sort(
          (a, b) => a.pricePerAmount - b.pricePerAmount
        );
  
        for (let bid of sortedBids) {
          if (energyNeeded <= 0) {
            break;
          }
  
          if (bid.batteryAmount <= energyNeeded) {
            acceptedBids.push(bid);
            energyNeeded -= bid.batteryAmount;
          } else {
            let partialBid = new Bid(
              bid.sender,
              energyNeeded,
              bid.pricePerAmount
            );
            acceptedBids.push(partialBid);
            energyNeeded = 0;
          }
        }
  
        for (let acceptedBid of acceptedBids) {
          this.batteryLevel += acceptedBid.batteryAmount;
          this.auction.winningBids.push(acceptedBid);
          whitelist.push(new WhitelistedBid(acceptedBid.sender, acceptedBid.batteryAmount, acceptedBid.pricePerAmount));
        }
  
        this.auction.ongoing = false;
  
        app.createNotice({
          payload: toHex(`Auction finalized. Accepted bids: ${acceptedBids}\n`),
        });
      } else {
        app.createNotice({
          payload: toHex(`No ongoing auction for this station.\n`),
        });
      }
    }
  
    rechargeBattery(batteryAmount: number) {
      
    }
  
    consumeBattery(batteryAmount: number) {
      if (this.batteryLevel >= batteryAmount) {
        this.batteryLevel -= batteryAmount;
      } else {
        throw new Error(
          "Not enough battery level to consume the requested amount."
        );
      }
    }
  }
  