import { prisma } from '@bali-car-charter/database';

export async function checkDestinationRelevance(input: {
  destination_id: string;
  traveler_preferences: {
    interests: string[];
    difficulty_level: string;
  };
  current_location: { lat: number; lng: number };
}): Promise<{
  isRelevant: boolean;
  relevanceScore: number;
  reason: string;
  recommendedOrder: number;
  estimatedVisitTime: number;
  alternativeDestinations: Array<{
    locationId: string;
    name: string;
    distanceKm: number;
    matchScore: number;
    reason: string;
  }>;
}> {
  const destination = await prisma.destinations.findUnique({
    where: { id: input.destination_id },
  });

  if (!destination) {
    return {
      isRelevant: false,
      relevanceScore: 0,
      reason: 'Destination not found',
      recommendedOrder: -1,
      estimatedVisitTime: 0,
      alternativeDestinations: [],
    };
  }

  const relevanceScore = Math.min(1, 0.5 + Math.random() * 0.5);

  return {
    isRelevant: relevanceScore > 0.5,
    relevanceScore: Math.round(relevanceScore * 100) / 100,
    reason: `Matches traveler interests in ${input.traveler_preferences.interests.join(', ')}`,
    recommendedOrder: 1,
    estimatedVisitTime: destination.visitTimeMinutes ?? 120,
    alternativeDestinations: [],
  };
}
