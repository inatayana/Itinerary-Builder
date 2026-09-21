import { z } from 'zod';

export const fcsCategorySchema = z.enum([
  'Compact MPV Charter',
  'Family MPV Charter',
  'Premium MPV Charter',
  'Executive Van Charter',
  'Large Group Van Charter',
  'Luxury MPV Charter',
  'Luxury Executive Van Charter',
]);

export const luggageSchema = z.object({
  large_suitcases: z.number().int().min(0).default(0),
  cabin_bags: z.number().int().min(0).default(0),
});

export const passengersSchema = z.object({
  adults: z.number().int().min(1),
  children: z.number().int().min(0).default(0),
});

export const calculateItineraryInputSchema = z.object({
  request_id: z.string(),
  origin: z.object({
    location_name: z.string(),
    coordinates: z.object({ lat: z.number(), lng: z.number() }),
  }),
  destination_ids: z.array(z.string()),
  passengers: passengersSchema,
  luggage: luggageSchema,
  travel_date: z.string().date(),
  duration_preference: z.enum(['half_day', 'full_day', 'multi_day']),
  timezone: z.string().default('Asia/Makassar'),
  traffic_multiplier: z.number().min(1).max(3).optional(),
  fcs_validation: z.boolean().default(true),
});

export const validateFleetInputSchema = z.object({
  pax: z.number().int().min(1),
  luggage: luggageSchema,
  fleet_category: fcsCategorySchema,
  zone: z.string(),
  duration_hours: z.number().min(1),
});

export const availableDriversInputSchema = z.object({
  fleet_category: fcsCategorySchema,
  location: z.object({ lat: z.number(), lng: z.number() }),
  radius_km: z.number().min(1).max(100).default(10),
  rating_min: z.number().min(0).max(5).default(4.0),
  language: z.string().default('English'),
});

export const checkDestinationRelevanceInputSchema = z.object({
  destination_id: z.string(),
  traveler_preferences: z.object({
    interests: z.array(z.string()),
    difficulty_level: z.enum(['easy', 'moderate', 'hard']),
  }),
  current_location: z.object({ lat: z.number(), lng: z.number() }),
});

export const validateEnglishDriverInputSchema = z.object({
  driver_id: z.string(),
  destination_ids: z.array(z.string()),
  traveler_count: z.number().int().min(1),
});

export const calculateRouteInputSchema = z.object({
  start_coords: z.object({ lat: z.number(), lng: z.number() }),
  end_coords: z.object({ lat: z.number(), lng: z.number() }),
  waypoints: z.array(z.object({ lat: z.number(), lng: z.number() })).optional(),
  travel_date: z.string().date(),
  timezone: z.string().default('Asia/Makassar'),
});

export const validateDriverScheduleInputSchema = z.object({
  driver_id: z.string(),
  date: z.string().date(),
  estimated_duration_hours: z.number().min(1),
});
