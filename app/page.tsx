"use client"

import { useEffect, useState } from 'react';

interface Product {
  _id: string;
  category: string;
  name: string;
  price: string;
  image: string;
  rating: number;
  originalPrice: string | null;
  isSale: boolean;
  url: string;
  shopDepartment?: string;
  brand?: string;
}

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  date: string;
}

import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import IconSection from "../components/IconSection";
import TopCategories from "../components/TopCategories";
import MegaDiscounts from "../components/MegaDiscounts";
import BannersClients from "../components/BannersClients";
import HandpickedItems from "../components/HandpickedItems";
import NewArrivals from "../components/NewArrivals"; // Renamed component
import ShopDepartmentProducts from "../components/ShopDepartmentProducts";
import BlogPosts from "../components/BlogPosts";

import Footer from "../components/Footer";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [topViewedProducts, setTopViewedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: { products: Product[]; currentPage: number; totalPages: number; totalProducts: number } = await response.json();
        setProducts(data.products);
      } catch (error: Error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchNewArrivals = async () => {
      try {
        console.log('Fetching new arrivals...');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/new-arrivals`);
        console.log('New Arrivals response OK:', response.ok);
        if (!response.ok) {
          throw new Error('Failed to fetch new arrivals');
        }
        const data = await response.json();
        console.log('New Arrivals API response data:', data);
        setNewArrivals(data);
      } catch (error: Error) {
        console.error('Error fetching new arrivals:', error);
      }
    };

    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/recent`); // Fetch only recent blog posts
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setBlogPosts(data);
      } catch (error: Error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    const fetchTopViewedProducts = async () => {
      try {
        console.log('Fetching top viewed products...');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/top-viewed`);
        console.log('Top Viewed Products response OK:', response.ok);
        if (!response.ok) {
          console.error('Failed to fetch top viewed products:', response.status, response.statusText);
          throw new Error('Failed to fetch top viewed products');
        }
        const data = await response.json();
        console.log('Top Viewed Products API response data:', data);
        setTopViewedProducts(data);
      } catch (error: Error) {
        console.error('Error fetching top viewed products:', error);
      }
    };

    fetchProducts();
    fetchNewArrivals();
    fetchBlogPosts();
    fetchTopViewedProducts();
  }, []);

  return (
    <div className="bg-gray-100 antialiased">    
    <Header/>
    <HeroSection />
    <IconSection />

    <TopCategories />

    <MegaDiscounts />
    
    <BannersClients />

    
    <HandpickedItems items={topViewedProducts}/>

    <NewArrivals items={newArrivals} /> {/* Pass newArrivals to the NewArrivals component */}

        {products && products.length > 0 && Array.from(new Set(products.map(p => p.shopDepartment).filter(p => p))).map(department => (
        <ShopDepartmentProducts key={department} items={products.filter(p => p.shopDepartment === department)} departmentName={department} />
    ))}

    <BlogPosts items={blogPosts} />

    <Footer />
   </div>
)
}
