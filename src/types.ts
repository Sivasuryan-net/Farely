import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Platform = 'Rapido' | 'Uber' | 'Ola' | 'Porter' | 'Other';
export type PaymentType = 'Cash' | 'UPI' | 'App Wallet';
export type ExpenseCategory = 'Petrol' | 'EV Charging' | 'Food / Beverages' | 'Bike Maintenance' | 'Parking' | 'Toll' | 'Other';
export type VehicleType = 'Petrol' | 'EV';

export interface Ride {
  id: string;
  type: 'ride';
  platform: Platform;
  amount: number;
  paymentType: PaymentType;
  timestamp: number;
  notes?: string;
}

export interface Expense {
  id: string;
  type: 'expense';
  category: ExpenseCategory;
  amount: number;
  timestamp: number;
  notes?: string;
}

export interface FuelLog {
  id: string;
  type: 'fuel';
  vehicleType: VehicleType;
  amount: number; // Total cost
  timestamp: number;
  // Petrol specific
  liters?: number;
  costPerLiter?: number;
  // EV specific
  units?: number;
  location?: string;
}

export type Entry = Ride | Expense | FuelLog;

export interface DailyStats {
  date: string;
  earnings: number;
  expenses: number;
  profit: number;
  rideCount: number;
}
