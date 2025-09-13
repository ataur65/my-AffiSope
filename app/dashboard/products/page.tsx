'use client';

import React from 'react';
import Link from 'next/link';
import SearchInput from '../../../components/SearchInput';
import ProductsTable from '../../../components/ProductsTable';
import Pagination from '../../../components/Pagination';
import { useRouter } from 'next/navigation';

const ProductsPage: React.FC = () => {
  const router = useRouter();

  const handleAddNewProduct = () => {
    router.push('/dashboard/products/add');
  };

  return (
    <main id="products-content" className="page-content flex-1 p-4 md:p-8 overflow-y-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <SearchInput placeholder="Search for a product" />
        <button
          id="add-new-product-btn"
          className="w-full md:w-auto bg-custom-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition"
          onClick={handleAddNewProduct}
        >
          Add New
        </button>
      </div>

      {/* Products Table */}
      <ProductsTable />

      <Pagination />
    </main>
  );
};

export default ProductsPage;