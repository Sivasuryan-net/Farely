import React from 'react';
import { useApp } from '../AppContext';
import { TrendingUp, TrendingDown, IndianRupee, Navigation, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { cn } from '../types';

export const Dashboard: React.FC = () => {
  const { todayStats, weeklyStats } = useApp();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-zinc-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-zinc-500 text-sm font-medium">Daily Profit</span>
            <div className={cn(
              "px-2 py-1 rounded-lg text-xs font-bold",
              todayStats.profit >= 0 ? "bg-profit/10 text-profit" : "bg-expense/10 text-expense"
            )}>
              {todayStats.profit >= 0 ? 'PROFIT' : 'LOSS'}
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">₹{todayStats.profit.toLocaleString()}</span>
            <span className="text-zinc-400 text-sm">today</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-100">
          <div className="flex items-center gap-2 text-profit mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Earnings</span>
          </div>
          <div className="text-xl font-bold">₹{todayStats.earnings.toLocaleString()}</div>
          <div className="text-zinc-400 text-[10px] mt-1">{todayStats.rideCount} rides</div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-100">
          <div className="flex items-center gap-2 text-expense mb-2">
            <TrendingDown className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Expenses</span>
          </div>
          <div className="text-xl font-bold">₹{todayStats.expenses.toLocaleString()}</div>
          <div className="text-zinc-400 text-[10px] mt-1">incl. fuel & food</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold flex items-center gap-2">
            <PieChart className="w-5 h-5 text-zinc-400" />
            Weekly Performance
          </h3>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyStats}>
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#a1a1aa' }} 
              />
              <Tooltip 
                cursor={{ fill: '#f4f4f5' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-zinc-900 text-white p-2 rounded-lg text-xs shadow-xl">
                        <div className="font-bold mb-1">{payload[0].payload.date}</div>
                        <div className="text-profit">Earnings: ₹{payload[0].value}</div>
                        <div className="text-expense">Expenses: ₹{payload[1].value}</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="earnings" radius={[4, 4, 0, 0]}>
                {weeklyStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#10b981" fillOpacity={0.8} />
                ))}
              </Bar>
              <Bar dataKey="expenses" radius={[4, 4, 0, 0]}>
                {weeklyStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#ef4444" fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
