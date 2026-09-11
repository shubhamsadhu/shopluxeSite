import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    createOrder,
    currentUser
  } = useStore();

  const [fullName, setFullName] = useState(currentUser?.displayName || 'Jordan Smith');
  const [email, setEmail] = useState(currentUser?.email || 'jordan.smith@example.com');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('Springfield');
  const [postalCode, setPostalCode] = useState('97477');
  const [country, setCountry] = useState('United States');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrderNumber, setCompletedOrderNumber] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const shipping = cartTotal >= 50 ? 0 : 9.99;
  const finalTotal = cartTotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        fullName,
        address,
        city,
        postalCode,
        country
      });
      setIsProcessing(false);
      setCompletedOrderNumber(order.id);
    }, 1200);
  };

  return (
    <div id="checkout-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-zinc-200">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-zinc-700" />
            <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-zinc-950">
              {completedOrderNumber ? 'Order Confirmed' : 'ShopLuxe Direct Checkout'}
            </h2>
          </div>
          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setCompletedOrderNumber(null);
            }}
            className="p-1 rounded-full text-zinc-400 hover:text-zinc-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedOrderNumber ? (
          /* Success Screen */
          <div className="p-8 sm:p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-zinc-950">
              Thank You For Your Order!
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto">
              Your order <strong className="text-zinc-900 font-bold">#{completedOrderNumber}</strong> has been logged in your account history and queued for warehouse dispatch.
            </p>

            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 text-left text-xs max-w-sm mx-auto space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-500">Shipping to:</span>
                <span className="font-semibold text-zinc-900">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Destination:</span>
                <span className="font-semibold text-zinc-900">{city}, {country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Total Paid:</span>
                <span className="font-bold text-zinc-950">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setCompletedOrderNumber(null);
              }}
              className="mt-6 px-8 py-3 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Contact & Shipping */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900">
                  1. Shipping Information
                </h4>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:bg-white focus:outline-hidden focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:bg-white focus:outline-hidden focus:border-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:bg-white focus:outline-hidden focus:border-zinc-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:bg-white focus:outline-hidden focus:border-zinc-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-700 uppercase mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:bg-white focus:outline-hidden focus:border-zinc-900"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Payment Method & Order Summary */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900">
                  2. Payment Method
                </h4>

                <div className="space-y-2">
                  {[
                    { id: 'card', name: 'Credit / Debit Card (Visa, MC)', icon: CreditCard },
                    { id: 'paypal', name: 'PayPal Instant Checkout', icon: CreditCard },
                    { id: 'apple', name: 'Apple Pay / Google Pay', icon: Lock }
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-zinc-950 bg-zinc-50 text-zinc-950 shadow-2xs'
                          : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id as any)}
                          className="accent-zinc-950"
                        />
                        <span>{method.name}</span>
                      </div>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2">
                    <input
                      type="text"
                      placeholder="Card Number •••• •••• •••• 4242"
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="12/28"
                        className="w-full px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        defaultValue="123"
                        className="w-full px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Summary Box */}
                <div className="p-4 bg-[#f8f8f6] rounded-2xl border border-zinc-200 space-y-1.5 text-xs text-zinc-600 mt-4">
                  <div className="flex justify-between">
                    <span>Items ({cart.reduce((a, b) => a + b.quantity, 0)}):</span>
                    <span className="font-bold text-zinc-900">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="font-bold text-zinc-900">{shipping === 0 ? 'FREE' : '$9.99'}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-zinc-950 pt-2 border-t border-zinc-200">
                    <span>Total Amount:</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-60"
                >
                  {isProcessing ? 'Processing Secure Order...' : `Pay $${finalTotal.toFixed(2)} & Place Order`}
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
