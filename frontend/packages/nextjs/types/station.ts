export default interface Station {
    id: number;
    latitude: number;
    longitude: number;
    address: string;
    maxVoltage: number;
    availablePlugs: string;
    maxCapacity: number, 
    batteryLevel: number,
    meanPrice: number;
  }
  