export type VehicleType = 'CNG' | 'Car' | 'Bike' | 'Auto' | 'Sedan' | 'SUV' | 'EV';

export type FuelType = 'CNG' | 'Petrol' | 'Diesel' | 'Electric';

export interface Customer {
  id: string; // e.g. CUST-84291
  name: string;
  phone: string;
  email?: string;
  joinedAt: string;
  emergencyContact?: string;
  homeLocation?: string;
  workLocation?: string;
}

export interface Driver {
  id: string;
  driverName: string;
  carName: string;
  vehicleType: VehicleType;
  fuelType: FuelType;
  pricePerKm: number; // Driver hi tay karega 1 km ka kitna lena hai
  rating: number;
  totalRides: number;
  phone: string;
  plateNumber: string; // Auto / Car number
  ac: boolean;
  seatingCapacity: number;
  etaMinutes: number;
  locationName: string;
  mapCoords: { x: number; y: number }; // Percentage 0-100 on interactive route map
  photoUrl?: string;
  vehicleImageUrl?: string;
  // Ola/Uber style KYC documents
  drivingLicenceNumber?: string;
  licencePhotoUrl?: string;
  rcNumber?: string;
  rcPhotoUrl?: string;
  insuranceNumber?: string;
  commercialPermitNumber?: string;
  upiId?: string;
  isKycVerified?: boolean;
  isAvailable: boolean;
  languages: string[];
  badges?: string[];
  bio?: string;
}

export interface RoutePreset {
  id: string;
  city: string;
  title: string;
  pickup: string;
  destination: string;
  distanceKm: number;
  typicalDurationMin: number;
}

export type Language = 'hinglish' | 'hi' | 'en';

export interface ActiveBooking {
  id: string;
  driver: Driver;
  distanceKm: number;
  fare: number;
  pickup: string;
  destination: string;
  otp: string;
  status: 'driver_assigned' | 'arriving' | 'in_trip' | 'completed';
  startTime: string;
  paymentMode: 'cash_to_driver' | 'upi_to_driver';
}
