// Sample watch data for LuxeMark Watches
export const watchesData = [
  {
    id: 1,
    name: "LuxeMark Prestige Gold",
    brand: "LuxeMark",
    price: 2499,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "luxury",
    description: "Exquisite 18k gold-plated timepiece with precision Swiss movement. Features sapphire crystal glass and water resistance up to 100m.",
    features: ["Swiss Movement", "18k Gold Plated", "Sapphire Crystal", "Water Resistant"],
    inStock: true,
    rating: 4.8,
    reviews: 127
  },
  {
    id: 2,
    name: "LuxeMark Sport Elite",
    brand: "LuxeMark",
    price: 1799,
    originalPrice: 2199,
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "sport",
    description: "Dynamic sports watch with titanium case and advanced chronograph functionality. Perfect for the active lifestyle.",
    features: ["Titanium Case", "Chronograph", "GPS Tracking", "200m Water Resistant"],
    inStock: true,
    rating: 4.7,
    reviews: 89
  },
  {
    id: 3,
    name: "LuxeMark Classic Rose",
    brand: "LuxeMark",
    price: 1299,
    originalPrice: 1599,
    image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "classic",
    description: "Elegant rose gold timepiece with leather strap. Timeless design meets modern craftsmanship.",
    features: ["Rose Gold Finish", "Genuine Leather", "Automatic Movement", "Scratch Resistant"],
    inStock: true,
    rating: 4.9,
    reviews: 203
  },
  {
    id: 4,
    name: "LuxeMark Diamond Elite",
    brand: "LuxeMark",
    price: 3999,
    originalPrice: 4799,
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "luxury",
    description: "Premium luxury watch adorned with genuine diamonds. The epitome of sophistication and elegance.",
    features: ["Genuine Diamonds", "Platinum Case", "Swiss Automatic", "Limited Edition"],
    inStock: false,
    rating: 5.0,
    reviews: 45
  },
  {
    id: 5,
    name: "LuxeMark Urban Steel",
    brand: "LuxeMark",
    price: 899,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "modern",
    description: "Contemporary stainless steel design with minimalist aesthetics. Perfect for the modern professional.",
    features: ["Stainless Steel", "Minimalist Design", "Quartz Movement", "Date Display"],
    inStock: true,
    rating: 4.6,
    reviews: 156
  },
  {
    id: 6,
    name: "LuxeMark Heritage Brown",
    brand: "LuxeMark",
    price: 1599,
    originalPrice: 1899,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "vintage",
    description: "Vintage-inspired design with rich brown leather and antique bronze finish. Classic elegance redefined.",
    features: ["Antique Bronze", "Handcrafted Leather", "Vintage Design", "Manual Wind"],
    inStock: true,
    rating: 4.7,
    reviews: 98
  },
  {
    id: 7,
    name: "LuxeMark Tech Smart",
    brand: "LuxeMark",
    price: 2199,
    originalPrice: 2599,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "smart",
    description: "Revolutionary smartwatch combining traditional luxury with cutting-edge technology.",
    features: ["Smart Functions", "Heart Rate Monitor", "Bluetooth 5.0", "48h Battery"],
    inStock: true,
    rating: 4.5,
    reviews: 267
  },
  {
    id: 8,
    name: "LuxeMark Lady Pearl",
    brand: "LuxeMark",
    price: 1899,
    originalPrice: 2299,
    image: "https://images.unsplash.com/photo-1607734834519-d8576ae60ea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "ladies",
    description: "Delicate feminine design featuring mother-of-pearl dial and elegant proportions.",
    features: ["Mother-of-Pearl Dial", "Diamonds", "Swiss Quartz", "Elegant Design"],
    inStock: true,
    rating: 4.8,
    reviews: 134
  }
];

export const categories = [
  { id: 'all', name: 'All Watches', count: watchesData.length },
  { id: 'luxury', name: 'Luxury', count: watchesData.filter(w => w.category === 'luxury').length },
  { id: 'sport', name: 'Sport', count: watchesData.filter(w => w.category === 'sport').length },
  { id: 'classic', name: 'Classic', count: watchesData.filter(w => w.category === 'classic').length },
  { id: 'modern', name: 'Modern', count: watchesData.filter(w => w.category === 'modern').length },
  { id: 'vintage', name: 'Vintage', count: watchesData.filter(w => w.category === 'vintage').length },
  { id: 'smart', name: 'Smart', count: watchesData.filter(w => w.category === 'smart').length },
  { id: 'ladies', name: 'Ladies', count: watchesData.filter(w => w.category === 'ladies').length }
];

export const featuredWatches = watchesData.filter(watch => [1, 3, 7].includes(watch.id));