import React from 'react';
import { useStore } from '../context/StoreContext';
import { Package, Percent, Gift, ArrowRight } from 'lucide-react';

export const PromoBanners: React.FC = () => {
  const { setActiveTab, setSelectedCategory, setIsAuthModalOpen, currentUser } = useStore();

  return (
    <section id="promo-banners-section" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Banner 1: Free Shipping (Dark Navy/Black) */}
        <div
          id="promo-banner-shipping"
          onClick={() => {
            setActiveTab('shop');
            setSelectedCategory('All');
          }}
          className="group relative bg-[#141923] text-white p-6 rounded-2xl flex items-center justify-between cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-xl overflow-hidden"
        >
          <div className="flex items-center gap-4 z-10">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-base font-extrabold uppercase tracking-wide leading-tight">
                FREE SHIPPING
              </h3>
              <p className="text-xs text-zinc-300 mt-0.5">
                On orders over $50
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:text-amber-300 transition-colors mt-2">
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
          {/* Subtle background graphic */}
          <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-white/5 rounded-full pointer-events-none" />
        </div>

        {/* Banner 2: Special Offer (Warm Caramel / Tan) */}
        <div
          id="promo-banner-offer"
          onClick={() => {
            setActiveTab('shop');
            setSelectedCategory('Affiliate');
          }}
          className="group relative bg-[#b98e6c] text-white p-6 rounded-2xl flex items-center justify-between cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-xl overflow-hidden"
        >
          <div className="flex items-center gap-4 z-10">
            <div className="w-12 h-12 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
              <div className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-xs font-black">
                %
              </div>
            </div>
            <div>
              <h3 className="text-base font-extrabold uppercase tracking-wide leading-tight">
                SPECIAL OFFER
              </h3>
              <p className="text-xs text-amber-50 mt-0.5">
                Save up to 50% off
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-950 group-hover:underline transition-colors mt-2">
                <span>Grab the Deal</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-white/10 rounded-full pointer-events-none" />
        </div>

        {/* Banner 3: Member Benefits (Light Stone / Cream) */}
        <div
          id="promo-banner-members"
          onClick={() => {
            if (currentUser) {
              setActiveTab('account');
            } else {
              setIsAuthModalOpen(true);
            }
          }}
          className="group relative bg-[#ece8df] text-zinc-900 p-6 rounded-2xl flex items-center justify-between cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-xl border border-stone-300/60 overflow-hidden"
        >
          <div className="flex items-center gap-4 z-10">
            <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center shrink-0 text-zinc-900 shadow-2xs">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold uppercase tracking-wide leading-tight text-zinc-950">
                MEMBER BENEFITS
              </h3>
              <p className="text-xs text-zinc-600 mt-0.5">
                Join now & get exclusive deals
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 group-hover:text-[#b3834f] transition-colors mt-2">
                <span>{currentUser ? 'View Account' : 'Join Free'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-black/5 rounded-full pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
