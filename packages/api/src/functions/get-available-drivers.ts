import { prisma } from '@bali-car-charter/database';

export async function getAvailableDrivers(input: {
  fleet_category: string;
  location: { lat: number; lng: number };
  radius_km?: number;
  rating_min?: number;
  language?: string;
}): Promise<{
  availableDrivers: Array<{
    driverId: string;
    name: string;
    phone: string;
    rating: number;
    languages: string[];
    avatarUrl?: string;
    vehicleInfo: string;
    distanceKm: number;
    etaArrival?: string;
    availableUntil?: string;
  }>;
  totalAvailable: number;
}> {
  const drivers = await prisma.driver.findMany({
    where: {
      isAvailable: true,
      isVerified: true,
    },
    include: {
      vehicle: true,
      user: true,
    },
    take: 10,
  });

  const formatted = drivers.map(driver => ({
    driverId: driver.id,
    name: driver.user?.name ?? 'Unknown',
    phone: driver.user?.phone ?? '',
    rating: driver.rating,
    languages: [],
    avatarUrl: driver.user?.avatarUrl ?? undefined,
    vehicleInfo: `${driver.vehicle?.brand ?? ''} ${driver.vehicle?.model ?? ''} ${driver.vehicle?.year ?? ''}`.trim(),
    distanceKm: Math.round(Math.random() * 100) / 10,
  }));

  return {
    availableDrivers: formatted,
    totalAvailable: formatted.length,
  };
}
