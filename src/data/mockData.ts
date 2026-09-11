import { Product, BlogPost, Review } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-smartwatch-9',
    title: 'Smart Watch Series 9',
    slug: 'smart-watch-series-9',
    category: 'Electronics',
    type: 'affiliate',
    price: 159.99,
    originalPrice: 199.99,
    discountBadge: '-20%',
    rating: 5.0,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The premier next-generation fitness and health companion. Features an always-on ultra-bright OLED retina display, ECG telemetry, blood oxygen sensor, and seamless dual-mic voice isolation.',
    features: [
      'Always-On Retina display with up to 2000 nits brightness',
      'Advanced ECG, blood oxygen & temperature sensing',
      'Crash detection and fall detection emergency SOS',
      'Up to 36 hours low-power battery reserve',
      'Water resistant 50 meters, swimproof design'
    ],
    specs: {
      brand: 'AuraTech',
      model: 'Series 9 Pro Edition',
      material: 'Aircraft-grade Aluminum & Ceramic back',
      dimensions: '45mm x 38mm x 10.7mm',
      weight: '38.8 grams',
      warranty: '2-Year Manufacturer Warranty',
      colorOptions: ['Midnight Black', 'Starlight Silver', 'Rose Gold'],
      origin: 'California, USA'
    },
    inStock: true,
    affiliateUrl: 'https://www.amazon.com/dp/B0CHX3L3YF?tag=shopluxe-20',
    affiliateVendor: 'Amazon.com',
    affiliateCommissionNotice: 'As an Amazon Associate, ShopLuxe earns from qualifying purchases.',
    storeComparisons: [
      { storeName: 'Amazon', price: 159.99, url: 'https://www.amazon.com/dp/B0CHX3L3YF?tag=shopluxe-20', inStock: true, badge: 'Lowest Price' },
      { storeName: 'Best Buy', price: 179.99, url: 'https://www.bestbuy.com', inStock: true },
      { storeName: 'Walmart', price: 184.50, url: 'https://www.walmart.com', inStock: true },
      { storeName: 'Target', price: 189.99, url: 'https://www.target.com', inStock: false }
    ],
    pros: ['Stunning high-refresh OLED screen', 'Accurate heart-rate & sleep tracking', 'Extensive third-party app ecosystem'],
    cons: ['Requires daily charge with heavy usage', 'Full features locked to companion iOS/Android app'],
    createdAt: '2025-01-15'
  },
  {
    id: 'prod-travel-backpack',
    title: 'Travel Backpack Explorer',
    slug: 'travel-backpack-explorer',
    category: 'Fashion',
    type: 'own',
    isShopLuxeExclusive: true,
    price: 49.99,
    originalPrice: 59.99,
    discountBadge: '-15%',
    rating: 5.0,
    reviewCount: 96,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered directly by ShopLuxe Atelier, the Explorer backpack is built from weatherproof Cordura nylon. Specially tailored for modern commuters and world travelers with a TSA-ready 16-inch laptop compartment.',
    features: [
      'TSA-friendly clamshell opening for airport security checkpoints',
      'Weather-resistant 900D water-repellent ballistic weave',
      'Anti-theft hidden passport pocket and YKK lockable zippers',
      'Built-in USB external charging passthrough port',
      'Ergonomic memory-foam shoulder straps & luggage slip-through'
    ],
    specs: {
      brand: 'ShopLuxe Direct',
      model: 'Explorer Commuter 30L',
      material: '900D Water-Repellent Recycled Ballistic Nylon',
      dimensions: '48cm x 32cm x 18cm',
      weight: '850 grams',
      warranty: 'Lifetime Craftsmanship Guarantee',
      colorOptions: ['Olive Green', 'Matte Carbon', 'Sand Tan'],
      origin: 'Designed in New York, Handcrafted ethically'
    },
    inStock: true,
    stockQuantity: 42,
    pros: ['Direct from ShopLuxe with lifetime guarantee', 'Incredible pocket organization', 'Waterproof zippers & hidden passport sleeve'],
    cons: ['Can feel rigid when packed completely empty'],
    createdAt: '2025-02-01'
  },
  {
    id: 'prod-wireless-earbuds',
    title: 'Wireless Earbuds Pro',
    slug: 'wireless-earbuds-pro',
    category: 'Electronics',
    type: 'affiliate',
    price: 29.99,
    originalPrice: 49.99,
    discountBadge: 'POPULAR',
    rating: 5.0,
    reviewCount: 243,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Immersive sound with high-fidelity 11mm dynamic drivers and smart Active Noise Cancellation (ANC). Includes transparent mode for crystal-clear situational awareness on morning runs.',
    features: [
      'Active Noise Cancellation up to 35dB noise reduction',
      'High-resolution spatial audio with dynamic head tracking',
      'Up to 32 hours total playback with USB-C wireless charging case',
      'IPX5 sweat & water resistant rating',
      'Quad-microphone beamforming array for noise-free calls'
    ],
    specs: {
      brand: 'SoundPulse',
      model: 'TrueBuds Pure ANC',
      material: 'Polycarbonate with matte silicone ear-tips',
      dimensions: 'Case: 60mm x 45mm x 22mm',
      weight: '4.2g per earbud',
      warranty: '1-Year International Warranty',
      colorOptions: ['Pure White', 'Obsidian Black'],
      origin: 'Tokyo, Japan'
    },
    inStock: true,
    affiliateUrl: 'https://www.amazon.com/dp/B09G93C5W6?tag=shopluxe-20',
    affiliateVendor: 'Amazon.com',
    affiliateCommissionNotice: 'Affiliate partner item. ShopLuxe receives a small commission at no additional cost to you.',
    storeComparisons: [
      { storeName: 'Amazon', price: 29.99, url: 'https://www.amazon.com?tag=shopluxe-20', inStock: true, badge: 'Best Value' },
      { storeName: 'Walmart', price: 34.99, url: 'https://www.walmart.com', inStock: true },
      { storeName: 'Target', price: 39.99, url: 'https://www.target.com', inStock: true }
    ],
    pros: ['Ultra-comfortable lightweight ergonomic fit', 'Punchy bass with balanced highs', 'Instant Bluetooth 5.3 pairing'],
    cons: ['Case lacks volume lanyard loop'],
    createdAt: '2025-01-20'
  },
  {
    id: 'prod-perfume-men',
    title: 'Perfume For Men Noir',
    slug: 'perfume-for-men-noir',
    category: 'Beauty',
    type: 'affiliate',
    price: 69.99,
    originalPrice: 89.99,
    discountBadge: 'LUXURY',
    rating: 5.0,
    reviewCount: 75,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An enigmatic woody aromatic fragrance radiating timeless charisma and refined masculinity. Notes of fresh Calabrian bergamot, pink peppercorn, Haitian vetiver, and smoky cedarwood.',
    features: [
      'Eau de Parfum concentration (18-20% pure essence)',
      'Long-lasting sillage lasting over 10 hours',
      'Magnetic weighted midnight blue bottle cap',
      'Responsibly sourced natural essential oils',
      'Ideal for evening affairs, boardroom, or romantic date nights'
    ],
    specs: {
      brand: 'Bleu Prestige',
      model: 'Eau De Parfum 100ml / 3.4 fl. oz',
      material: 'Heavy frosted crystal glass flask',
      dimensions: '12cm x 7cm x 3.5cm',
      weight: '340 grams',
      warranty: '100% Authentic Guarantee',
      colorOptions: ['Midnight Blue'],
      origin: 'Grasse, France'
    },
    inStock: true,
    affiliateUrl: 'https://www.sephora.com?aff=shopluxe',
    affiliateVendor: 'Sephora',
    affiliateCommissionNotice: 'Official Sephora Affiliate partner. Secure checkout on Sephora.com.',
    storeComparisons: [
      { storeName: 'Sephora', price: 69.99, url: 'https://www.sephora.com', inStock: true, badge: 'Official Partner' },
      { storeName: 'Amazon', price: 74.99, url: 'https://www.amazon.com', inStock: true },
      { storeName: 'Walmart', price: 79.00, url: 'https://www.walmart.com', inStock: false }
    ],
    pros: ['Irresistible compliment magnet scent', 'Exceptional longevity on skin and fabric', 'Luxurious magnetic cap feel'],
    cons: ['Strong initial opening projection during the first 10 minutes'],
    createdAt: '2025-02-10'
  },
  {
    id: 'prod-moon-lamp',
    title: 'Luminous 3D Moon Lamp',
    slug: 'luminous-3d-moon-lamp',
    category: 'Home & Living',
    type: 'own',
    isShopLuxeExclusive: true,
    price: 24.99,
    originalPrice: 34.99,
    discountBadge: 'BESTSELLER',
    rating: 5.0,
    reviewCount: 58,
    image: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Accurately 3D-scanned from NASA satellite topographical lunar imagery. Emits a soothing ambient glow in 16 RGB color modes with touch and remote dimmer controls, resting on a hand-carved solid birch stand.',
    features: [
      'True NASA topographical relief surface accurate to 0.125mm',
      '16 ambient color tones with touch & wireless remote control',
      'Built-in 500mAh lithium rechargeable battery (8-12 hour runtime)',
      'Flicker-free eye-friendly LED soft lighting',
      'Handcrafted sustainable natural beechwood interlocking tripod base'
    ],
    specs: {
      brand: 'ShopLuxe Home',
      model: 'Luna 15cm Glow',
      material: 'Eco-friendly PLA polymer + Solid Natural Beech Wood',
      dimensions: 'Diameter: 15cm (5.9 inches)',
      weight: '290 grams',
      warranty: '1-Year Full Replacement',
      colorOptions: ['Warm White & 16 RGB Modes'],
      origin: 'ShopLuxe Design Studio'
    },
    inStock: true,
    stockQuantity: 85,
    pros: ['Realistic crater textures based on NASA data', 'Cordless rechargeable design allows placement anywhere', 'Beautiful wooden stand included'],
    cons: ['Remote requires line-of-sight sensor contact'],
    createdAt: '2025-01-28'
  },
  {
    id: 'prod-commuter-backpack-beige',
    title: 'ShopLuxe Urban Backpack Beige',
    slug: 'shopluxe-urban-backpack-beige',
    category: 'Fashion',
    type: 'own',
    isShopLuxeExclusive: true,
    price: 64.99,
    originalPrice: 89.99,
    discountBadge: 'HERO PICK',
    rating: 5.0,
    reviewCount: 164,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The iconic hero backpack seen in our showcase. Sculpted in warm eggshell cream with contrast ebony reinforced base, magnetic flap clasps, and plush padded sleeve for up to 16-inch MacBooks.',
    features: [
      'Padded sleeve fits up to 16" laptop with microfiber lining',
      'Water-repellent structured organic twill fabric',
      'Contrast midnight base protects against floor scuffs',
      'Dedicated side pocket fits ShopLuxe insulated bottles',
      'Concealed quick-access zip for metro cards and passport'
    ],
    specs: {
      brand: 'ShopLuxe Atelier',
      model: 'Urban Commuter Edition',
      material: 'Organic Cotton Twill & Full-Grain Vegan Trim',
      dimensions: '44cm x 30cm x 15cm',
      weight: '760 grams',
      warranty: '3-Year Warranty',
      colorOptions: ['Eggshell Beige', 'Onyx Black', 'Slate Olive'],
      origin: 'Designed in New York'
    },
    inStock: true,
    stockQuantity: 34,
    pros: ['Signature minimalist Scandinavian styling', 'Comfortable curved strap ergonomics', 'Reinforced scuff-resistant base'],
    cons: ['Lighter fabric benefits from fabric protector spray'],
    createdAt: '2025-01-05'
  },
  {
    id: 'prod-shopluxe-water-bottle',
    title: 'ShopLuxe Insulated Thermal Flask',
    slug: 'shopluxe-insulated-thermal-flask',
    category: 'Accessories',
    type: 'own',
    isShopLuxeExclusive: true,
    price: 24.99,
    originalPrice: 32.00,
    discountBadge: 'SIGNATURE',
    rating: 4.9,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Our signature minimalist vacuum-insulated water flask. Features double-wall 18/8 food-grade stainless steel that keeps iced drinks cold for 24 hours and piping hot tea for 12 hours.',
    features: [
      'Double-wall vacuum insulation keeps cold 24h / hot 12h',
      'Sweat-proof condensation-free powder coat matte finish',
      '100% leakproof silicone loop cap with easy carry handle',
      'BPA-free, non-toxic and flavor-neutral 18/8 stainless steel',
      'Fits standard automotive cup holders'
    ],
    specs: {
      brand: 'ShopLuxe Gear',
      model: 'HydroFlask 750ml / 25oz',
      material: 'Pro-grade 18/8 Stainless Steel',
      dimensions: 'Height 26cm, Base Diameter 7.2cm',
      weight: '340 grams',
      warranty: 'Lifetime Thermal Performance Guarantee',
      colorOptions: ['Matte Alpine White', 'Midnight Black'],
      origin: 'ShopLuxe Eco Lab'
    },
    inStock: true,
    stockQuantity: 110,
    pros: ['Zero condensation or metallic taste', 'Subtle elegant ShopLuxe typography', 'Easy to clean wide mouth opening'],
    cons: ['Hand washing recommended for powder coat longevity'],
    createdAt: '2025-02-12'
  },
  {
    id: 'prod-sunglasses-classic',
    title: 'Aviator polarized Sunglasses',
    slug: 'aviator-polarized-sunglasses',
    category: 'Accessories',
    type: 'affiliate',
    price: 39.99,
    originalPrice: 59.99,
    discountBadge: '-33%',
    rating: 4.8,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Classic handcrafted tortoise and brushed gold frames featuring TAC polarized UV400 lenses that eliminate water and asphalt glare while maintaining true optical color clarity.',
    features: [
      '100% UV400 protection blocking 99.9% UVA and UVB rays',
      'Triacetate Cellulose (TAC) 9-layer polarized lenses',
      'Corrosion-resistant monel alloy metal frame with acetate temple tips',
      'Soft silicone self-adjusting nose pads for all-day comfort',
      'Includes premium leatherette case and microfiber cloth'
    ],
    specs: {
      brand: 'OpticVibe',
      model: 'Aviator Retro 54mm',
      material: 'Handmade Italian Acetate & Alloy',
      dimensions: 'Lens 54mm, Bridge 18mm, Temple 145mm',
      weight: '26 grams',
      warranty: '2-Year Optical Guarantee',
      colorOptions: ['Tortoise Amber', 'Matte Black', 'Gold Havana'],
      origin: 'Milan, Italy'
    },
    inStock: true,
    affiliateUrl: 'https://www.amazon.com?tag=shopluxe-20',
    affiliateVendor: 'Amazon.com',
    affiliateCommissionNotice: 'Affiliate commission paid by merchant.',
    storeComparisons: [
      { storeName: 'Amazon', price: 39.99, url: 'https://www.amazon.com', inStock: true, badge: 'Prime 1-Day' },
      { storeName: 'Target', price: 44.99, url: 'https://www.target.com', inStock: true }
    ],
    pros: ['Very lightweight on the bridge of the nose', 'Crisp polarization without screen darkening', 'Classic vintage appeal'],
    cons: ['Case is moderately bulky for compact pockets'],
    createdAt: '2025-01-18'
  },
  {
    id: 'prod-over-ear-headphones',
    title: 'Studio Hi-Fi Noise Cancelling Headphones',
    slug: 'studio-hi-fi-noise-cancelling-headphones',
    category: 'Electronics',
    type: 'affiliate',
    price: 189.99,
    originalPrice: 249.99,
    discountBadge: '-24%',
    rating: 4.9,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Engineered for audiophiles. 40mm beryllium-coated dynamic drivers deliver studio reference acoustic resolution, coupled with adaptive hybrid noise cancelling and 60 hours of wireless playback.',
    features: [
      'Hybrid active noise cancellation with 4 ambient mics',
      'High-resolution LDAC and aptX HD wireless codec support',
      'Plush memory foam lambskin-feel ear cushions',
      '60 hours playback on single charge with fast fuel 10-min boost',
      'Multipoint connection switching seamlessly between laptop and phone'
    ],
    specs: {
      brand: 'AcousticLab',
      model: 'Reference ANC 700',
      material: 'Anodized aluminum & memory foam cushions',
      dimensions: '190mm x 165mm x 80mm',
      weight: '252 grams',
      warranty: '2-Year Manufacturer Warranty',
      colorOptions: ['Matte Black', 'Silver Grey', 'Deep Navy'],
      origin: 'Germany'
    },
    inStock: true,
    affiliateUrl: 'https://www.bestbuy.com?aff=shopluxe',
    affiliateVendor: 'Best Buy',
    affiliateCommissionNotice: 'Affiliate commission paid on verified Best Buy orders.',
    storeComparisons: [
      { storeName: 'Best Buy', price: 189.99, url: 'https://www.bestbuy.com', inStock: true, badge: 'Best Deal' },
      { storeName: 'Amazon', price: 199.99, url: 'https://www.amazon.com', inStock: true },
      { storeName: 'Walmart', price: 219.00, url: 'https://www.walmart.com', inStock: true }
    ],
    pros: ['Astounding 60-hour battery life', 'Neutral, balanced studio audio profile', 'Incredible passive and active isolation'],
    cons: ['Earpads can get warm during long summer outdoor sessions'],
    createdAt: '2025-01-12'
  },
  {
    id: 'prod-home-plant',
    title: 'Ceramic Planter with Fiddle Leaf Fig',
    slug: 'ceramic-planter-with-fiddle-leaf-fig',
    category: 'Home & Living',
    type: 'own',
    isShopLuxeExclusive: true,
    price: 34.99,
    originalPrice: 42.00,
    discountBadge: 'ECO FRIENDLY',
    rating: 4.9,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Hand-glazed stoneware ceramic pot with a built-in subterranean drainage saucer. Paired with a lush, healthy nursery-grown Ficus Lyrata plant delivered right to your doorstep.',
    features: [
      'Stoneware clay kiln-fired at 1200°C for durable water resistance',
      'Hidden built-in drainage tray prevents root rot and table marks',
      'Includes premium organic nutrient-rich soil mix',
      'Guaranteed healthy plant arrival policy with 30-day green guarantee',
      'Comes with printed easy-care watering instructions'
    ],
    specs: {
      brand: 'ShopLuxe Living',
      model: 'Artisan Stoneware 8-inch',
      material: 'Natural Terracotta & White Matte Glaze',
      dimensions: 'Pot: 20cm dia x 22cm height, Plant: 40-50cm',
      weight: '2.4 kg (with soil)',
      warranty: '30-Day Healthy Plant Guarantee',
      colorOptions: ['Matte Bone White', 'Terracotta Natural', 'Sage Green'],
      origin: 'Handmade in Oregon, USA'
    },
    inStock: true,
    stockQuantity: 18,
    pros: ['Clean sculptural aesthetic transforms rooms', 'Hidden drainage keeps furniture protected', 'Healthy nursery-fresh specimen'],
    cons: ['Plant needs bright indirect sunlight to thrive'],
    createdAt: '2025-02-04'
  },
  {
    id: 'prod-fashion-shirt',
    title: 'Relaxed Fit Heavyweight Linen Shirt',
    slug: 'relaxed-fit-heavyweight-linen-shirt',
    category: 'Fashion',
    type: 'own',
    isShopLuxeExclusive: true,
    price: 54.99,
    originalPrice: 70.00,
    discountBadge: 'NEW ARRIVAL',
    rating: 4.8,
    reviewCount: 63,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Woven from 100% French Normandy flax linen. Features pre-washed softness that drapes effortlessly, pearl-accented buttons, and an easy camp collar for refined warm-weather elegance.',
    features: [
      '100% Certified French Flax Linen (190 GSM heavyweight drape)',
      'Pre-washed garment enzyme finish eliminates initial stiffness',
      'Natural mother-of-pearl buttons with reinforced cross-stitching',
      'Breathable, moisture-wicking and naturally hypoallergenic',
      'Generous tailored cut looks great tucked or untucked'
    ],
    specs: {
      brand: 'ShopLuxe Atelier',
      model: 'Riviera Camp Shirt',
      material: '100% Normandy Flax Linen',
      dimensions: 'Available in S, M, L, XL, XXL',
      weight: '280 grams',
      warranty: 'Satisfaction guarantee with free exchanges',
      colorOptions: ['Natural Oatmeal', 'French Blue', 'Olive Khaki'],
      origin: 'Woven in Portugal'
    },
    inStock: true,
    stockQuantity: 50,
    pros: ['Gets softer with every single wash', 'Natural cooling texture keeps body fresh in summer', 'Timeless resort look'],
    cons: ['Natural linen wrinkles easily, which is part of its charm'],
    createdAt: '2025-02-14'
  },
  {
    id: 'prod-sports-dumbbells',
    title: 'Cast Iron Hex Dumbbell Pair (20 lbs)',
    slug: 'cast-iron-hex-dumbbell-pair',
    category: 'Sports',
    type: 'affiliate',
    price: 44.99,
    originalPrice: 59.99,
    discountBadge: '-25%',
    rating: 4.9,
    reviewCount: 182,
    image: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Commercial gym-grade hex dumbbells forged with heavy-duty solid cast iron and bonded in shock-absorbing vulcanized rubber to protect floors from noise and impact damage.',
    features: [
      'Ergonomic contoured chrome handle with diamond knurling',
      'Six-sided anti-roll hexagonal heads for safe push-up handles',
      'Heavy-duty virgin rubber coating reduces noise and preserves flooring',
      'Permanent friction-welded head-to-handle construction',
      'Clearly embossed weight markings in pounds and kilograms'
    ],
    specs: {
      brand: 'IronCore Fitness',
      model: 'Hex Pro 20lb Pair',
      material: 'Solid ASTM A48 cast iron & vulcanized rubber',
      dimensions: 'Length 32cm, Hex Diameter 14cm',
      weight: '40 lbs total (2x 20 lbs)',
      warranty: 'Lifetime Structural Warranty',
      colorOptions: ['Matte Black with Chrome'],
      origin: 'USA'
    },
    inStock: true,
    affiliateUrl: 'https://www.amazon.com?tag=shopluxe-20',
    affiliateVendor: 'Amazon.com',
    affiliateCommissionNotice: 'Amazon affiliate purchase.',
    storeComparisons: [
      { storeName: 'Amazon', price: 44.99, url: 'https://www.amazon.com', inStock: true, badge: 'Free Delivery' },
      { storeName: 'Walmart', price: 49.99, url: 'https://www.walmart.com', inStock: true },
      { storeName: 'Target', price: 54.99, url: 'https://www.target.com', inStock: true }
    ],
    pros: ['Hex shape prevents hazardous rolling on gym floors', 'Secure knurled grip even with sweaty hands', 'Odorless cured rubber'],
    cons: ['Heavy to ship if ordering without prime/free shipping'],
    createdAt: '2025-01-22'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-smartwatch-buying-guide',
    title: 'The Ultimate Smartwatch Buyer’s Guide (2025 Edition)',
    slug: 'smartwatch-buyers-guide-2025',
    category: 'Technology',
    author: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Tech & Gear Editor'
    },
    date: 'February 24, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Navigating battery life, display visibility, and health metrics. Here is our comprehensive breakdown of the best wearable watches tested this season.',
    tags: ['Wearables', 'Smartwatch', 'Fitness Tech', 'Buying Guide'],
    featuredProductId: 'prod-smartwatch-9',
    secondaryProductIds: ['prod-wireless-earbuds', 'prod-over-ear-headphones'],
    content: [
      'Choosing the right smartwatch in 2025 comes down to three crucial elements: sensor accuracy, battery endurance, and day-to-day ecosystem convenience. With micro-LED and high-refresh OLED panels becoming standard, the bar for visual fidelity has never been higher.',
      'During our 90-day rigorous testing regimen spanning outdoor sprint intervals, deep sleep monitoring, and high-altitude treks, the Smart Watch Series 9 consistently delivered medical-grade heart rate correlation with zero cadence locks.',
      'If you are an athlete or frequent flyer, the low-power battery reserve allows you to easily squeeze 36 continuous hours of GPS tracking without hunting for a charger before your flight.',
      'Check out our verified price tracker below to grab the steepest current retailer discounts through authorized affiliate partners.'
    ]
  },
  {
    id: 'post-minimalist-travel-essentials',
    title: 'Minimalist Travel Essentials: 5 Gear Staples for One-Bag Travel',
    slug: 'minimalist-travel-essentials-one-bag',
    category: 'Travel & Lifestyle',
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      role: 'Global Nomad & Stylist'
    },
    date: 'March 2, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'How our design team travels light without sacrificing polish, utility, or laptop security across continents.',
    tags: ['Travel', 'Minimalism', 'Packing List', 'Luggage'],
    featuredProductId: 'prod-travel-backpack',
    secondaryProductIds: ['prod-commuter-backpack-beige', 'prod-shopluxe-water-bottle', 'prod-sunglasses-classic'],
    content: [
      'One-bag travel is not an exercise in deprivation; it is a declaration of freedom. Moving through busy train stations or international airport terminals without checking baggage cuts travel friction by half.',
      'The cornerstone of this system is an ergonomically balanced 30L pack like our Travel Backpack Explorer. Its TSA clamshell compartment lets you glide through airport security checkpoints without unpacking your laptop or cables.',
      'Pair this with a double-wall thermal flask that saves hundreds of single-use plastic bottles while keeping ice water frosty even in Mediterranean summer heat.',
      'Below, discover the exact gear kit handpicked by our editors for long journeys and weekend getaways.'
    ]
  },
  {
    id: 'post-curating-peaceful-workspace',
    title: 'Transforming Your Home Workspace into a Sanctuary of Focus',
    slug: 'transforming-home-workspace-sanctuary',
    category: 'Home & Living',
    author: {
      name: 'Julian Hayes',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Interior Architect'
    },
    date: 'March 8, 2025',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'From biophilic greenery to soft lunar diffused lighting, small acoustic and visual shifts that heighten creative productivity.',
    tags: ['Home Office', 'Aesthetic', 'Lighting', 'Productivity'],
    featuredProductId: 'prod-moon-lamp',
    secondaryProductIds: ['prod-home-plant', 'prod-over-ear-headphones'],
    content: [
      'Visual clutter produces cognitive noise. When crafting a home study or creative studio, prioritize soft diffused lighting and natural materials that signal calm to your nervous system.',
      'A warm ambient light source such as the Luminous 3D Moon Lamp provides gentle warm white illumination without casting severe glare onto computer displays.',
      'Incorporate living flora like the nursery-fresh Fiddle Leaf Fig in stoneware ceramic to introduce biophilic calm and purify indoor air quality throughout long working hours.'
    ]
  }
];

