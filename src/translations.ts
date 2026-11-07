import { Language } from './types';

export const TRANSLATIONS: Record<Language, {
  brandName: string;
  tagline: string;
  searchPlaceholder: string;
  searchHint: string;
  allVehicles: string;
  cngVehicles: string;
  carVehicles: string;
  bikeVehicles: string;
  autoVehicles: string;
  evVehicles: string;
  sedanVehicles: string;
  suvVehicles: string;
  perKmRate: string;
  estimatedFare: string;
  distance: string;
  bookNow: string;
  callDriver: string;
  driverRegistration: string;
  driverDecidesRate: string;
  customerId: string;
  kirayaPhilosophy: string;
  noCommission: string;
  directPayment: string;
  eta: string;
  availableDrivers: string;
  quickRoutes: string;
  customDistance: string;
  clearSearch: string;
  driverNameLabel: string;
  carNameLabel: string;
  vehicleTypeLabel: string;
  fuelTypeLabel: string;
  ratePerKmLabel: string;
  phoneLabel: string;
  plateLabel: string;
  licencePhotoLabel: string;
  vehiclePhotoLabel: string;
  rcPhotoLabel: string;
  driverRegistrationSubmit: string;
  driverRegisteredSuccess: string;
  bookingConfirmed: string;
  shareOtp: string;
  arrivingIn: string;
  tripInProgress: string;
  tripCompleted: string;
  finishRide: string;
  directCall: string;
  totalKm: string;
  driverDirectFare: string;
}> = {
  hinglish: {
    brandName: 'Sab Gaadi Wala',
    tagline: 'Direct Driver, Sahi Kiraya · 0% Commission',
    searchPlaceholder: 'Search CNG, Car, Bike, Auto, Driver ya Gaadi...',
    searchHint: 'CNG likha -> sirf CNG | Car likha -> sirf Car | Kuch nahi likha -> sab wale',
    allVehicles: 'Sab (All)',
    cngVehicles: 'CNG',
    carVehicles: 'Car',
    bikeVehicles: 'Bike',
    autoVehicles: 'Auto',
    evVehicles: 'EV Green',
    sedanVehicles: 'Sedan',
    suvVehicles: 'SUV',
    perKmRate: 'Kiraya Rate',
    estimatedFare: 'Total Kiraya',
    distance: 'Distance (Doori)',
    bookNow: 'Book Gaadi',
    callDriver: 'Driver Ko Call Karein',
    driverRegistration: 'Driver Registration',
    driverDecidesRate: 'Driver hi tay kare 1 KM pe kitna lena hai',
    customerId: 'Customer ID',
    kirayaPhilosophy: 'Kiraya Ab Bhi Driver Ka Hi Hai',
    noCommission: '0% Middleman Cut · Pure paise seedhe driver ke haath mein',
    directPayment: 'Seedha Driver Ko Cash ya UPI dein',
    eta: 'Aane ka samay',
    availableDrivers: 'Available Gaadiyan',
    quickRoutes: 'Famous Routes',
    customDistance: 'Apni Doori Chunhein',
    clearSearch: 'Filter Reset Karein',
    driverNameLabel: 'Driver Ka Pura Naam',
    carNameLabel: 'Gaadi / Auto Ka Model (e.g. WagonR, Bajaj Auto)',
    vehicleTypeLabel: 'Gaadi Type (CNG, Car, Bike, Auto...)',
    fuelTypeLabel: 'Fuel Type (CNG, Petrol, Diesel, EV)',
    ratePerKmLabel: 'Aap 1 KM ka kitna kiraya lenge? (Driver sets own rate)',
    phoneLabel: 'Driver Mobile Number',
    plateLabel: 'Auto / Car Number Plate (e.g. DL 01 AB 1234)',
    licencePhotoLabel: 'Driving Licence Ki Photo Upload',
    vehiclePhotoLabel: 'Car ya Auto/Riksha Ki Photo Upload',
    rcPhotoLabel: 'RC Book Photo Upload (Ola/Uber Standard)',
    driverRegistrationSubmit: 'Driver Registration Complete Karein',
    driverRegisteredSuccess: 'Driver Registration Successful! Aapki gaadi turant active ho gayi.',
    bookingConfirmed: 'Gaadi Book Ho Gayi!',
    shareOtp: 'Yeh OTP Driver ko dikhayein jab gaadi pahuche',
    arrivingIn: 'Driver aa raha hai',
    tripInProgress: 'Ride chal rahi hai...',
    tripCompleted: 'Ride Khatam! Shukriya',
    finishRide: 'Ride Complete Karein',
    directCall: 'Direct Call Dial Karein',
    totalKm: 'Kul Doori',
    driverDirectFare: 'Direct Driver Fare'
  },
  hi: {
    brandName: 'सब गाड़ी वाला',
    tagline: 'सीधा ड्राइवर, सही किराया · शून्य कमीशन',
    searchPlaceholder: 'खोजें: CNG, कार, बाइक, ऑटो या ड्राइवर का नाम...',
    searchHint: 'CNG लिखा -> सिर्फ CNG | Car लिखा -> सिर्फ Car | कुछ नहीं -> सब गाड़ियां',
    allVehicles: 'सब गाड़ियां',
    cngVehicles: 'सीएनजी',
    carVehicles: 'कार',
    bikeVehicles: 'बाइक',
    autoVehicles: 'ऑटो',
    evVehicles: 'इलेक्ट्रिक',
    sedanVehicles: 'सेडान',
    suvVehicles: 'एसयूवी',
    perKmRate: 'किराया प्रति किमी',
    estimatedFare: 'कुल किराया',
    distance: 'दूरी',
    bookNow: 'गाड़ी बुक करें',
    callDriver: 'ड्राइवर से बात करें',
    driverRegistration: 'ड्राइवर रजिस्ट्रेशन',
    driverDecidesRate: 'ड्राइवर ही तय करे 1 किमी पर कितना लेना है',
    customerId: 'कस्टमर आईडी',
    kirayaPhilosophy: 'किराया अब भी ड्राइवर का ही है',
    noCommission: 'कोई बिचौलिया नहीं · पूरा पैसा सीधे चालक को',
    directPayment: 'नकद या UPI सीधे ड्राइवर को दें',
    eta: 'पहुंचने का समय',
    availableDrivers: 'उपलब्ध गाड़ियां',
    quickRoutes: 'प्रमुख मार्ग',
    customDistance: 'दूरी तय करें',
    clearSearch: 'फ़िल्टर हटाएं',
    driverNameLabel: 'चालक का पूरा नाम',
    carNameLabel: 'गाड़ी / ऑटो का मॉडल (उदा. वेगनआर, बजाज ऑटो)',
    vehicleTypeLabel: 'वाहन प्रकार (CNG, Car, Bike, Auto)',
    fuelTypeLabel: 'ईंधन प्रकार',
    ratePerKmLabel: 'आप 1 किमी का कितना किराया लेंगे? (चालक स्वयं तय करे)',
    phoneLabel: 'मोबाइल नंबर',
    plateLabel: 'ऑटो / कार नंबर प्लेट (उदा. DL 01 AB 1234)',
    licencePhotoLabel: 'ड्राइविंग लाइसेंस फ़ोटो',
    vehiclePhotoLabel: 'कार या ऑटो/रिक्शा की फ़ोटो',
    rcPhotoLabel: 'आरसी बुक (RC) फ़ोटो',
    driverRegistrationSubmit: 'ड्राइवर रजिस्ट्रेशन पूरा करें',
    driverRegisteredSuccess: 'ड्राइवर रजिस्ट्रेशन सफल! गाड़ी तुरंत लाइव हो गई।',
    bookingConfirmed: 'गाड़ी बुक हो गई!',
    shareOtp: 'यह OTP चालक को बताएं',
    arrivingIn: 'चालक रास्ते में है',
    tripInProgress: 'सफ़र जारी है...',
    tripCompleted: 'सफ़र संपन्न हुआ! धन्यवाद',
    finishRide: 'सफ़र समाप्त करें',
    directCall: 'सीधा कॉल करें',
    totalKm: 'कुल दूरी',
    driverDirectFare: 'सीधा चालक किराया'
  },
  en: {
    brandName: 'Sab Gaadi Wala',
    tagline: 'Direct Drivers, Honest Fares · 0% Platform Commission',
    searchPlaceholder: 'Search CNG, Car, Bike, Auto, Driver or Model...',
    searchHint: 'Search CNG -> only CNG | Car -> only Car | Empty -> all vehicles',
    allVehicles: 'All Vehicles',
    cngVehicles: 'CNG',
    carVehicles: 'Car',
    bikeVehicles: 'Bike',
    autoVehicles: 'Auto',
    evVehicles: 'EV Green',
    sedanVehicles: 'Sedan',
    suvVehicles: 'SUV',
    perKmRate: 'Rate / km',
    estimatedFare: 'Estimated Total Fare',
    distance: 'Trip Distance',
    bookNow: 'Book Ride',
    callDriver: 'Call Driver',
    driverRegistration: 'Driver Registration',
    driverDecidesRate: 'Driver decides their own 1 km rate',
    customerId: 'Customer ID',
    kirayaPhilosophy: 'Fare Always Belongs to the Driver',
    noCommission: 'Zero Aggregator Cut · 100% of the fare goes directly to the driver',
    directPayment: 'Pay direct via Cash or UPI on arrival',
    eta: 'Driver ETA',
    availableDrivers: 'Available Vehicles',
    quickRoutes: 'Popular Routes',
    customDistance: 'Custom Distance',
    clearSearch: 'Reset Filters',
    driverNameLabel: 'Full Driver Name',
    carNameLabel: 'Vehicle Model (e.g. WagonR, Bajaj Auto)',
    vehicleTypeLabel: 'Vehicle Category',
    fuelTypeLabel: 'Fuel Type',
    ratePerKmLabel: 'Your Rate for 1 KM (Driver decides own rate)',
    phoneLabel: 'Driver Mobile Number',
    plateLabel: 'Vehicle Registration Plate Number',
    licencePhotoLabel: 'Driving Licence Photo',
    vehiclePhotoLabel: 'Vehicle (Car / Rickshaw / Bike) Photo',
    rcPhotoLabel: 'RC Document Photo',
    driverRegistrationSubmit: 'Complete Driver Registration',
    driverRegisteredSuccess: 'Driver Registered Successfully! Vehicle is now live.',
    bookingConfirmed: 'Ride Confirmed!',
    shareOtp: 'Share this 4-digit OTP with your driver',
    arrivingIn: 'Driver is arriving',
    tripInProgress: 'Trip in progress...',
    tripCompleted: 'Trip Completed! Thank you',
    finishRide: 'End Trip & Receipt',
    directCall: 'Direct Call Dial',
    totalKm: 'Total Distance',
    driverDirectFare: 'Direct Driver Fare'
  }
};
