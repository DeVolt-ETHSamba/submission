import { Bid } from "./Bid";
export class WhitelistedBid extends Bid {
    redeemed: boolean = false;
  
    constructor(sender: string, batteryAmount: number, pricePerAmount: number) {
      super(sender, batteryAmount, pricePerAmount);
    }
  }