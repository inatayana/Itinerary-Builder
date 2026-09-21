import { z } from 'zod';

export const validateFleetInputSchema = z.object({
  passengerCount: z.number().min(1),
  luggageCount: z.number().min(0),
  zoneSlug: z.string(),
  durationHours: z.number().min(1),
  vehicleCategory: z.string().optional(),
});

export type ValidateFleetInput = z.infer<typeof validateFleetInputSchema>;

export const validateFleetOutputSchema = z.object({
  success: z.boolean(),
  data: z.object({
    isValid: z.boolean(),
    recommendedCategory: z.string(),
    matchedVehicles: z.array(z.object({
      id: z.string(),
      category: z.string(),
      brand: z.string(),
      model: z.string(),
      capacity: z.number(),
      luggageCapacity: z.number(),
      dailyRate: z.number(),
      isAvailable: z.boolean(),
    })),
    warnings: z.array(z.string()),
    fcsCompliance: z.object({
      passengerCompliant: z.boolean(),
      luggageCompliant: z.boolean(),
      zoneCompliant: z.boolean(),
      durationCompliant: z.boolean(),
    }),
  }).optional(),
  error: z.string().optional(),
});

export type ValidateFleetOutput = z.infer<typeof validateFleetOutputSchema>;

export async function validateFleet(input: ValidateFleetInput): Promise<ValidateFleetOutput> {
  // TODO: Implement FCS v1.0 validation
  // Check passenger + luggage against vehicle capacity
  // Verify zone compatibility (e.g., no Hiace in narrow Canggu/Ubud alleys)
  // Validate duration against vehicle availability
  
  return {
    success: true,
    data: {
      isValid: true,
      recommendedCategory: 'MPV',
      matchedVehicles: [],
      warnings: [],
      fcsCompliance: {
        passengerCompliant: true,
        luggageCompliant: true,
        zoneCompliant: true,
        durationCompliant: true,
      },
    },
  };
}