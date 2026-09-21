export async function assignDriver(input: Record<string, unknown>) {
  return { success: true, assignmentId: 'mock-' + Date.now() };
}

export async function getDriverAvailability(driverId: string) {
  return { success: true, driverId, available: true };
}
