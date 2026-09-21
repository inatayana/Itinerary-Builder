export const FCS_CATEGORIES = [
  { name: 'Compact MPV Charter', models: ['Avanza', 'Xenia', 'Veloz'], baseRate: 900000, weekendRate: 1100000 },
  { name: 'Family MPV Charter', models: ['Rush', 'Xpander', 'Stargazer'], baseRate: 1100000, weekendRate: 1400000 },
  { name: 'Premium MPV Charter', models: ['Innova Reborn', 'Innova Zenix'], baseRate: 1400000, weekendRate: 1800000 },
  { name: 'Executive Van Charter', models: ['Hiace Premio'], baseRate: 1800000, weekendRate: 2300000 },
  { name: 'Large Group Van Charter', models: ['Hiace Commuter'], baseRate: 2300000, weekendRate: 3000000 },
  { name: 'Luxury MPV Charter', models: ['Alphard', 'Vellfire'], baseRate: 2500000, weekendRate: 3500000 },
  { name: 'Luxury Executive Van Charter', models: ['Luxury Hiace', 'Mercedes Sprinter VIP'], baseRate: 3500000, weekendRate: 5000000 },
] as const;

export const PAYMENT_METHODS = ['credit_card', 'bank_transfer', 'qris', 'ovo', 'gopay'] as const;

export const DURATION_OPTIONS = [
  { value: 'half_day', label: 'Half Day (4-6 Jam)' },
  { value: 'full_day', label: 'Full Day (8-12 Jam)' },
  { value: 'multi_day', label: 'Multi Day' },
] as const;
