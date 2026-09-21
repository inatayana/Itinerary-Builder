import { prisma } from '@bali-car-charter/database';

export async function validateDriverSchedule(input: {
  driver_id: string;
  date: string;
  estimated_duration_hours: number;
}): Promise<{
  isValid: boolean;
  conflicts?: Array<{
    bookingId: string;
    startTime: string;
    endTime: string;
    reason: string;
  }>;
  availableSlots?: Array<{
    start: string;
    end: string;
  }>;
}> {
  const bookings = await prisma.booking.findMany({
    where: {
      driverId: input.driver_id,
      startDate: {
        gte: new Date(input.date + 'T00:00:00'),
        lt: new Date(input.date + 'T23:59:59'),
      },
      status: { notIn: ['CANCELLED', 'COMPLETED'] },
    },
  });

  if (bookings.length > 0) {
    return {
      isValid: false,
      conflicts: bookings.map(b => ({
        bookingId: b.id,
        startTime: b.startDate.toISOString(),
        endTime: b.endDate.toISOString(),
        reason: 'Driver already has a booking during this time',
      })),
    };
  }

  return {
    isValid: true,
    availableSlots: [
      { start: `${input.date}T06:00:00`, end: `${input.date}T12:00:00` },
      { start: `${input.date}T13:00:00`, end: `${input.date}T18:00:00` },
    ],
  };
}
