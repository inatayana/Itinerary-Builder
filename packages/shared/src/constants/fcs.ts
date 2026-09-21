export const FCS_CATEGORIES = [
  { name: 'Compact MPV Charter', models: ['Avanza', 'Xenia', 'Veloz'], baseRate: 900000, weekendRate: 1100000, capacityPassengers: 6, capacityLuggageLarge: 4, capacityLuggageCabin: 5 },
  { name: 'Family MPV Charter', models: ['Rush', 'Xpander', 'Stargazer'], baseRate: 1100000, weekendRate: 1400000, capacityPassengers: 6, capacityLuggageLarge: 4, capacityLuggageCabin: 5 },
  { name: 'Premium MPV Charter', models: ['Innova Reborn', 'Innova Zenix'], baseRate: 1400000, weekendRate: 1800000, capacityPassengers: 6, capacityLuggageLarge: 4, capacityLuggageCabin: 5 },
  { name: 'Executive Van Charter', models: ['Hiace Premio'], baseRate: 1800000, weekendRate: 2300000, capacityPassengers: 12, capacityLuggageLarge: 8, capacityLuggageCabin: 10 },
  { name: 'Large Group Van Charter', models: ['Hiace Commuter'], baseRate: 2300000, weekendRate: 3000000, capacityPassengers: 14, capacityLuggageLarge: 10, capacityLuggageCabin: 12 },
  { name: 'Luxury MPV Charter', models: ['Alphard', 'Vellfire'], baseRate: 2500000, weekendRate: 3500000, capacityPassengers: 5, capacityLuggageLarge: 4, capacityLuggageCabin: 5 },
  { name: 'Luxury Executive Van Charter', models: ['Luxury Hiace', 'Mercedes Sprinter VIP'], baseRate: 3500000, weekendRate: 5000000, capacityPassengers: 10, capacityLuggageLarge: 9, capacityLuggageCabin: 8 },
] as const;

export const FCS_RATE_BY_CATEGORY: Record<string, { baseRate: number; weekendRate: number }> = {};
export const FCS_CAPACITY_BY_CATEGORY: Record<string, { passengers: number; luggageLarge: number; luggageCabin: number }> = {};

FCS_CATEGORIES.forEach(cat => {
  FCS_RATE_BY_CATEGORY[cat.name] = { baseRate: cat.baseRate, weekendRate: cat.weekendRate };
  FCS_CAPACITY_BY_CATEGORY[cat.name] = { passengers: cat.capacityPassengers, luggageLarge: cat.capacityLuggageLarge, luggageCabin: cat.capacityLuggageCabin };
});

export const PAYMENT_METHODS = ['credit_card', 'bank_transfer', 'qris', 'ovo', 'gopay'] as const;
export const DURATION_OPTIONS = [
  { value: 'half_day', label: 'Half Day (4-6 Jam)' },
  { value: 'full_day', label: 'Full Day (8-12 Jam)' },
  { value: 'multi_day', label: 'Multi Day' },
] as const;
export const ZONES = ['South Bali', 'Central Bali', 'East Bali', 'North Bali', 'West Bali'] as const;
