import { Driver } from '../types';

/**
 * SAB GAADI WALA SEARCH - YEHI TERA MAIN DIMAG HAI
 * Search engine that filters drivers based on vehicle type, vehicle name, or driver name.
 * 
 * Rules:
 * - CNG likha -> sirf CNG wale
 * - Car likha -> sirf Car wale
 * - Bike likha -> sirf Bike wale
 * - Kuch nahi likha -> sab wale
 */
export function searchGadi(searchText: string, allDrivers: Driver[]): Driver[] {
  const query = searchText ? searchText.trim().toLowerCase() : '';

  // Kuch nahi likha ya 'sab' / 'all' likha -> sab wale
  if (!query || query === 'sab' || query === 'all') {
    return allDrivers;
  }

  let result: Driver[] = [];
  for (let driver of allDrivers) {
    const vType = (driver.vehicleType || '').toLowerCase();
    const carName = (driver.carName || '').toLowerCase();
    const driverName = (driver.driverName || '').toLowerCase();
    const fuelType = (driver.fuelType || '').toLowerCase();

    // Exact or partial vehicleType match
    // Ya driver ka Naam / Gaadi ka Naam milta hai
    // Ya fuel type (e.g. CNG, Petrol, EV)
    if (
      vType === query ||
      carName === query ||
      carName.includes(query) ||
      driverName.includes(query) ||
      vType.includes(query) ||
      fuelType === query ||
      (query === 'taxi' && (vType === 'car' || vType === 'cng' || vType === 'sedan')) ||
      (query === 'rickshaw' && vType === 'auto') ||
      (query === 'motorcycle' && vType === 'bike')
    ) {
      result.push(driver);
    }
  }

  return result;
}

/**
 * KIRAYA AB BHI DRIVER KA HI HAI
 * Direct calculation without surge pricing or platform commission cuts.
 * CNG wala 14 Rs, Car wala 18 Rs, Bike wala 8 Rs
 */
export function calculateFare(distanceKm: number, driverPrice: number): number {
  if (distanceKm <= 0 || driverPrice <= 0) return 0;
  return Math.round(distanceKm * driverPrice);
}

/**
 * Helper to get minimum standard fare recommendation for vehicle category
 */
export function getStandardRatePerKm(vehicleType: string): number {
  switch (vehicleType.toLowerCase()) {
    case 'cng':
      return 14;
    case 'car':
      return 18;
    case 'bike':
      return 8;
    case 'auto':
      return 12;
    case 'sedan':
      return 22;
    case 'suv':
      return 28;
    case 'ev':
      return 15;
    default:
      return 16;
  }
}
