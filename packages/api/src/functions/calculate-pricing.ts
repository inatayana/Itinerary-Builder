import { z } from 'zod';

export const calculatePricingInputSchema = z.object({
  vehicleCategory: z.string(),
  durationHours: z.number().min(1),
  distanceKm: z.number().min(0),
  zoneSlug: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  passengerCount: z.number().min(1),
  luggageCount: z.number().min(0),
  isAirportTransfer: z.boolean().default(false),
  promoCode: z.string().optional(),
});

export type CalculatePricingInput = z.infer<typeof calculatePricingInputSchema>;

export const calculatePricingOutputSchema = z.object({
  success: z.boolean(),
  data: z.object({
    basePrice: z.number(),
    distancePrice: z.number(),
    overtimePrice: z.number(),
    zoneSurcharge: z.number(),
    airportSurcharge: z.number(),
    discount: z.number(),
    tax: z.number(),
    totalPrice: z.number(),
    currency: z.string().default('IDR'),
    breakdown: z.array(z.object({
      item: z.string(),
      amount: z.number(),
      description: z.string(),
      type: z.enum(['base', 'distance', 'overtime', 'zone', 'airport', 'discount', 'tax']),
    })),
    pricePerDay: z.number(),
    pricePerHour: z.number(),
  }).optional(),
  error: z.string().optional(),
});

export type CalculatePricingOutput = z.infer<typeof calculatePricingOutputSchema>;

export async function calculatePricing(input: CalculatePricingInput): Promise<CalculatePricingOutput> {
  // TODO: Implement pricing calculation based on BUSINESS_RULES_AND_PRICING.md
  // Daily charter vs airport transfer pricing
  // Overtime calculation
  // Zone multipliers
  // Promo code validation
  
  return {
    success: true,
    data: {
      basePrice: 0,
      distancePrice: 0,
      overtimePrice: 0,
      zoneSurcharge: 0,
      airportSurcharge: 0,
      discount: 0,
      tax: 0,
      totalPrice: 0,
      currency: 'IDR',
      breakdown: [],
      pricePerDay: 0,
      pricePerHour: 0,
    },
  };
}