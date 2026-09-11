import React from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import {
  Scale,
  X,
  Plus,
  Star,
  ShoppingBag,
  ExternalLink,
  Check,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

export const ProductComparison: React.FC = () => {
  const {
    comparisonList,
    removeFromComparison,
    clearComparison,
    addToComparison,
    products,
    viewProductDetails,
    addToCart,
    handleAffiliateClick,
    setActiveTab
  } = useStore();

  const handleAction = (product: Product) => {
    if (product.type === 'affiliate') {
      handleAffiliateClick(product);
    } else {
      addToCart(product);
    }
  };

  const availableToAdd = products.filter(
    (p) => !comparisonList.some((cp) => cp.id === p.id)
  );

  return (
    <div id="product-comparison-view" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-[#f5f4ef] rounded-2xl p-6 sm:p-8 border border-stone-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Scale className="w-4 h-4 text-amber-700" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#b3834f]">
              DECISION ENGINE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-zinc-950 tracking-tight">
            Side-by-Side Product Comparison
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-xl">
            Compare technical specs, materials, warranty, real pricing, and buying options side-by-side to make the smartest purchase.
          </p>
        </div>

        {comparisonList.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={clearComparison}
              className="px-4 py-2 border border-zinc-300 hover:bg-white text-zinc-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Clear Comparison
            </button>
            <button
              onClick={() => setActiveTab('shop')}
              className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Add More Products
            </button>
          </div>
        )}
      </div>

      {comparisonList.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-zinc-200 p-10 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto mb-4">
            <Scale className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900">Your Comparison Table is Empty</h3>
          <p className="text-xs text-zinc-500 mt-1 mb-6">
            Select products across our catalogue or choose from popular comparisons below to see detailed spec matchups.
          </p>

          <div className="text-left mb-6">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-3">
              Suggested products to compare:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {products.slice(0, 4).map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => addToComparison(prod)}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-200 hover:border-zinc-400 bg-zinc-50 hover:bg-white text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <img src={prod.image} alt={prod.title} className="w-8 h-8 object-contain mix-blend-multiply" />
                    <span className="text-xs font-semibold text-zinc-800 line-clamp-1">{prod.title}</span>
                  </div>
                  <Plus className="w-4 h-4 text-zinc-500 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('shop')}
            className="px-6 py-3 bg-zinc-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-zinc-800"
          >
            Explore Full Catalogue
          </button>
        </div>
      ) : (
        /* Side by Side Comparison Table */
        <div className="bg-white rounded-3xl border border-zinc-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/70">
                  <th className="p-4 w-48 text-xs font-black uppercase text-zinc-400 tracking-wider">
                    Feature / Attribute
                  </th>
                  {comparisonList.map((product) => (
                    <th key={product.id} className="p-4 w-64 align-top relative">
                      <button
                        onClick={() => removeFromComparison(product.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-zinc-200 text-zinc-400 hover:text-zinc-700 transition-colors"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div
                        onClick={() => viewProductDetails(product)}
                        className="cursor-pointer group flex flex-col items-center text-center pt-2"
                      >
                        <div className="w-24 h-24 rounded-xl bg-white border border-zinc-200 p-2 mb-2 flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <span className="text-xs font-bold text-zinc-900 group-hover:text-amber-700 line-clamp-2">
                          {product.title}
                        </span>
                        <span className="text-[10px] text-zinc-400 mt-0.5">{product.category}</span>
                      </div>
                    </th>
                  ))}
                  {comparisonList.length < 4 && (
                    <th className="p-4 w-48 align-middle text-center border-l border-dashed border-zinc-200">
                      <div className="p-4">
                        <span className="text-xs font-semibold text-zinc-400 block mb-2">Add another:</span>
                        <select
                          onChange={(e) => {
                            const p = products.find((prod) => prod.id === e.target.value);
                            if (p) addToComparison(p);
                            e.target.value = '';
                          }}
                          defaultValue=""
                          className="w-full text-xs p-2 bg-zinc-100 border border-zinc-300 rounded-xl"
                        >
                          <option value="" disabled>Choose product...</option>
                          {availableToAdd.map((p) => (
                            <option key={p.id} value={p.id}>{p.title}</option>
                          ))}
                        </select>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-100 text-xs">
                {/* Price */}
                <tr>
                  <td className="p-4 font-bold text-zinc-900 bg-zinc-50/40">Deal Price</td>
                  {comparisonList.map((p) => (
                    <td key={p.id} className="p-4">
                      <span className="text-base font-extrabold text-zinc-950">${p.price.toFixed(2)}</span>
                      {p.originalPrice && (
                        <span className="ml-2 text-zinc-400 line-through text-xs">${p.originalPrice.toFixed(2)}</span>
                      )}
                    </td>
                  ))}
                  {comparisonList.length < 4 && <td className="border-l border-dashed border-zinc-200" />}
                </tr>

                {/* Fulfillment Source */}
                <tr>
                  <td className="p-4 font-bold text-zinc-900 bg-zinc-50/40">Source / Model</td>
                  {comparisonList.map((p) => (
                    <td key={p.id} className="p-4">
                      {p.type === 'affiliate' ? (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-bold">
                          <span>{p.affiliateVendor || 'Affiliate Partner'}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-bold">
                          <span>ShopLuxe Direct</span>
                        </span>
                      )}
                    </td>
                  ))}
                  {comparisonList.length < 4 && <td className="border-l border-dashed border-zinc-200" />}
                </tr>

                {/* Rating */}
                <tr>
                  <td className="p-4 font-bold text-zinc-900 bg-zinc-50/40">Customer Score</td>
                  {comparisonList.map((p) => (
                    <td key={p.id} className="p-4">
                      <div className="flex items-center gap-1.5 font-bold text-zinc-900">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{p.rating.toFixed(1)} / 5.0</span>
                        <span className="text-zinc-400 font-normal">({p.reviewCount})</span>
                      </div>
                    </td>
                  ))}
                  {comparisonList.length < 4 && <td className="border-l border-dashed border-zinc-200" />}
                </tr>

                {/* Brand */}
                <tr>
                  <td className="p-4 font-bold text-zinc-900 bg-zinc-50/40">Brand / Maker</td>
                  {comparisonList.map((p) => (
                    <td key={p.id} className="p-4 font-medium text-zinc-700">{p.specs.brand}</td>
                  ))}
                  {comparisonList.length < 4 && <td className="border-l border-dashed border-zinc-200" />}
                </tr>

                {/* Dimensions */}
                <tr>
                  <td className="p-4 font-bold text-zinc-900 bg-zinc-50/40">Dimensions</td>
                  {comparisonList.map((p) => (
                    <td key={p.id} className="p-4 text-zinc-600">{p.specs.dimensions || 'N/A'}</td>
                  ))}
                  {comparisonList.length < 4 && <td className="border-l border-dashed border-zinc-200" />}
                </tr>

                {/* Weight */}
                <tr>
                  <td className="p-4 font-bold text-zinc-900 bg-zinc-50/40">Weight</td>
                  {comparisonList.map((p) => (
                    <td key={p.id} className="p-4 text-zinc-600">{p.specs.weight || 'N/A'}</td>
                  ))}
                  {comparisonList.length < 4 && <td className="border-l border-dashed border-zinc-200" />}
                </tr>

                {/* Material */}
                <tr>
                  <td className="p-4 font-bold text-zinc-900 bg-zinc-50/40">Build Material</td>
                  {comparisonList.map((p) => (
                    <td key={p.id} className="p-4 text-zinc-600">{p.specs.material || 'Standard Composite'}</td>
                  ))}
                  {comparisonList.length < 4 && <td className="border-l border-dashed border-zinc-200" />}
                </tr>

                {/* Warranty */}
                <tr>
                  <td className="p-4 font-bold text-zinc-900 bg-zinc-50/40">Warranty</td>
                  {comparisonList.map((p) => (
                    <td key={p.id} className="p-4 text-zinc-600">{p.specs.warranty || '1-Year'}</td>
                  ))}
                  {comparisonList.length < 4 && <td className="border-l border-dashed border-zinc-200" />}
                </tr>

                {/* Action CTA */}
                <tr className="bg-zinc-50/70">
                  <td className="p-4 font-bold text-zinc-900">Direct Purchase</td>
                  {comparisonList.map((p) => (
                    <td key={p.id} className="p-4">
                      {p.type === 'affiliate' ? (
                        <button
                          onClick={() => handleAction(p)}
                          className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                          <span>BUY NOW</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAction(p)}
                          className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>ADD TO CART</span>
                        </button>
                      )}
                    </td>
                  ))}
                  {comparisonList.length < 4 && <td className="border-l border-dashed border-zinc-200" />}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
