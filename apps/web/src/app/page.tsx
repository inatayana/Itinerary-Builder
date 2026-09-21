'use client';

import { useState } from 'react';
import { Button } from '@bali-car-charter/ui';

export default function HomePage() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-surface p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary-900 mb-4">
          Selamat Datang di Bali Car Charter
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Platform transportasi dengan pengemudi fasih berbahasa Inggris
        </p>
        <Button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1000); }}>
          {loading ? 'Loading...' : 'Mulai Petualangan'}
        </Button>
      </div>
    </main>
  );
}
