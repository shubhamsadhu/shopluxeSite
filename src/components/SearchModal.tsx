import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, X, ArrowRight, ExternalLink, ShoppingBag, Sparkles } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    products,
    viewProductDetails,
    setSelectedCategory,
    setActiveTab
  } = useStore();

  const [queryText, setQueryText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQueryText('');
    }
  }, [isSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const matches = queryText.trim()
    ? products.filter((p) => {
        const q = queryText.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.specs.brand.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelectProduct = (product: any) => {
    viewProductDetails(product);
    setIsSearchModalOpen(false);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setActiveTab('shop');
    setIsSearchModalOpen(false);
  };

  return (
    <div id="search-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 animate-in fade-in slide-in-from-top-4">
        
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            placeholder="Search products, brands, or affiliate deals..."
            className="flex-1 text-sm sm:text-base font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden"
          />
          {queryText && (
            <button
              onClick={() => setQueryText('')}
              className="p-1 rounded-full text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="px-2.5 py-1 text-xs font-bold text-zinc-500 hover:text-zinc-900 border border-zinc-200 rounded-lg"
          >
            ESC
          </button>
        </div>

        {/* Modal Results & Quick Links */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-5">
          
          {queryText.trim() === '' ? (
            /* Default: Popular categories & quick suggestions */
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  Popular Categories
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Electronics', 'Fashion', 'Accessories', 'Home & Living', 'Beauty', 'Sports'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleSelectCategory(cat)}
                      className="px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  Trending Now
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {products.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-50 border border-transparent hover:border-zinc-200 cursor-pointer transition-all"
                    >
                      <img src={p.image} alt={p.title} className="w-10 h-10 object-contain mix-blend-multiply" />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-zinc-900 truncate">{p.title}</h4>
                        <span className="text-[11px] font-extrabold text-zinc-600">${p.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Search Results */
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-3">
                Found {matches.length} matching {matches.length === 1 ? 'item' : 'items'}
              </span>

              {matches.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 text-xs">
                  No products matched "<strong className="text-zinc-900">{queryText}</strong>". Try another keyword or browse our categories.
                </div>
              ) : (
                <div className="space-y-2">
                  {matches.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="flex items-center justify-between p-3 rounded-2xl border border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 p-1 flex items-center justify-center shrink-0">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-zinc-900 truncate">{product.title}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase">{product.category}</span>
                            <span className="text-[10px] text-zinc-300">•</span>
                            <span className="text-[10px] font-semibold text-emerald-700">
                              {product.type === 'affiliate' ? `Deals on ${product.affiliateVendor}` : 'ShopLuxe Direct'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs sm:text-sm font-extrabold text-zinc-950">
                          ${product.price.toFixed(2)}
                        </span>
                        <ArrowRight className="w-4 h-4 text-zinc-400" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
