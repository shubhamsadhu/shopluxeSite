import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const TrendingProducts: React.FC = () => {
  const { products, setActiveTab, setSelectedCategory } = useStore();
  const [filter, setFilter] = useState<'all' | 'affiliate' | 'own'>('all');

  // Products featured on home matching reference
  const trendingList = products.slice(0, 5);

  const displayedProducts = trendingList.filter(p => {
    if (filter === 'affiliate') return p.type === 'affiliate';
    if (filter === 'own') return p.type === 'own';
    return true;
  });

  return (
    <section id="trending-products-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Row matching reference */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-b border-zinc-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-extrabold tracking-widest text-[#b3834f] uppercase">
              TOP CURATED PICKS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-zinc-950">
            TRENDING PRODUCTS
          </h2>
        </div>

        {/* Filter Chips + View All link */}
        <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
          <div className="flex items-center bg-zinc-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filter === 'all' ? 'bg-white text-zinc-950 shadow-2xs font-bold' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('affiliate')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filter === 'affiliate' ? 'bg-white text-amber-800 shadow-2xs font-bold' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Affiliate Deals
            </button>
            <button
              onClick={() => setFilter('own')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filter === 'own' ? 'bg-white text-emerald-800 shadow-2xs font-bold' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              ShopLuxe Brand
            </button>
          </div>

          <button
            id="view-all-products-link"
            onClick={() => {
              setActiveTab('shop');
              setSelectedCategory('All');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-zinc-900 hover:text-[#b3834f] transition-colors cursor-pointer"
          >
            <span>VIEW ALL PRODUCTS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 5-Column Grid matching reference image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
