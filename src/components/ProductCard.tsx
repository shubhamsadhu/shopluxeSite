import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  ExternalLink,
  Star,
  Scale,
  Heart,
  Eye,
  Check
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const {
    viewProductDetails,
    addToCart,
    handleAffiliateClick,
    addToComparison,
    removeFromComparison,
    isInComparison,
    toggleWishlist,
    isInWishlist
  } = useStore();

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInComparison(product.id);

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.type === 'affiliate') {
      handleAffiliateClick(product);
    } else {
      addToCart(product);
    }
  };

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompared) {
      removeFromComparison(product.id);
    } else {
      addToComparison(product);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => viewProductDetails(product)}
      className="group relative flex flex-col bg-white border border-zinc-200/80 rounded-2xl p-3.5 transition-all duration-300 hover:shadow-lg hover:border-zinc-300 cursor-pointer overflow-hidden"
    >
      {/* Top Bar: Badges & Quick Action Icons */}
      <div className="flex items-center justify-between gap-1 mb-2 z-10">
        <div className="flex items-center gap-1.5 flex-wrap">
          {product.discountBadge && (
            <span className="bg-zinc-950 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
              {product.discountBadge}
            </span>
          )}
          {product.type === 'affiliate' ? (
            <span className="bg-amber-50 text-amber-800 border border-amber-200/60 font-semibold text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
              <span>{product.affiliateVendor || 'Affiliate'}</span>
            </span>
          ) : (
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-semibold text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">
              ShopLuxe
            </span>
          )}
        </div>

        {/* Wishlist & Compare Quick Icons */}
        <div className="flex items-center gap-1">
          <button
            id={`btn-compare-${product.id}`}
            onClick={handleCompareToggle}
            className={`p-1.5 rounded-full transition-colors ${
              isCompared
                ? 'bg-amber-100 text-amber-800'
                : 'bg-zinc-100/80 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900'
            }`}
            title={isCompared ? 'Remove from Comparison' : 'Add to Comparison'}
            aria-label="Compare"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
          <button
            id={`btn-wishlist-${product.id}`}
            onClick={handleWishlistToggle}
            className={`p-1.5 rounded-full transition-colors ${
              isFavorited
                ? 'bg-rose-100 text-rose-600'
                : 'bg-zinc-100/80 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900'
            }`}
            title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label="Favorite"
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-rose-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Product Image Frame */}
      <div className="relative w-full aspect-square bg-[#f8f8f6] rounded-xl overflow-hidden mb-3 flex items-center justify-center p-3">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Quick View Hover Pill */}
        <div className="absolute inset-x-0 bottom-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="bg-zinc-950/85 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </span>
        </div>
      </div>

      {/* Product Title */}
      <h3 className="text-sm font-bold text-zinc-900 line-clamp-1 group-hover:text-[#b3834f] transition-colors leading-snug">
        {product.title}
      </h3>

      {/* Ratings Row */}
      <div className="flex items-center gap-1.5 my-1.5">
        <div className="flex text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="text-[11px] font-medium text-zinc-500">
          ({product.reviewCount})
        </span>
      </div>

      {/* Price & Strikethrough */}
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-base font-extrabold text-zinc-950">
          ${product.price.toFixed(2)}
        </span>
        {product.originalPrice && (
          <span className="text-xs text-zinc-400 line-through font-normal">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}
      </div>

      {/* CTA Button matching reference bottom card */}
      <div className="mt-auto pt-1">
        {product.type === 'affiliate' ? (
          <button
            id={`btn-affiliate-buy-${product.id}`}
            onClick={handleAction}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-950 hover:text-white hover:border-zinc-950 text-zinc-900 text-xs font-bold transition-all shadow-2xs group/btn cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover/btn:text-white transition-colors" />
            <span>BUY ON {product.affiliateVendor ? product.affiliateVendor.toUpperCase() : 'PARTNER'}</span>
          </button>
        ) : (
          <button
            id={`btn-add-cart-${product.id}`}
            onClick={handleAction}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-950 hover:text-white hover:border-zinc-950 text-zinc-900 text-xs font-bold transition-all shadow-2xs group/btn cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-zinc-600 group-hover/btn:text-white transition-colors" />
            <span>ADD TO CART</span>
          </button>
        )}
      </div>
    </div>
  );
};
