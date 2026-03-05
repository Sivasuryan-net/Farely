import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useApp } from '../AppContext';
import { TrendingUp, TrendingDown, Navigation, Receipt, Fuel } from 'lucide-react';
import { cn } from '../types';
import { format } from 'date-fns';

export const Reports: React.FC = () => {
  const { getStatsForDate, entries } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const stats = getStatsForDate(selectedDate);
  const dayEntries = entries.filter(e => {
    const entryDate = new Date(e.timestamp);
    return entryDate.getDate() === selectedDate.getDate() &&
           entryDate.getMonth() === selectedDate.getMonth() &&
           entryDate.getFullYear() === selectedDate.getFullYear();
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
        <Calendar 
          onChange={(val) => setSelectedDate(val as Date)} 
          value={selectedDate}
          className="w-full border-none font-sans"
        />
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-100">
        <h3 className="font-bold mb-4 flex items-center justify-between">
          <span>Stats for {format(selectedDate, 'MMM dd, yyyy')}</span>
          <div className={cn(
            "px-2 py-1 rounded-lg text-xs font-bold",
            stats.profit >= 0 ? "bg-profit/10 text-profit" : "bg-expense/10 text-expense"
          )}>
            {stats.profit >= 0 ? 'PROFIT' : 'LOSS'}
          </div>
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-zinc-50 p-4 rounded-2xl">
            <div className="text-profit flex items-center gap-1 text-[10px] font-bold uppercase mb-1">
              <TrendingUp className="w-3 h-3" /> Earnings
            </div>
            <div className="text-xl font-bold">₹{stats.earnings}</div>
          </div>
          <div className="bg-zinc-50 p-4 rounded-2xl">
            <div className="text-expense flex items-center gap-1 text-[10px] font-bold uppercase mb-1">
              <TrendingDown className="w-3 h-3" /> Expenses
            </div>
            <div className="text-xl font-bold">₹{stats.expenses}</div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Day's Activity</h4>
          {dayEntries.length === 0 ? (
            <p className="text-center py-4 text-zinc-400 text-sm italic">No records for this date</p>
          ) : (
            dayEntries.map(entry => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    entry.type === 'ride' ? "bg-profit/10 text-profit" : 
                    entry.type === 'expense' ? "bg-expense/10 text-expense" : 
                    "bg-blue-100 text-blue-600"
                  )}>
                    {entry.type === 'ride' ? <Navigation className="w-4 h-4" /> : 
                     entry.type === 'expense' ? <Receipt className="w-4 h-4" /> : 
                     <Fuel className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold">
                      {entry.type === 'ride' ? entry.platform : entry.type === 'expense' ? entry.category : 'Fuel'}
                    </div>
                    <div className="text-[10px] text-zinc-400">{format(entry.timestamp, 'hh:mm a')}</div>
                  </div>
                </div>
                <div className={cn("text-sm font-bold", entry.type === 'ride' ? "text-profit" : "text-expense")}>
                  {entry.type === 'ride' ? '+' : '-'}₹{entry.amount}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
