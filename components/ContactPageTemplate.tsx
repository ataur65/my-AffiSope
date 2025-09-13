import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface ContactPageTemplateProps {
  title?: string;
  heroImage?: string;
  subheading?: string;
  buttonUrl?: string;
  children: React.ReactNode;
}

const ContactPageTemplate: React.FC<ContactPageTemplateProps> = ({ title, heroImage, subheading, buttonUrl, children }) => {
  return (
    <div className="bg-gray-100 antialiased">
      <Header />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${heroImage || '/img/black-and-white-badroom-design-with-green-wall-design-1024x765.jpg'}')`,
          height: '50vh',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-4">{title || "Contact Us"}</h1>
          {subheading && <p className="text-xl mb-8">{subheading}</p>}
          {buttonUrl && (
            <Link href={buttonUrl} className="bg-[#f7931e] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors duration-200">
              Get in Touch
            </Link>
          )}
        </div>
      </section>

      {/* Main Page Container */}
      <div className="container mx-auto p-4 md:p-8 flex justify-center items-center my-16">
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default ContactPageTemplate;
