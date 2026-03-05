import React from 'react';
import { useApp } from '../AppContext';
import { User, ShieldCheck, IndianRupee } from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { entries } = useApp();

  const totalEarnings = entries.filter(e => e.type === 'ride').reduce((acc, e) => acc + e.amount, 0);
  const totalRides = entries.filter(e => e.type === 'ride').length;

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 text-center">
        <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
          <User className="w-12 h-12 text-zinc-400" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900">Captain</h2>
        <p className="text-zinc-500 mt-1">Local Mode Active</p>
        
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="px-3 py-1 bg-profit/10 text-profit rounded-full text-xs font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Verified Captain
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
          <div className="text-zinc-400 text-[10px] font-bold uppercase mb-1">Lifetime Earnings</div>
          <div className="text-xl font-bold">₹{totalEarnings.toLocaleString()}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
          <div className="text-zinc-400 text-[10px] font-bold uppercase mb-1">Total Rides</div>
          <div className="text-xl font-bold">{totalRides}</div>
        </div>
      </div>
    </div>
  );
};
