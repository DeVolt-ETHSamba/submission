export class Bid {
  sender: string;
  batteryAmount: number;
  pricePerAmount: number;

  constructor(sender: string, batteryAmount: number, pricePerAmount: number) {
    this.sender = sender;
    this.batteryAmount = batteryAmount;
    this.pricePerAmount = pricePerAmount;
  }
}