import { z } from 'zod';

export const routeInfoSchema = z.object({
  totalDistanceKm: z.number().min(0),
  estimatedTimeMinutes: z.number().min(0),
  routeSummary: z.string().optional(),
  trafficMultiplier: z.number().min(1).max(3).default(1),
  realTimeStatus: z.enum(['normal', 'moderate', 'heavy', 'severe']).default('normal'),
  alternativeRoutes: z.array(z.object({
    routeId: z.string(),
    distanceKm: z.number(),
    estimatedTimeMinutes: z.number(),
    reason: z.string(),
  })).optional(),
  roadConditions: z.object({
    trafficJam: z.boolean().default(false),
    construction: z.boolean().default(false),
    weather: z.string().default('clear'),
  }).optional(),
});

export type RouteInfo = z.infer<typeof routeInfoSchema>;
