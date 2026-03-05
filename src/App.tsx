import React, { useState } from 'react';
import { AppProvider } from './AppContext';
import { Dashboard } from './components/Dashboard';
import { RecentActivity } from './components/RecentActivity';
import { Reports } from './components/Reports';
import { ProfileScreen } from './components/ProfileScreen';
import { AddRideModal, AddExpenseModal, AddFuelModal } from './components/Modals';
import { Plus, Navigation, Receipt, Fuel, LayoutDashboard, History, PieChart as ChartIcon, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './types';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history' | 'reports' | 'profile'>('dashboard');
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState<'ride' | 'expense' | 'fuel' | null>(null);

  return (
    <div className="min-h-screen pb-32 bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-100 sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black tracking-tight text-zinc-900">Farely</h1>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Captain Edition</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={cn(
              "p-2 rounded-full border transition-all",
              activeTab === 'profile' ? "bg-profit/10 border-profit text-profit" : "bg-zinc-50 border-zinc-100 text-zinc-400"
            )}
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <Dashboard />
              <RecentActivity />
            </motion.div>
          )}
          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <RecentActivity />
            </motion.div>
          )}
          {activeTab === 'reports' && (
            <motion.div
              key="reports"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Reports />
            </motion.div>
          )}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <ProfileScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FAB Menu */}
      <div className="fixed bottom-24 right-6 z-50">
        <AnimatePresence>
          {isFabOpen && (
            <div className="flex flex-col gap-3 mb-4 items-end">
              <motion.button
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                onClick={() => { setModalOpen('ride'); setIsFabOpen(false); }}
                className="flex items-center gap-3 bg-profit text-white px-4 py-3 rounded-2xl shadow-lg shadow-profit/20 font-bold"
              >
                Add Ride <Navigation className="w-5 h-5" />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{ delay: 0.05 }}
                onClick={() => { setModalOpen('expense'); setIsFabOpen(false); }}
                className="flex items-center gap-3 bg-expense text-white px-4 py-3 rounded-2xl shadow-lg shadow-expense/20 font-bold"
              >
                Add Expense <Receipt className="w-5 h-5" />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{ delay: 0.1 }}
                onClick={() => { setModalOpen('fuel'); setIsFabOpen(false); }}
                className="flex items-center gap-3 bg-blue-500 text-white px-4 py-3 rounded-2xl shadow-lg shadow-blue-500/20 font-bold"
              >
                Add Fuel <Fuel className="w-5 h-5" />
              </motion.button>
            </div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsFabOpen(!isFabOpen)}
          className={cn(
            "w-16 h-16 rounded-3xl shadow-2xl flex items-center justify-center transition-all duration-300",
            isFabOpen ? "bg-zinc-900 text-white rotate-45" : "bg-profit text-white"
          )}
        >
          <Plus className="w-8 h-8" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-zinc-100 px-6 py-4 pb-8 z-40">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              activeTab === 'dashboard' ? "text-profit" : "text-zinc-400"
            )}
          >
            <LayoutDashboard className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              activeTab === 'history' ? "text-profit" : "text-zinc-400"
            )}
          >
            <History className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase">History</span>
          </button>
          <div className="w-12" /> {/* Spacer for FAB */}
          <button
            onClick={() => setActiveTab('reports')}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              activeTab === 'reports' ? "text-profit" : "text-zinc-400"
            )}
          >
            <ChartIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase">Reports</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              activeTab === 'profile' ? "text-profit" : "text-zinc-400"
            )}
          >
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase">Profile</span>
          </button>
        </div>
      </nav>

      {/* Modals */}
      <AddRideModal isOpen={modalOpen === 'ride'} onClose={() => setModalOpen(null)} />
      <AddExpenseModal isOpen={modalOpen === 'expense'} onClose={() => setModalOpen(null)} />
      <AddFuelModal isOpen={modalOpen === 'fuel'} onClose={() => setModalOpen(null)} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
