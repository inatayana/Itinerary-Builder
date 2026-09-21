export interface ItineraryValidationResult {
  isSplitRequired: boolean;
  totalDays: number;
  totalEstimatedDurationMinutes: number;
  formattedDuration: string;
  trafficMultiplier: number;
  backtrackingFree: boolean;
  autoSplitApplied: boolean;
}

export interface RecommendedFleet {
  category: string;
  models: string[];
  reason: string;
  vehicleSpec: {
    lengthCm?: number;
    widthCm?: number;
    seatingCapacity: number;
    luggageCapacity: string;
  };
}

export interface PricingBreakdown {
  charterBaseRateIdr: number;
  zoneSurchargeIdr: number;
  seasonalMultiplierIdr: number;
  totalPriceIdr: number;
  currency: string;
  pricePerVehicle: boolean;
  paymentMethods: string[];
  paymentDeadlineMinutes: number;
}

export interface EnRouteSuggestion {
  locationId: string;
  name: string;
  distanceFromPrevious: number;
  estimatedTime: number;
  reason: string;
}

export interface AvailableDriver {
  driverId: string;
  name: string;
  rating: number;
  languages: string[];
  vehicle: string;
}

export interface CalculateItineraryOutput {
  status: 'SUCCESS' | 'ERROR';
  requestId: string;
  itineraryValidation: ItineraryValidationResult;
  recommendedFleet: RecommendedFleet;
  pricingBreakdown: PricingBreakdown;
  enRouteSuggestions: EnRouteSuggestion[];
  bookingActionLink?: string;
  driverEnglishLevel?: string;
  availableDrivers?: AvailableDriver[];
}
