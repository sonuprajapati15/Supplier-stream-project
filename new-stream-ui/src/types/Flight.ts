export interface Airline {
  logo: string;
  name: string;
}

export interface Flight {
  aircraftType: string;
  airline: Airline;
  arrivalTime: string;
  baggage: string;
  boardingTime: string;
  cabinClass: string;
  cancellationPolicy: string;
  changePolicy: string;
  checkInCounter: string;
  covidSafety: string;
  date: string;
  departureTime: string;
  duration: string;
  ecoFriendly: string;
  entertainment: string;
  extraLegroom: string;
  fareClass: string;
  flightId: string;
  flightNumber: string;
  flightType: string;
  from: string;
  gate: string;
  infantPolicy: string;
  lastUpdated: string;
  layovers: string[];
  loungeAccess: string;
  meal: string;
  onTimePerformance: string;
  petPolicy: string;
  powerOutlet: string;
  price: number;
  priorityBoarding: string;
  rating: number;
  recliningAngle: string;
  reviewsCount: number;
  seatPitch: string;
  seatType: string;
  seatWidth: string;
  terminal: string;
  to: string;
  totalStops: number;
  usbPort: string;
  vendor_logo: string;
  vendor_name: string;
  wifi: string;
}