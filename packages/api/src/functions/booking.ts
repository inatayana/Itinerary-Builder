export async function createBooking(input: Record<string, unknown>) {
  return { success: true, bookingId: 'mock-' + Date.now() };
}

export async function getBooking(bookingId: string) {
  return { success: true, bookingId };
}

export async function cancelBooking(bookingId: string) {
  return { success: true, bookingId };
}
