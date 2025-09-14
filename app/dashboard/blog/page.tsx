'use client';

import React from 'react';

import SearchInput from '../../../components/SearchInput';
import BlogTable from '../../../components/BlogTable';
import Pagination from '../../../components/Pagination';
import { useRouter } from 'next/navigation';

const BlogPage: React.FC = () => {
  const router = useRouter();

  const handleAddNewBlog = () => {
    router.push('/dashboard/blog/add');
  };

  return (
    <main id="blog-content" className="page-content flex-1 p-4 md:p-8 overflow-y-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <SearchInput placeholder="Search for a blog post" />
        <button
          id="add-new-blog-btn"
          className="w-full md:w-auto bg-custom-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition"
          onClick={handleAddNewBlog}
        >
          Add New
        </button>
      </div>

      {/* Blog Table */}
      <BlogTable />

      <Pagination />
    </main>
  );
};

export default BlogPage;