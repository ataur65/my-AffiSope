"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import MobileSidebar from './MobileSidebar'; // Import MobileSidebar
import SocialIcons from './SocialIcons'; // Import SocialIcons

interface Settings {
  headerLogoUrl: string;
  headerLogoText: string;
  showHeaderLogoImage: boolean;
  showHeaderLogoText: boolean;
}

interface SocialLink {
  _id?: string;
  platform: string;
  url: string;
}

interface Category {
  name: string;
  imageUrl: string | null;
}

interface MenuItem {
  _id: string;
  name: string;
  page: string;
  children?: MenuItem[];
}



const Header = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/settings/theme`);
        if (!res.ok) {
          throw new Error('Failed to fetch settings');
        }
        const data = await res.json();
        setSettings(data);
      } catch (error: any) {
        console.error('Error fetching header settings:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err: any) {
        console.error('Error fetching categories:', err);
      }
    };

    const fetchSocialLinks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sociallinks`);
        const data = await res.json();
        if (data && data.data) {
          setSocialLinks(data.data);
        }
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };

    const fetchMenuItems = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/menuitems`);
        const data = await res.json();
        if (data && data.data) {
          setMenuItems(data.data);
        }
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchSettings();
    fetchCategories();
    fetchSocialLinks();
    fetchMenuItems();
  }, []);

  const openMobileSidebar = () => {
    setIsMobileSidebarOpen(true);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <header className="bg-[#1c2431] text-white shadow-lg sticky top-0 z-50">
      {/* Top Header Row */}
      <div className="container mx-auto px-4 py-4 flex flex-wrap flex-col md:flex-row items-center justify-between">
        {/* Mobile Header */}
        <div className="w-full flex justify-between items-center md:hidden mb-4">
            <button onMouseEnter={openMobileSidebar} onMouseLeave={closeMobileSidebar}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <div className="flex items-center space-x-2">
               
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
               {settings &&(
                <div className="flex flex-col items-center">
                    
                    {settings.showHeaderLogoImage && typeof settings.headerLogoUrl === 'string' && settings.headerLogoUrl && (
                            <Image src={settings.headerLogoUrl} alt="Affiliate Logo" width={40} height={40} className="rounded-full" />
                        )}
                        {settings.showHeaderLogoText && settings.headerLogoText && (
                            <span className="text-3xl font-bold">{settings.headerLogoText}</span>
                        )}
                </div>
               )}
            </div>
            <div className="flex items-center hide-on-small-screen">
                <SocialIcons socialLinks={socialLinks} />
            </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between w-full">
            {/* Logo - Aligns left on all screens */}
            
              {loading && <p>Loading...</p>}
              {error && <p>Error: {error}</p>}
                {settings &&(
              <div className="flex items-center space-x-2 flex-shrink-0">
                  {settings.showHeaderLogoImage && typeof settings.headerLogoUrl === 'string' && settings.headerLogoUrl && (
                    <Image src={settings.headerLogoUrl} alt="Affiliate Logo" width={40} height={40} className="rounded-full" />
                        )}
                  {settings.showHeaderLogoText && settings.headerLogoText && (
                  <span className="text-3xl font-bold">{settings.headerLogoText}</span>
                        )}
              </div>
             )}             
            {/* Search Bar - Takes full width on mobile, shrinks on larger screens */}
            <div className="w-full md:w-auto flex-grow md:max-w-xl lg:max-w-2xl mx-auto md:px-4">
              <div className="flex items-center bg-white rounded-md overflow-hidden shadow-sm">
                <select className="px-3 py-2 text-gray-700 bg-gray-200 border-r border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#f7931e]">
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-grow px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f7931e]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
                <button onClick={handleSearch} className="bg-[#f7931e] text-white px-4 py-2 hover:bg-orange-600 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Login & social icon - on the right */}
            <div className="flex items-center space-x-6 text-sm flex-shrink-0 flex-grow justify-end">
              <div className="flex gap-3">
                <SocialIcons socialLinks={socialLinks} />
              </div>

              <Link href="/login" className="flex items-center space-x-2 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300 group-hover:text-white transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
            </div>
        </div>
        <div className="w-full md:hidden">
            {/* Search Bar for mobile */}
            <div className="w-full md:w-auto flex-grow max-w-2xl mx-auto md:px-4">
              <div className="flex items-center bg-white rounded-md overflow-hidden shadow-sm">
                <select className="px-3 py-2 text-gray-700 bg-gray-200 border-r border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#f7931e]">
                  <option value="">{isMobile ? 'All' : 'All Categories'}</option>
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-grow px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f7931e]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
                <button onClick={handleSearch} className="bg-[#f7931e] text-white px-4 py-2 hover:bg-orange-600 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-[#161b24] py-3 text-sm border-t border-gray-700 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center flex-wrap">
          <div className="flex items-center space-x-4 flex-wrap">
            <div className="flex space-x-6 text-gray-300 flex-wrap">
              {menuItems.map((item) => (
                <div key={item._id} className="relative group">
                  <Link href={item.page} className="hover:text-white transition-colors flex items-center">
                    {item.name}
                    {item.children && item.children.length > 0 && (
                      <svg className="h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                  {item.children && item.children.length > 0 && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.children.map(child => (
                        <Link key={child._id} href={child.page} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{child.name}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
         
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 ${isMobileSidebarOpen ? 'block' : 'hidden'}`} onMouseEnter={openMobileSidebar} onMouseLeave={closeMobileSidebar}>
        <div className="fixed inset-0 bg-black opacity-50" onClick={closeMobileSidebar}></div>
        <div className={`relative z-50`}>
          <MobileSidebar onClose={closeMobileSidebar} />
        </div>
      </div>
    </header>
  );
};

export default Header;
