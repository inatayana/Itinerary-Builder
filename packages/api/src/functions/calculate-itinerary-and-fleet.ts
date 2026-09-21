import { prisma } from '@bali-car-charter/database';
import { FCS_CATEGORIES, FCS_RATE_BY_CATEGORY, FCS_CAPACITY_BY_CATEGORY } from '@bali-car-charter/shared';

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

export interface CalculateItineraryOutput {
  status: 'SUCCESS';
  requestId: string;
  itineraryValidation: ItineraryValidationResult;
  recommendedFleet: RecommendedFleet;
  pricingBreakdown: PricingBreakdown;
  enRouteSuggestions: Array<{
    locationId: string;
    name: string;
    distanceFromPrevious: number;
    estimatedTime: number;
    reason: string;
  }>;
  bookingActionLink?: string;
  driverEnglishLevel?: string;
  availableDrivers?: Array<{
    driverId: string;
    name: string;
    rating: number;
    languages: string[];
    vehicle: string;
  }>;
}

export async function calculate_itinerary_and_fleet(input: {
  request_id: string;
  origin: { location_name: string; coordinates: { lat: number; lng: number } };
  destination_ids: string[];
  passengers: { adults: number; children: number };
  luggage: { large_suitcases: number; cabin_bags: number };
  travel_date: string;
  duration_preference: string;
  timezone?: string;
  traffic_multiplier?: number;
  fcs_validation?: boolean;
}): Promise<CalculateItineraryOutput> {
  const pax = input.passengers.adults + input.passengers.children;
  const trafficMultiplier = input.traffic_multiplier ?? 1.0;
  const totalMinutes = Math.round((input.duration_preference === 'half_day' ? 240 : input.duration_preference === 'full_day' ? 480 : 720) * trafficMultiplier);

  const relevantCategories = FCS_CATEGORIES.filter(cat => {
    const cap = FCS_CAPACITY_BY_CATEGORY[cat.name];
    return cap && cap.passengers >= pax && cap.luggageLarge >= input.luggage.large_suitcases && cap.luggageCabin >= input.luggage.cabin_bags;
  });

  const recommendedCategory = relevantCategories[0]?.name ?? 'Premium MPV Charter';
  const rate = FCS_RATE_BY_CATEGORY[recommendedCategory] ?? { standard: 1400000, weekend: 1800000 };
  const isWeekend = [0, 6].includes(new Date(input.travel_date).getDay());
  const baseRate = isWeekend ? rate.weekend : rate.standard;

  return {
    status: 'SUCCESS',
    requestId: input.request_id,
    itineraryValidation: {
      isSplitRequired: false,
      totalDays: 1,
      totalEstimatedDurationMinutes: totalMinutes,
      formattedDuration: formatDuration(totalMinutes),
      trafficMultiplier,
      backtrackingFree: true,
      autoSplitApplied: false,
    },
    recommendedFleet: {
      category: recommendedCategory,
      models: FCS_CATEGORIES.find(c => c.name === recommendedCategory)?.models ?? [],
      reason: `Kapasitas ${pax} Pax + ${input.luggage.large_suitcases} Koper Besar cocok dengan standar FCS v1.0 ${recommendedCategory}.`,
      vehicleSpec: {
        seatingCapacity: FCS_CAPACITY_BY_CATEGORY[recommendedCategory]?.passengers ?? 6,
        luggageCapacity: `${input.luggage.large_suitcases} large suitcases + ${input.luggage.cabin_bags} cabin bags`,
      },
    },
    pricingBreakdown: {
      charterBaseRateIdr: baseRate,
      zoneSurchargeIdr: 0,
      seasonalMultiplierIdr: 0,
      totalPriceIdr: baseRate,
      currency: 'IDR',
      pricePerVehicle: true,
      paymentMethods: ['credit_card', 'bank_transfer', 'qris', 'ovo', 'gopay'],
      paymentDeadlineMinutes: 30,
    },
    enRouteSuggestions: [],
    bookingActionLink: `https://balicarcharter.com/checkout?ref=${input.request_id}`,
    driverEnglishLevel: 'fluent',
    availableDrivers: [],
  };
}

export async function validateFleetAgainstFCS(input: {
  pax: number;
  luggage: { large_suitcases: number; cabin_bags: number };
  fleet_category: string;
  zone: string;
  duration_hours: number;
}): Promise<{
  isValid: boolean;
  validationErrors: string[];
  recommendedCategory: string;
  alternativeCategories: string[];
  details: {
    capacityMatch: boolean;
    zoneCompliance: boolean;
    durationSuitable: boolean;
  };
}> {
  const errors: string[] = [];
  const cap = FCS_CAPACITY_BY_CATEGORY[input.fleet_category];

  if (!cap) {
    errors.push(`Fleet category "${input.fleet_category}" not found in FCS`);
    return {
      isValid: false,
      validationErrors: errors,
      recommendedCategory: input.fleet_category,
      alternativeCategories: [],
      details: { capacityMatch: false, zoneCompliance: false, durationSuitable: false },
    };
  }

  const capacityMatch = cap.passengers >= input.pax && cap.luggageLarge >= input.luggage.large_suitcases && cap.luggageCabin >= input.luggage.cabin_bags;
  if (!capacityMatch) {
    errors.push(`Capacity exceeded: ${input.pax} Pax vs ${cap.passengers} max, ${input.luggage.large_suitcases} large suitcases vs ${cap.luggageLarge} max`);
  }

  const zoneCompliance = true;
  const durationSuitable = input.duration_hours <= 12;

  const alternatives = Object.keys(FCS_CAPACITY_BY_CATEGORY).filter(c => c !== input.fleet_category);

  return {
    isValid: errors.length === 0,
    validationErrors: errors,
    recommendedCategory: input.fleet_category,
    alternativeCategories: alternatives.slice(0, 3),
    details: {
      capacityMatch,
      zoneCompliance,
      durationSuitable,
    },
  };
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} Menit`;
  if (mins === 0) return `${hours} Jam`;
  return `${hours} Jam ${mins} Menit`;
}
