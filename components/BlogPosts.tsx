import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  slug: string;
  category: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

interface BlogPostsProps {
  items: BlogPost[];
}

const BlogPosts: React.FC<BlogPostsProps> = ({ items }) => {
  return (
    <section className="bg-white py-12">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Most Popular Blog Posts</h2>
                <Link href="/blog" className="text-sm font-semibold text-gray-600 hover:text-[#f7931e] transition-colors">View All Blogs</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.slice(0, 3).map((blogPost) => (
                    <div key={blogPost.slug} className="bg-white rounded-lg shadow-lg overflow-hidden relative">
                        <Image src={blogPost.image || './img/placeholder.jpg'} alt={blogPost.title} width={400} height={250} className="w-full h-auto object-cover"/>
                        <div className="blog-date-overlay">
                            <p className="font-bold text-lg">{new Date(blogPost.date).toLocaleDateString(undefined, { day: 'numeric' })}</p>
                            <p className="text-xs font-normal mt-0.5">{new Date(blogPost.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</p>
                        </div>
                        <div className="p-6">
                            <p className="text-xs text-gray-500 font-semibold uppercase mb-1">{blogPost.category}</p>
                            <h3 className="text-xl font-bold mb-2">{blogPost.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">{blogPost.excerpt}</p>
                            <Link href={`/blog/${blogPost.slug}`} className="inline-block bg-[#f7931e] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors">
                                READ MORE
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default BlogPosts;