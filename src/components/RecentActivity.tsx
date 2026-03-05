import React from 'react';
import { useApp } from '../AppContext';
import { format } from 'date-fns';
import { Navigation, Receipt, Fuel, Trash2, IndianRupee } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../types';

export const RecentActivity: React.FC = () => {
  const { entries, deleteEntry } = useApp();

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
        <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
          <IndianRupee className="w-8 h-8" />
        </div>
        <p className="text-sm font-medium">No activity yet</p>
        <p className="text-xs">Start by adding a ride or expense</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-zinc-500 text-sm uppercase tracking-wider px-1">Recent Activity</h3>
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {entries.slice(0, 10).map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  entry.type === 'ride' ? "bg-profit/10 text-profit" : 
                  entry.type === 'expense' ? "bg-expense/10 text-expense" : 
                  "bg-blue-100 text-blue-600"
                )}>
                  {entry.type === 'ride' ? <Navigation className="w-6 h-6" /> : 
                   entry.type === 'expense' ? <Receipt className="w-6 h-6" /> : 
                   <Fuel className="w-6 h-6" />}
                </div>
                <div>
                  <div className="font-bold text-zinc-900">
                    {entry.type === 'ride' ? entry.platform : 
                     entry.type === 'expense' ? entry.category : 
                     entry.vehicleType + ' Fuel'}
                  </div>
                  <div className="text-xs text-zinc-400 flex items-center gap-2">
                    {format(entry.timestamp, 'hh:mm a')}
                    {entry.notes && <span className="w-1 h-1 bg-zinc-200 rounded-full" />}
                    {entry.notes && <span className="truncate max-w-[100px]">{entry.notes}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "font-bold text-lg",
                  entry.type === 'ride' ? "text-profit" : "text-expense"
                )}>
                  {entry.type === 'ride' ? '+' : '-'}₹{entry.amount}
                </div>
                <button 
                  onClick={() => deleteEntry(entry.id)}
                  className="p-2 text-zinc-300 hover:text-expense transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
