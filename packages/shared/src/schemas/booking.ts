import { z } from 'zod';

export const bookingCreateSchema = z.object({
  travelerId: z.string().uuid(),
  driverId: z.string().uuid().optional(),
  vehicleId: z.string().uuid(),
  bookingType: z.enum(['charter', 'airport_transfer', 'tour']),
  durationHours: z.number().min(1),
  scheduledStartTime: z.string().datetime(),
  scheduledEndTime: z.string().datetime(),
  baseFareIdr: z.number().min(0),
  taxIdr: z.number().min(0),
  discountIdr: z.number().min(0).default(0),
  totalFareIdr: z.number().min(0),
  paymentMethod: z.enum(['credit_card', 'bank_transfer', 'qris', 'ovo', 'gopay', 'cash']),
  zoneSurchargeIdr: z.number().min(0).default(0),
  seasonalMultiplier: z.number().min(0.5).max(2).default(1),
  cancellationPolicy: z.enum(['flexible', 'moderate', 'strict']).default('flexible'),
  specialRequests: z.string().optional(),
  itineraryId: z.string().uuid().optional(),
});

export const bookingUpdateSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'active', 'completed', 'cancelled', 'no_show', 'refunded']),
  paymentStatus: z.enum(['pending', 'paid', 'refunded', 'failed']),
  paymentMethod: z.enum(['credit_card', 'bank_transfer', 'qris', 'ovo', 'gopay', 'cash']),
  paymentReference: z.string().optional(),
  xenditPaymentId: z.string().optional(),
  actualStartTime: z.string().datetime().optional(),
  actualEndTime: z.string().datetime().optional(),
  driverId: z.string().uuid().optional(),
  cancellationReason: z.string().optional(),
  cancellationFeeIdr: z.number().min(0).optional(),
  specialRequests: z.string().optional(),
});

export const pricingBreakdownSchema = z.object({
  charterBaseRateIdr: z.number().min(0),
  zoneSurchargeIdr: z.number().min(0).default(0),
  seasonalMultiplierIdr: z.number().min(0).default(0),
  totalPriceIdr: z.number().min(0),
  currency: z.string().length(3).default('IDR'),
  pricePerVehicle: z.boolean().default(true),
  paymentMethods: z.array(z.enum(['credit_card', 'bank_transfer', 'qris', 'ovo', 'gopay'])),
  paymentDeadlineMinutes: z.number().int().min(5).max(120).default(30),
});
