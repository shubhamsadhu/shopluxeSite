import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BlogPost } from '../types';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ExternalLink,
  ShoppingBag,
  Share2,
  Tag,
  ChevronRight,
  User
} from 'lucide-react';

export const BlogSection: React.FC = () => {
  const {
    blogPosts,
    products,
    viewProductDetails,
    handleAffiliateClick,
    addToCart,
    showToast
  } = useStore();

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Technology', 'Travel & Lifestyle', 'Home & Living'];

  const filteredPosts = blogPosts.filter((post) => {
    if (selectedCategory === 'All') return true;
    return post.category === selectedCategory;
  });

  const getProduct = (id?: string) => products.find((p) => p.id === id);

  return (
    <div id="blog-articles-view" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-[#f5f4ef] rounded-2xl p-6 sm:p-8 border border-stone-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#b3834f]">
              EDITORIAL & BUYING GUIDES
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-zinc-950 tracking-tight">
            Articles & Expert Reviews
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-xl">
            In-depth hardware teardowns, travel packing philosophies, and curated affiliate deal guides researched by our staff editors.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedPost(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {selectedPost ? (
        /* Full Article Reader View */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/80 shadow-xs space-y-8 animate-in fade-in">
          {/* Back button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
          >
            <span>← Back to all articles</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4 max-w-3xl">
            <span className="inline-block bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {selectedPost.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 leading-tight">
              {selectedPost.title}
            </h1>

            {/* Author info & Metadata */}
            <div className="flex items-center gap-4 text-xs text-zinc-500 pt-2 border-t border-zinc-100">
              <div className="flex items-center gap-2">
                <img
                  src={selectedPost.author.avatar}
                  alt={selectedPost.author.name}
                  className="w-8 h-8 rounded-full object-cover border border-zinc-200"
                />
                <div>
                  <span className="font-bold text-zinc-900 block">{selectedPost.author.name}</span>
                  <span className="text-[10px] text-zinc-400">{selectedPost.author.role}</span>
                </div>
              </div>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{selectedPost.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{selectedPost.readTime}</span>
              </span>
            </div>
          </div>

          {/* Hero Feature Image */}
          <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden bg-zinc-100">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-6 text-sm text-zinc-700 leading-relaxed">
              {selectedPost.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}

              {/* Tags */}
              <div className="flex items-center gap-2 pt-6 border-t border-zinc-100 flex-wrap">
                <Tag className="w-4 h-4 text-zinc-400" />
                {selectedPost.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Featured Products embedded in Article */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#fcfbf9] border border-stone-200 rounded-2xl p-5 space-y-4 sticky top-28">
                <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-amber-700" />
                  <span>Featured in this Article</span>
                </h3>

                {selectedPost.featuredProductId && (
                  (() => {
                    const prod = getProduct(selectedPost.featuredProductId);
                    if (!prod) return null;
                    return (
                      <div className="bg-white rounded-xl border border-zinc-200 p-3.5 shadow-2xs space-y-2.5">
                        <div className="aspect-square bg-zinc-50 rounded-lg p-2 flex items-center justify-center">
                          <img src={prod.image} alt={prod.title} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                            Editor's Top Pick
                          </span>
                          <h4 className="text-xs font-bold text-zinc-950 line-clamp-1">{prod.title}</h4>
                          <span className="text-sm font-extrabold text-zinc-900">${prod.price.toFixed(2)}</span>
                        </div>

                        {prod.type === 'affiliate' ? (
                          <button
                            onClick={() => handleAffiliateClick(prod)}
                            className="w-full py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                            <span>Buy on {prod.affiliateVendor || 'Amazon'}</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => addToCart(prod)}
                            className="w-full py-2 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                        )}
                        <button
                          onClick={() => viewProductDetails(prod)}
                          className="w-full text-center text-[11px] text-zinc-500 hover:text-zinc-900 font-semibold underline"
                        >
                          View Full Specs & Reviews
                        </button>
                      </div>
                    );
                  })()
                )}

                {/* Secondary featured products */}
                {selectedPost.secondaryProductIds && selectedPost.secondaryProductIds.length > 0 && (
                  <div className="pt-2 border-t border-zinc-200 space-y-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                      Also Referenced:
                    </span>
                    {selectedPost.secondaryProductIds.map((id) => {
                      const p = getProduct(id);
                      if (!p) return null;
                      return (
                        <div
                          key={p.id}
                          onClick={() => viewProductDetails(p)}
                          className="flex items-center gap-3 p-2 bg-white rounded-lg border border-zinc-100 hover:border-zinc-300 cursor-pointer transition-colors"
                        >
                          <img src={p.image} alt={p.title} className="w-10 h-10 object-contain mix-blend-multiply" />
                          <div className="min-w-0 flex-1">
                            <h5 className="text-xs font-bold text-zinc-900 truncate">{p.title}</h5>
                            <span className="text-xs font-extrabold text-zinc-700">${p.price.toFixed(2)}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Blog Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group bg-white border border-zinc-200/80 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="font-bold text-[#b3834f] uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-950 group-hover:text-[#b3834f] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-zinc-500 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author and Read Link */}
              <div className="p-5 pt-0 border-t border-zinc-100 mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-zinc-600 font-medium text-[11px]">{post.author.name}</span>
                </div>

                <span className="text-xs font-bold text-zinc-900 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
