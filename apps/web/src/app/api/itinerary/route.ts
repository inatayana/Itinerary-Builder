import { calculateItineraryAndFleet, validateFleetAgainstFCS } from '@bali-car-charter/api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await calculateItineraryAndFleet(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
