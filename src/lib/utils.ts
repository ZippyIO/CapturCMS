import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  const vc = process.env.VERCEL_URL;
  if (vc) return `https://${vc}`;
  return 'http://localhost:3000';
}

export function stringToId(str: string): string {
  return str.trim().toLowerCase().replace(/\s+/g, '-');
}

export const coerceBoolean = z
  .enum(['0', '1', 'true', 'false'])
  .catch('false')
  .transform((value) => value == 'true' || value == '1');
