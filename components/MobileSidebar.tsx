
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image'; // Import Image component
import { signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

interface MenuItem {
  _id: string;
  name: string;
  page: string;
  children?: MenuItem[];
}

interface Category {
  name: string;
  imageUrl: string | null;
}

interface MobileSidebarProps {
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ onClose }) => {
  const pathname = usePathname();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]); // Use any[] for now, can define a more specific interface later
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]); // To manage open/closed state of submenus

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/menuitems`);
        const data = await res.json();
        if (data && data.data) {
          setMenuItems(data.data);
        }
      } catch (error: Error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const toggleSubmenu = (id: string) => {
    setOpenSubmenus(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <aside id="mobile-sidebar" className="w-64 bg-custom-surface flex-shrink-0 p-4 fixed lg:relative lg:translate-x-0 h-full z-20 transform transition-transform duration-300 ease-in-out flex flex-col">
      <div>
        {/* Profile Section */}
        <div className="flex items-center space-x-4 p-2">
          <Image className="h-10 w-10 rounded-full object-cover" src="/img/black-white-bedroom-with-red-accent.jpg" alt="Admin Avatar" width={40} height={40} />
          <div>
            <h2 className="text-md font-semibold text-white">Guest</h2>
            <p className="text-xs text-custom-text-secondary">Welcome</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-custom-text-secondary uppercase tracking-wider">Menu</h3>
          <ul className="mt-3 space-y-1">
            {menuItems.map((item) => (
              <li key={item._id} onClick={handleLinkClick}>
                {item.children && item.children.length > 0 ? (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent closing sidebar when toggling submenu
                        toggleSubmenu(item._id);
                      }}
                      className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-custom-text-secondary hover:bg-custom-hover hover:text-white w-full text-left"
                    >
                      {item.name}
                      <span className="ml-auto">{openSubmenus.includes(item._id) ? '▲' : '▼'}</span>
                    </button>
                    {openSubmenus.includes(item._id) && (
                      <ul className="pl-4 mt-2 space-y-1">
                        {item.children.map((child: MenuItem) => (
                          <li key={child._id} onClick={handleLinkClick}>
                            <Link href={child.page} className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${pathname === child.page ? 'bg-custom-card text-white' : 'text-custom-text-secondary hover:bg-custom-hover hover:text-white'}`}>
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href={item.page} className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${pathname === item.page ? 'bg-custom-card text-white' : 'text-custom-text-secondary hover:bg-custom-hover hover:text-white'}`}>
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MobileSidebar;
