import React from 'react';

const IconSection = () => {
  return (
    <section className="bg-white py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-gray-600">
            {/* Payment & Delivery */}
            <div className="flex flex-col items-center text-center my-4 md:my-0 md:w-1/4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-6 6l6-6m-6 6v6m6-6v6" />
                </svg>
                <h3 className="font-bold text-lg mb-1">Payment & Delivery</h3>
                <p className="text-sm">Shipping for order over $99</p>
            </div>
            {/* Return & Refund */}
            <div className="flex flex-col items-center text-center my-4 md:my-0 md:w-1/4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.657 0 3 1.343 3 3v2a3 3 0 01-3 3m0-6V5" />
                </svg>
                <h3 className="font-bold text-lg mb-1">Return & Refund</h3>
                <p className="text-sm">100% Money Back Guarantee</p>
            </div>
            {/* Quality Support */}
            <div className="flex flex-col items-center text-center my-4 md:my-0 md:w-1/4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10V8m8 2V8m-4 12v-2" />
                </svg>
                <h3 className="font-bold text-lg mb-1">Quality Support</h3>
                <p className="text-sm">Always Online Feedback 24/7</p>
            </div>
            {/* Join Our Newsletter */}
            <div className="flex flex-col items-center text-center my-4 md:my-0 md:w-1/4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.85 7.85a3 3 0 004.24 0L21 8" />
                </svg>
                <h3 className="font-bold text-lg mb-1">Join Our Newsletter</h3>
                <p className="text-sm">20% Flate By Subscribing Us</p>
            </div>
        </div>
    </section>
  );
};

export default IconSection;
