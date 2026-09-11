import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import {
  Filter,
  SlidersHorizontal,
  X,
  Search,
  PlusCircle,
  Sparkles,
  RotateCcw
} from 'lucide-react';

interface ShopCatalogProps {
  onOpenAddProduct?: () => void;
}

export const ShopCatalog: React.FC<ShopCatalogProps> = ({ onOpenAddProduct }) => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [productTypeFilter, setProductTypeFilter] = useState<'all' | 'affiliate' | 'own'>('all');
  const [priceMax, setPriceMax] = useState<number>(250);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = ['All', 'Accessories', 'Electronics', 'Home & Living', 'Fashion', 'Beauty', 'Sports', 'Toys & Games'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && selectedCategory !== 'Affiliate' && selectedCategory !== 'ShopLuxe Direct') {
        if (product.category !== selectedCategory) return false;
      }
      if (selectedCategory === 'Affiliate' && product.type !== 'affiliate') return false;
      if (selectedCategory === 'ShopLuxe Direct' && product.type !== 'own') return false;

      // Product Type filter
      if (productTypeFilter === 'affiliate' && product.type !== 'affiliate') return false;
      if (productTypeFilter === 'own' && product.type !== 'own') return false;

      // Price filter
      if (product.price > priceMax) return false;

      // Rating filter
      if (product.rating < minRating) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = product.title.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchCategory = product.category.toLowerCase().includes(q);
        const matchBrand = product.specs.brand.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchCategory && !matchBrand) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0; // featured default
    });
  }, [products, selectedCategory, productTypeFilter, priceMax, minRating, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setProductTypeFilter('all');
    setPriceMax(250);
    setMinRating(0);
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    productTypeFilter !== 'all' ||
    priceMax < 250 ||
    minRating > 0 ||
    searchQuery.trim() !== '';

  return (
    <div id="shop-catalog-view" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-[#f5f4ef] rounded-2xl p-6 sm:p-8 border border-stone-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#b3834f]">
              CATALOGUE & MARKETPLACE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-zinc-950 tracking-tight">
            {selectedCategory === 'All' ? 'All Products' : `${selectedCategory}`}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-xl">
            Browse our verified selection of ShopLuxe handcrafted products and curated partner affiliate deals with live multi-store comparison pricing.
          </p>
        </div>

        {onOpenAddProduct && (
          <button
            id="catalog-add-product-btn"
            onClick={onOpenAddProduct}
            className="self-start md:self-auto inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-extrabold uppercase tracking-wider px-5 py-3 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Post Product / Deal</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-2xs space-y-6">
            
            {/* Filter Title & Reset */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-zinc-700" />
                <span className="text-xs font-black uppercase tracking-wider text-zinc-900">Filters</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* In-Catalog Search */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2">
                Search Products
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Backpack, Watch, Shoes..."
                  className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-900 focus:bg-white"
                />
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Product Source / Type Filter */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2">
                Inventory Type
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'affiliate', label: 'Affiliate Partner Deals' },
                  { id: 'own', label: 'ShopLuxe Direct (Our Brand)' }
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setProductTypeFilter(type.id as any)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      productTypeFilter === type.id
                        ? 'bg-zinc-950 text-white'
                        : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700'
                    }`}
                  >
                    <span>{type.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${productTypeFilter === type.id ? 'bg-zinc-800 text-zinc-200' : 'text-zinc-400'}`}>
                      {products.filter(p => type.id === 'all' ? true : p.type === type.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2">
                Category
              </label>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-zinc-950 text-white font-bold shadow-2xs'
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                    }`}
                  >
                    <span>{cat}</span>
                    {cat !== 'All' && (
                      <span className="text-[11px] text-zinc-400">
                        {products.filter(p => p.category === cat).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-zinc-800 uppercase tracking-wider">Max Price</span>
                <span className="font-extrabold text-zinc-950">${priceMax}</span>
              </div>
              <input
                type="range"
                min={20}
                max={250}
                step={5}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-zinc-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                <span>$20</span>
                <span>$125</span>
                <span>$250+</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 uppercase tracking-wider mb-2">
                Customer Rating
              </label>
              <div className="flex items-center gap-1">
                {[0, 4.5, 4.8, 5.0].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setMinRating(rate)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      minRating === rate
                        ? 'bg-zinc-900 text-white'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                    }`}
                  >
                    {rate === 0 ? 'Any' : `${rate}★`}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Main Product Grid Column */}
        <main className="lg:col-span-3 space-y-5">
          {/* Controls Bar: Mobile filter button, results count, sorting */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-xl text-xs font-bold text-zinc-800"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
              <span className="text-xs font-bold text-zinc-700">
                Showing <strong className="text-zinc-950">{filteredProducts.length}</strong> items
              </span>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 font-medium">Sort by:</span>
              <select
                id="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-900 focus:outline-hidden focus:border-zinc-900"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Mobile Filter Expandable Drawer */}
          {mobileFilterOpen && (
            <div className="lg:hidden bg-white border border-zinc-200 rounded-2xl p-5 shadow-md space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">Mobile Filters</span>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-4 h-4 text-zinc-500" />
                </button>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1">Categories</label>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map(c => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedCategory(c);
                        setMobileFilterOpen(false);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        selectedCategory === c ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1">Product Source</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'affiliate', label: 'Affiliate Deals' },
                    { id: 'own', label: 'ShopLuxe Direct' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setProductTypeFilter(t.id as any);
                        setMobileFilterOpen(false);
                      }}
                      className={`py-1.5 rounded-lg text-xs font-semibold text-center ${
                        productTypeFilter === t.id ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-700'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-zinc-200 p-8">
              <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-3 text-zinc-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-zinc-900">No matching products found</h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                Try adjusting your search criteria, price range slider, or clearing the active category filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-zinc-950 text-white text-xs font-bold uppercase rounded-xl hover:bg-zinc-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};
