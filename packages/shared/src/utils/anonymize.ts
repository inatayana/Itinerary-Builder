export function anonymizeForAI<T extends Record<string, unknown>>(data: T): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  const piiFields = new Set(['email', 'phone', 'phoneNumber', 'phone_number', 'password', 'password_hash', 'nationality', 'date_of_birth', 'dateOfBirth', 'name', 'first_name', 'last_name', 'firstName', 'lastName', 'license_number', 'licenseNumber']);

  for (const [key, value] of Object.entries(data)) {
    if (piiFields.has(key)) {
      sanitized[key] = '***REDACTED***';
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      sanitized[key] = anonymizeForAI(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

export function generateRequestId(): string {
  return `req-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
