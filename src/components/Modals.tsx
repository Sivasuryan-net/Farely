import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Wallet, Fuel, Receipt, Navigation, CreditCard, MapPin, Droplets, Zap } from 'lucide-react';
import { useApp } from '../AppContext';
import { Platform, PaymentType, ExpenseCategory, VehicleType } from '../types';
import { cn } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddRideModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { addRide } = useApp();
  const [platform, setPlatform] = useState<Platform>('Uber');
  const [amount, setAmount] = useState('');
  const [paymentType, setPaymentType] = useState<PaymentType>('UPI');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    addRide({
      platform,
      amount: parseFloat(amount),
      paymentType,
      timestamp: Date.now(),
      notes,
    });
    setAmount('');
    setNotes('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Navigation className="w-6 h-6 text-profit" />
                Add New Ride
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-2">Platform</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Uber', 'Ola', 'Rapido', 'Porter', 'Other'] as Platform[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPlatform(p)}
                      className={cn(
                        "py-2 px-3 rounded-xl text-sm font-medium border transition-all",
                        platform === p ? "bg-profit text-white border-profit" : "bg-white border-zinc-200 text-zinc-600"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-2">Amount (₹)</label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-profit focus:border-transparent outline-none text-lg font-semibold"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-2">Payment Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['UPI', 'Cash', 'App Wallet'] as PaymentType[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setPaymentType(t)}
                      className={cn(
                        "py-2 px-3 rounded-xl text-sm font-medium border transition-all",
                        paymentType === t ? "bg-zinc-900 text-white border-zinc-900" : "bg-white border-zinc-200 text-zinc-600"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-2">Notes (Optional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Short note..."
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-profit focus:border-transparent outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-profit text-white rounded-2xl font-bold text-lg shadow-lg shadow-profit/20 active:scale-95 transition-transform"
              >
                Save Ride
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const AddExpenseModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { addExpense } = useApp();
  const [category, setCategory] = useState<ExpenseCategory>('Food / Beverages');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    addExpense({
      category,
      amount: parseFloat(amount),
      timestamp: Date.now(),
      notes,
    });
    setAmount('');
    setNotes('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Receipt className="w-6 h-6 text-expense" />
                Add Expense
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-2">Category</label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto no-scrollbar p-1">
                  {(['Petrol', 'EV Charging', 'Food / Beverages', 'Bike Maintenance', 'Parking', 'Toll', 'Other'] as ExpenseCategory[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategory(c)}
                      className={cn(
                        "py-2 px-3 rounded-xl text-sm font-medium border transition-all",
                        category === c ? "bg-expense text-white border-expense" : "bg-white border-zinc-200 text-zinc-600"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-2">Amount (₹)</label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-expense focus:border-transparent outline-none text-lg font-semibold"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-2">Notes (Optional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Short note..."
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-expense focus:border-transparent outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-expense text-white rounded-2xl font-bold text-lg shadow-lg shadow-expense/20 active:scale-95 transition-transform"
              >
                Save Expense
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const AddFuelModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { addFuel } = useApp();
  const [vehicleType, setVehicleType] = useState<VehicleType>('Petrol');
  const [amount, setAmount] = useState('');
  const [liters, setLiters] = useState('');
  const [units, setUnits] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    addFuel({
      vehicleType,
      amount: parseFloat(amount),
      timestamp: Date.now(),
      liters: liters ? parseFloat(liters) : undefined,
      units: units ? parseFloat(units) : undefined,
      location: location || undefined,
    });
    setAmount('');
    setLiters('');
    setUnits('');
    setLocation('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Fuel className="w-6 h-6 text-blue-500" />
                Add Fuel / Charging
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-2">Vehicle Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setVehicleType('Petrol')}
                    className={cn(
                      "py-3 px-4 rounded-xl text-sm font-bold border flex items-center justify-center gap-2 transition-all",
                      vehicleType === 'Petrol' ? "bg-zinc-900 text-white border-zinc-900" : "bg-white border-zinc-200 text-zinc-600"
                    )}
                  >
                    <Droplets className="w-4 h-4" />
                    Petrol
                  </button>
                  <button
                    type="button"
                    onClick={() => setVehicleType('EV')}
                    className={cn(
                      "py-3 px-4 rounded-xl text-sm font-bold border flex items-center justify-center gap-2 transition-all",
                      vehicleType === 'EV' ? "bg-zinc-900 text-white border-zinc-900" : "bg-white border-zinc-200 text-zinc-600"
                    )}
                  >
                    <Zap className="w-4 h-4" />
                    EV
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-2">Total Cost (₹)</label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg font-semibold"
                  autoFocus
                />
              </div>

              {vehicleType === 'Petrol' ? (
                <div>
                  <label className="block text-sm font-medium text-zinc-500 mb-2">Liters (Optional)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={liters}
                    onChange={(e) => setLiters(e.target.value)}
                    placeholder="0.00 L"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-zinc-500 mb-2">Units (Optional)</label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={units}
                      onChange={(e) => setUnits(e.target.value)}
                      placeholder="0.00 kWh"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-500 mb-2">Location (Optional)</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Charging station name..."
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-blue-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
              >
                Save Log
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
