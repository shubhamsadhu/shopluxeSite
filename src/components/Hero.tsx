import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ArrowRight,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab, setSelectedCategory, viewProductDetails, products } = useStore();
  const [activeSlide, setActiveSlide] = useState(0);

  const heroBackpack = products.find(p => p.id === 'prod-commuter-backpack-beige') || products[1];
  const heroBottle = products.find(p => p.id === 'prod-shopluxe-water-bottle') || products[6];

  const slides = [
    {
      title: 'Spring Urban Collection',
      discount: 'UP TO 50% OFF',
      tagline: 'Best Quality, Best Prices!',
      desc: 'Discover a wide range of top-quality products handpicked just for you.',
      badgeColor: 'bg-zinc-950 text-white',
      featuredProduct: heroBackpack
    },
    {
      title: 'Minimalist Tech & Sound',
      discount: 'EXCLUSIVE DEALS',
      tagline: 'Smart Gear, Smarter Savings!',
      desc: 'Tested and verified electronics from premier audio and wearable brands.',
      badgeColor: 'bg-[#151922] text-amber-400',
      featuredProduct: products.find(p => p.id === 'prod-smartwatch-9') || products[0]
    }
  ];

  const currentSlide = slides[activeSlide];

  return (
    <section id="home-hero-section" className="relative overflow-hidden bg-gradient-to-b from-[#f8f7f5] to-[#f4f3ef] border-b border-zinc-200/60">
      {/* Subtle organic background wave element matching reference */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ece9e2]/50 to-transparent pointer-events-none rounded-bl-[120px] hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-6 space-y-6 z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-extrabold tracking-[0.2em] text-[#b3834f] uppercase">
                WELCOME TO SHOPLUXE
              </span>
            </div>

            {/* Massive Typography */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 uppercase leading-[1.05]">
                EVERYTHING.
                <br />
                FOR EVERYONE.
              </h1>
              {/* Cursive Handwriting script line matching reference image */}
              <p className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#b3834f] font-bold pt-1 -rotate-1 select-none">
                {currentSlide.tagline}
              </p>
            </div>

            {/* Subtitle / Paragraph */}
            <p className="text-zinc-600 text-sm sm:text-base max-w-lg leading-relaxed font-normal">
              {currentSlide.desc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-shop-now-btn"
                onClick={() => {
                  setActiveTab('shop');
                  setSelectedCategory('All');
                }}
                className="inline-flex items-center gap-2.5 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-collections-btn"
                onClick={() => {
                  setActiveTab('shop');
                  setSelectedCategory('Fashion');
                }}
                className="inline-flex items-center gap-2 border-2 border-zinc-900 hover:bg-zinc-950 hover:text-white text-zinc-900 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all cursor-pointer"
              >
                <span>EXPLORE COLLECTIONS</span>
              </button>
            </div>

            {/* Value Guarantees Strip matching reference bottom left */}
            <div className="pt-6 border-t border-zinc-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-800 shadow-2xs">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 leading-tight">FREE SHIPPING</h4>
                  <p className="text-[11px] text-zinc-500">On orders over $50</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-800 shadow-2xs">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 leading-tight">EASY RETURNS</h4>
                  <p className="text-[11px] text-zinc-500">30-day return policy</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-800 shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 leading-tight">SECURE PAYMENT</h4>
                  <p className="text-[11px] text-zinc-500">100% secure checkout</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Column matching reference photo composition */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Circular Discount Badge */}
            <div className="absolute top-4 left-4 sm:top-2 sm:left-6 z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-zinc-950 text-white flex flex-col items-center justify-center text-center shadow-xl border-2 border-white/20 select-none animate-pulse">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-amber-400">UP TO</span>
              <span className="text-2xl sm:text-3xl font-black leading-none">50%</span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-300">OFF</span>
            </div>

            {/* Interactive Image Showcase Frame */}
            <div className="relative w-full max-w-lg aspect-[4/3.8] bg-gradient-to-tr from-stone-200/80 via-stone-100/60 to-white/90 rounded-3xl p-6 sm:p-8 flex items-center justify-center shadow-sm border border-stone-200/70 overflow-hidden">
              
              {/* Product collage matching reference */}
              <div className="relative w-full h-full flex items-end justify-center">
                {/* Backpack (Primary Hero Asset) */}
                <div
                  onClick={() => viewProductDetails(heroBackpack)}
                  className="relative z-10 w-3/4 max-w-[320px] cursor-pointer group transition-transform hover:scale-105 duration-300"
                  title="ShopLuxe Commuter Backpack - Click to view"
                >
                  <img
                    src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
                    alt="ShopLuxe Urban Backpack"
                    className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl"
                  />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-zinc-950/85 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    View Backpack • $49.99
                  </div>
                </div>

                {/* Insulated Bottle Asset */}
                <div
                  onClick={() => viewProductDetails(heroBottle)}
                  className="absolute -left-2 bottom-6 z-15 w-24 sm:w-28 cursor-pointer hover:scale-110 transition-transform"
                  title="ShopLuxe Insulated Flask"
                >
                  <img
                    src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80"
                    alt="ShopLuxe Water Bottle"
                    className="w-full h-auto object-contain drop-shadow-xl rounded-xl"
                  />
                </div>

                {/* White Sneakers Asset */}
                <div className="absolute right-0 bottom-3 z-15 w-32 sm:w-40 cursor-pointer hover:scale-105 transition-transform">
                  <img
                    src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80"
                    alt="White Minimalist Sneakers"
                    className="w-full h-auto object-contain drop-shadow-xl rounded-xl"
                  />
                </div>

                {/* Sunglasses Asset */}
                <div className="absolute right-12 bottom-0 z-20 w-20 sm:w-24 opacity-90 hover:opacity-100 transition-opacity">
                  <img
                    src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80"
                    alt="Aviator Sunglasses"
                    className="w-full h-auto object-contain drop-shadow-md rounded-lg"
                  />
                </div>
              </div>

              {/* Slider Controls matching reference arrows & dots */}
              <button
                onClick={() => setActiveSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-zinc-800 shadow-md flex items-center justify-center transition-all z-20 cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveSlide(prev => (prev === 1 ? 0 : prev + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-zinc-800 shadow-md flex items-center justify-center transition-all z-20 cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Slider Dots */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeSlide === idx ? 'w-6 bg-zinc-950' : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