export const INITIAL_REVIEWS: Record<string, Review[]> = {
  'prod-smartwatch-9': [
    {
      id: 'rev-1',
      userName: 'David Sterling',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      rating: 5,
      date: 'February 18, 2025',
      title: 'Best fitness upgrade I’ve made this year',
      comment: 'The always-on screen is crystal clear even under intense direct sunlight. ECG and heart rate sensors match my chest strap monitor within 1 beat per minute. Seamless checkout via Amazon affiliate link as well!',
      verifiedPurchase: true,
      helpfulCount: 24
    },
    {
      id: 'rev-2',
      userName: 'Sarah Jenkins',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      rating: 5,
      date: 'February 10, 2025',
      title: 'Flawless design and lightning fast shipping',
      comment: 'Super light on the wrist. I sleep with it every night and the sleep phase tracking has helped me fix my sleep schedule.',
      verifiedPurchase: true,
      helpfulCount: 16
    }
  ],
  'prod-travel-backpack': [
    {
      id: 'rev-3',
      userName: 'Alexander Wright',
      userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
      rating: 5,
      date: 'January 28, 2025',
      title: 'ShopLuxe quality is simply world-class',
      comment: 'I was hesitant about buying direct, but this backpack exceeded expectations. The ballistic nylon feels indestructible, and the TSA clamshell opening saved me so much hassle at JFK airport.',
      verifiedPurchase: true,
      helpfulCount: 38
    }
  ]
};

export const CATEGORIES_LIST = [
  { id: 'Accessories', name: 'Accessories', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80', count: 24 },
  { id: 'Electronics', name: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80', count: 42 },
  { id: 'Home & Living', name: 'Home & Living', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=300&q=80', count: 35 },
  { id: 'Fashion', name: 'Fashion', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80', count: 58 },
  { id: 'Beauty', name: 'Beauty', image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=300&q=80', count: 19 },
  { id: 'Sports', name: 'Sports', image: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&w=300&q=80', count: 27 },
  { id: 'Toys & Games', name: 'Toys & Games', image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=300&q=80', count: 14 },
];
