import { toHex } from "viem";
import { app } from "../index";
import { Bid } from "./Bid";

export class Auction {
    duration: number = 120;
    endTime: number;
    ongoing: boolean = false;
    bids: Bid[] = [];
    winningBids: Bid[] = [];
    requiredCharge: number;
  
    constructor(requiredCharge: number, currentTimestamp: number) {
      this.ongoing = true;
      this.endTime = currentTimestamp + this.duration;
      this.requiredCharge = requiredCharge;
      app.createNotice({
        payload: toHex(
          `Auction created with endTime: ${this.endTime}\n currentTime: ${currentTimestamp}\n`
        ),
      });
    }
  }