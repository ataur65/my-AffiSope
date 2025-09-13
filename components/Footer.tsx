"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [settings, setSettings] = useState({
    address: '',
    email: '',
    phone: '',
    openingHours: ''
  });
  const [shopDepartments, setShopDepartments] = useState([]);
  const [footerSettings, setFooterSettings] = useState({
    gallery: [],
    newsletterText: '',
    copyrightText: '',
    clientLogos: [],
  });
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/settings/contact`);
        if (!res.ok) {
          console.error('Failed to fetch contact settings:', res.status, res.statusText);
          return;
        }
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text();
          console.error('Received non-JSON response for contact settings:', text);
          return;
        }
        const data = await res.json();
        console.log('Contact settings data:', data);
        setSettings(data);
      } catch (error) {
        console.error('Error fetching or parsing contact settings:', error);
      }
    };

    const fetchShopDepartments = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/shopDepartments`);
        if (!res.ok) {
          console.error('Failed to fetch shop departments:', res.status, res.statusText);
          return;
        }
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text();
          console.error('Received non-JSON response for shop departments:', text);
          return;
        }
        const data = await res.json();
        console.log('Shop departments data:', data);
        setShopDepartments(data);
      } catch (error) {
        console.error('Error fetching or parsing shop departments:', error);
      }
    };

    const fetchFooterSettings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/settings/footer`);
        if (res.ok) {
          const data = await res.json();
          console.log('Footer settings data:', data);
          setFooterSettings(data);
        }
      } catch (error) {
        console.error('Error fetching footer settings:', error);
      }
    };

    fetchSettings();
    fetchShopDepartments();
    fetchFooterSettings();
  }, []);

  const handleSubscribe = async () => {
    console.log('Subscribing with email:', email);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      console.log('Subscription response:', data);
      if (res.ok) {
        alert(data.message);
        setEmail('');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      alert('An error occurred during subscription.');
    }
  };

  return (
    <footer className="bg-[#1c2431] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact info.</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>{settings.address}</li>
              <li className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.85 7.85a3 3 0 004.24 0L21 8" />
                </svg>
                <Link href={`mailto:${settings.email}`} className="hover:text-white transition-colors">{settings.email}</Link>
              </li>
              <li className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18.75a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.25 10.5a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 21a2.25 2.25 0 01-4.5 0V9a2.25 2.25 0 014.5 0v12z" />
                </svg>
                <span className="font-bold">Contact Us:</span> {settings.phone}
              </li>
            </ul>
          </div>
          {/* Column 2: Shop Departments */}
          <div>
            <h3 className="font-bold text-lg mb-4">Shop Departments</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {shopDepartments.map((department) => (
                <li key={department}>
                  <Link href={`/shop/${department}`} className="hover:text-white transition-colors">
                    &raquo; {department}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Column 3: Photo Gallery */}
          <div>
            <h3 className="font-bold text-lg mb-4">Photo Gallery</h3>
            <div className="grid grid-cols-2 gap-2">
              {footerSettings?.gallery.map((image, index) => (
                image && (
                  <div key={index} className="relative w-full h-24">
                    <Image src={image} alt={`Gallery image ${index + 1}`} layout="fill" objectFit="cover" />
                  </div>
                )
              ))}
            </div>
          </div>
          {/* Column 4: Stay Informed */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stay Informed By Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">{footerSettings?.newsletterText}</p>
            <div className="relative flex items-center mb-6">
              <input type="email" placeholder="Enter your email" className="border focus:border-none w-full px-4 py-3 rounded-lg text-sm text-light-800 focus:outline-none focus:ring-2 focus:ring-[#f7931e]" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button onClick={handleSubscribe} className="absolute right-0 top-0 h-full w-12 flex items-center justify-center bg-[#f7931e] rounded-r-lg hover:bg-orange-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10l-4 4 4 4" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          
          <p className="text-sm text-gray-400 text-center md:text-left">{footerSettings?.copyrightText}</p>
          <div className="flex space-x-2">
            {footerSettings?.clientLogos?.map((logo, index) => (
              logo && (
                <Image key={index} src={logo} alt={`Client logo ${index + 1}`} width={50} height={30} className="h-8 w-auto" objectFit="contain" />
              )
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;