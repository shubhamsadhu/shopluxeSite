import React from 'react';
import { useStore } from '../context/StoreContext';
import { Grid, Sparkles } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  imageUrl: string;
  isMore?: boolean;
}

export const CategoryBrowse: React.FC = () => {
  const { setSelectedCategory, setActiveTab } = useStore();

  const categories: CategoryItem[] = [
    {
      id: 'Accessories',
      name: 'Accessories',
      imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'Electronics',
      name: 'Electronics',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'Home & Living',
      name: 'Home & Living',
      imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'Fashion',
      name: 'Fashion',
      imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'Beauty',
      name: 'Beauty',
      imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'Sports',
      name: 'Sports',
      imageUrl: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'Toys & Games',
      name: 'Toys & Games',
      imageUrl: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'All',
      name: 'More Categories',
      imageUrl: '',
      isMore: true
    }
  ];

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="browse-by-category-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Centered Heading */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wider text-zinc-900">
          BROWSE BY CATEGORY
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          Explore our handpicked curation across everyday essentials and trending technology
        </p>
      </div>

      {/* 8-Grid responsive layout matching reference */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            id={`category-card-${cat.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            onClick={() => handleCategoryClick(cat.id)}
            className="group flex flex-col items-center bg-[#f4f3ef] hover:bg-[#eae8e1] border border-stone-200/60 rounded-2xl p-3 sm:p-4 text-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-sm"
          >
            {/* Visual Thumbnail Frame */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center overflow-hidden mb-3 bg-white/70 shadow-2xs group-hover:bg-white transition-colors">
              {cat.isMore ? (
                <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                  <Grid className="w-5 h-5" />
                </div>
              ) : (
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              )}
            </div>

            {/* Category Name */}
            <span className="text-xs font-bold text-zinc-800 group-hover:text-zinc-950 transition-colors line-clamp-1">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
