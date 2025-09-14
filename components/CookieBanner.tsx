'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = getCookie('local_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie('local_consent', 'true', 365);
    setShowBanner(false);
  };

  const handleDecline = () => {
    setCookie('local_consent', 'false', 365);
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm mb-4 md:mb-0 md:mr-4">
          We use cookies to enhance your browsing experience and analyze our traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies. 
          <Link href="/privacy-policy" className="underline hover:text-gray-300 ml-1">
            Learn more
          </Link>.
        </p>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleDecline} 
            className="px-4 py-2 text-sm font-medium rounded-md bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
          >
            Decline
          </button>
          <button 
            onClick={handleAccept} 
            className="px-4 py-2 text-sm font-medium rounded-md bg-[#f7931e] hover:bg-orange-600 transition-colors duration-200"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper functions for cookies
function setCookie(name: string, value: string, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name: string) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i=0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export default CookieBanner;
