export async function calculateRouteWithTraffic(input: {
  start_coords: { lat: number; lng: number };
  end_coords: { lat: number; lng: number };
  waypoints?: Array<{ lat: number; lng: number }>;
  travel_date: string;
  timezone?: string;
}): Promise<{
  totalDistanceKm: number;
  estimatedTimeMinutes: number;
  routeSummary?: string;
  trafficMultiplier: number;
  realTimeStatus: string;
  alternativeRoutes?: Array<{
    routeId: string;
    distanceKm: number;
    estimatedTimeMinutes: number;
    reason: string;
  }>;
  roadConditions: {
    trafficJam: boolean;
    construction: boolean;
    weather: string;
  };
}> {
  const distanceKm = Math.round(Math.random() * 50 + 10);
  const estimatedTime = Math.round(distanceKm / 40 * 60);
  const trafficMultiplier = 1.0 + Math.random() * 0.5;

  return {
    totalDistanceKm: distanceKm,
    estimatedTimeMinutes: estimatedTime,
    routeSummary: 'Via Jl. Ngurah Rai, Jl. Tol Bali Mandara',
    trafficMultiplier: Math.round(trafficMultiplier * 10) / 10,
    realTimeStatus: trafficMultiplier > 1.3 ? 'moderate' : 'normal',
    alternativeRoutes: [
      {
        routeId: 'alt-001',
        distanceKm: distanceKm + Math.round(Math.random() * 5),
        estimatedTimeMinutes: estimatedTime + Math.round(Math.random() * 15),
        reason: 'Less traffic, longer distance',
      },
    ],
    roadConditions: {
      trafficJam: trafficMultiplier > 1.3,
      construction: false,
      weather: 'clear',
    },
  };
}
