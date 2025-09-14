import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FashionProduct {
  _id: string;
  category: string;
  name: string;
  price: string;
  image: string;
  rating: number;
  originalPrice: string | null;
  isSale: boolean;
  brand: string; // Added brand property
  shopDepartment: string;
  url: string;
}



const TrendingFashionItems = ({ items }) => {
  const [activeFashionCategory, setActiveFashionCategory] = useState('All');
  const [activeBrand, setActiveBrand] = useState('All'); // New state for active brand
  const [filteredFashionProducts, setFilteredFashionProducts] = useState<FashionProduct[]>([]);

  useEffect(() => {
    let products = items;
    if (activeFashionCategory !== 'All') {
      products = products.filter(product => product.category === activeFashionCategory);
    }
    if (activeBrand !== 'All') {
      products = products.filter(product => product.brand === activeBrand);
    }
    setFilteredFashionProducts(products);
  }, [activeFashionCategory, activeBrand, items]);

  

  const handleFashionTabClick = (category: string) => {
    setActiveFashionCategory(category);
    setActiveBrand('All'); // Reset brand filter when category changes
  };

  const handleBrandTabClick = (brand: string) => { // New handler for brand clicks
    setActiveBrand(brand);
    setActiveFashionCategory('All'); // Reset category filter when brand changes
  };

    const uniqueBrands = items && Array.from(new Set(items.map(product => product.brand).filter(p => p))); // Get unique brands
    const uniqueCategories = items && Array.from(new Set(items.map(product => product.category).filter(p => p))); // Get unique categories

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        

        {/* New Category Filter Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h3 className="text-xl font-bold mb-4 md:mb-0">Shop by Category</h3>
          <div className="flex space-x-4 text-sm md:text-base">
            <button
              className={`tab-fashion-button ${activeFashionCategory === 'All' ? 'active text-[#f7931e]' : 'text-gray-600 hover:text-[#f7931e]'}`}
              onClick={() => handleFashionTabClick('All')}
            >
              ALL CATEGORIES
            </button>
            {uniqueCategories.map((category) => (
              <button
                key={category}
                className={`tab-fashion-button ${activeFashionCategory === category ? 'active text-[#f7931e]' : 'text-gray-600 hover:text-[#f7931e]'}`}
                onClick={() => handleFashionTabClick(category)}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* New Brand Filter Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h3 className="text-xl font-bold mb-4 md:mb-0">Our Top Brand</h3>
          <div className="flex space-x-4 text-sm md:text-base">
            <button
              className={`tab-fashion-button ${activeBrand === 'All' ? 'active text-[#f7931e]' : 'text-gray-600 hover:text-[#f7931e]'}`}
              onClick={() => handleBrandTabClick('All')}
            >
              ALL BRANDS
            </button>
            {uniqueBrands.map((brand) => (
              <button
                key={brand}
                className={`tab-fashion-button ${activeBrand === brand ? 'active text-[#f7931e]' : 'text-gray-600 hover:text-[#f7931e]'}`}
                onClick={() => handleBrandTabClick(brand)}
              >
                {brand.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div id="fashion-product-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredFashionProducts && filteredFashionProducts.map((product, index) => (
            <div key={`${product._id}-${index}`} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center group relative">
              {product.isSale && (
                <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                  SALE!
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {product.url && (
                  <a href={product.url} target="_blank" rel="noopener noreferrer" className="bg-[#f7931e] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-orange-600 transition-colors">
                    Buy Now
                  </a>
                )}
                <Link href={`/product/${product._id}`} className="bg-gray-700 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-600 transition-colors">
                  Details
                </Link>
              </div>
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white cursor-pointer hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <Image src={product.image || '/img/placeholder.jpg'} alt={product.name} width={200} height={200} className="mb-4 rounded-lg" />
              <div className="w-full">
                <p className="text-xs text-gray-500 font-semibold mb-1">{product.brand}</p> {/* Display brand */}
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                  ))}
                </div>
                {product.originalPrice && (
                  <p className="text-gray-400 line-through text-sm font-medium">${product.originalPrice}</p>
                )}
                <p className="text-red-600 font-bold text-xl">${product.price}</p>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2">{product.category.toUpperCase()}</span> {/* Category as tag */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingFashionItems;
