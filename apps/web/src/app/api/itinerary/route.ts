import { calculate_itinerary_and_fleet as calculateItineraryAndFleet, validateFleetAgainstFCS } from '@bali-car-charter/api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { request_id: string; origin: { location_name: string; coordinates: { lat: number; lng: number } }; destination_ids: string[]; passengers: { adults: number; children: number }; luggage: { large_suitcases: number; cabin_bags: number }; travel_date: string; duration_preference: string; timezone?: string; traffic_multiplier?: number; fcs_validation?: boolean };
    const result = await calculateItineraryAndFleet(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
