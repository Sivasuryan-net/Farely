import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Entry, Ride, Expense, FuelLog, DailyStats } from './types';
import { format, isSameDay, subDays } from 'date-fns';

interface AppContextType {
  entries: Entry[];
  addRide: (ride: Omit<Ride, 'id' | 'type'>) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'type'>) => void;
  addFuel: (fuel: Omit<FuelLog, 'id' | 'type'>) => void;
  deleteEntry: (id: string) => void;
  getStatsForDate: (date: Date) => DailyStats;
  todayStats: DailyStats;
  weeklyStats: DailyStats[];
  platformStats: { name: string; value: number }[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<Entry[]>(() => {
    const saved = localStorage.getItem('farely_entries');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('farely_entries', JSON.stringify(entries));
  }, [entries]);

  const addRide = (ride: Omit<Ride, 'id' | 'type'>) => {
    const newRide: Ride = { ...ride, id: crypto.randomUUID(), type: 'ride' };
    setEntries(prev => [newRide, ...prev]);
  };

  const addExpense = (expense: Omit<Expense, 'id' | 'type'>) => {
    const newExpense: Expense = { ...expense, id: crypto.randomUUID(), type: 'expense' };
    setEntries(prev => [newExpense, ...prev]);
  };

  const addFuel = (fuel: Omit<FuelLog, 'id' | 'type'>) => {
    const newFuel: FuelLog = { ...fuel, id: crypto.randomUUID(), type: 'fuel' };
    setEntries(prev => [newFuel, ...prev]);
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const getStatsForDate = (date: Date) => {
    const dayEntries = entries.filter(e => isSameDay(new Date(e.timestamp), date));
    let earnings = 0, expenses = 0, rideCount = 0;
    dayEntries.forEach(e => {
      if (e.type === 'ride') { earnings += e.amount; rideCount++; }
      else { expenses += e.amount; }
    });
    return { date: format(date, 'EEE'), earnings, expenses, profit: earnings - expenses, rideCount };
  };

  const todayStats = useMemo(() => getStatsForDate(new Date()), [entries]);

  const weeklyStats = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => getStatsForDate(subDays(new Date(), 6 - i)));
  }, [entries]);

  const platformStats = useMemo(() => {
    const stats: Record<string, number> = {};
    entries.filter(e => e.type === 'ride').forEach(e => {
      const ride = e as Ride;
      stats[ride.platform] = (stats[ride.platform] || 0) + ride.amount;
    });
    return Object.entries(stats).map(([name, value]) => ({ name, value }));
  }, [entries]);

  return (
    <AppContext.Provider value={{
      entries, addRide, addExpense, addFuel, deleteEntry,
      getStatsForDate, todayStats, weeklyStats, platformStats
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
