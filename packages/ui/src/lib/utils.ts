import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'IDR', locale = 'id-ID') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string, locale = 'id-ID') {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Makassar',
  }).format(d);
}

export function formatRelativeTime(date: Date | string, locale = 'id-ID') {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const diffMins = Math.round(diffMs / 60000);
  const diffHours = Math.round(diffMs / 3600000);
  const diffDays = Math.round(diffMs / 86400000);

  if (Math.abs(diffMins) < 1) return 'Baru saja';
  if (Math.abs(diffMins) < 60) {
    return diffMins > 0 ? `Dalam ${diffMins} menit` : `${Math.abs(diffMins)} menit yang lalu`;
  }
  if (Math.abs(diffHours) < 24) {
    return diffHours > 0 ? `Dalam ${diffHours} jam` : `${Math.abs(diffHours)} jam yang lalu`;
  }
  if (Math.abs(diffDays) < 30) {
    return diffDays > 0 ? `Dalam ${diffDays} hari` : `${Math.abs(diffDays)} hari yang lalu`;
  }
  return formatDate(d, locale);
}