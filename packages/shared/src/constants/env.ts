export const ENV = {
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '',
  XENDIT_API_KEY: process.env.XENDIT_API_KEY ?? '',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY ?? '',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
} as const;
