import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Star, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { db, collection, addDoc, serverTimestamp } from '../lib/firebase';

export const SocialProofNewsletter: React.FC = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const customerAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast({
        type: 'warning',
        title: 'Please enter a valid email address'
      });
      return;
    }

    setLoading(true);
    try {
      // Record subscriber to Firestore
      try {
        await addDoc(collection(db, 'subscribers'), {
          email,
          createdAt: serverTimestamp()
        });
      } catch (err) {
        // Safe fallback in case offline or local
      }

      setIsSubscribed(true);
      showToast({
        type: 'success',
        title: 'Subscribed to ShopLuxe!',
        message: '10% discount code WELCOME10 has been sent to your email.'
      });
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="social-proof-newsletter-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-200/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/80 shadow-xs">
        
        {/* Left: Trusted By Thousands */}
        <div className="lg:col-span-6 flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0 text-amber-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-zinc-950">
                TRUSTED BY THOUSANDS
              </h3>
              <p className="text-xs text-zinc-500">
                Quality products, happy customers.
              </p>
            </div>
          </div>

          <div className="hidden sm:block h-10 w-px bg-zinc-200" />

          {/* Avatars + Star rating summary */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5 overflow-hidden">
              {customerAvatars.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Customer"
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-2xs"
                />
              ))}
            </div>

            <div className="text-xs">
              <div className="flex items-center gap-1.5 font-black text-zinc-900">
                <span>4.8/5</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <span className="text-[11px] text-zinc-500">
                Based on 2,500+ Reviews
              </span>
            </div>
          </div>
        </div>

        {/* Right: Subscribe to Newsletter */}
        <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-zinc-200/80 pt-6 lg:pt-0 lg:pl-8">
          <div className="mb-3">
            <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-zinc-950">
              SUBSCRIBE TO OUR NEWSLETTER
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Get the latest updates on new products and sales.
            </p>
          </div>

          {isSubscribed ? (
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 py-3 px-4 rounded-xl text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>You're subscribed! Use promo code <strong>WELCOME10</strong> for 10% off.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                id="newsletter-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-[#f8f8f6] border border-zinc-300/80 rounded-xl text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-900 focus:bg-white transition-all"
                required
              />
              <button
                id="newsletter-subscribe-btn"
                type="submit"
                disabled={loading}
                className="bg-zinc-950 hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-2xs shrink-0 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
