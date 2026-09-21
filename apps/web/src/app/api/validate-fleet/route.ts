import { validateFleetAgainstFCS } from '@bali-car-charter/api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { pax: number; luggage: { large_suitcases: number; cabin_bags: number }; fleet_category: string; zone: string; duration_hours: number };
    const result = await validateFleetAgainstFCS(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
