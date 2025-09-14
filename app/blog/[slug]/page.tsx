import Link from 'next/link';
import Image from 'next/image';
import BlogPageTemplate from '@/components/BlogPageTemplate';
import HandpickedItems from '@/components/HandpickedItems';
import { Product } from '@/types';


interface BlogPost {

// --- DATA FETCHING FUNCTIONS ---
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/${slug}`, { cache: 'no-store' });
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

async function getBlogCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/categories`, { cache: 'no-store' });
    if (!response.ok) {
      return [];
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return [];
  }
}

async function getRecentBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/recent`, { cache: 'no-store' });
    if (!response.ok) {
      return [];
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching recent blog posts:', error);
    return [];
  }
}

async function getBlogPosts(): Promise<BlogPost[]> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog?limit=1000`, { cache: 'no-store' });
      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      return data.blogPosts;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
}

async function getTopViewedProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/top-viewed`, { cache: 'no-store' });
    if (!response.ok) {
      return [];
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching top viewed products:', error);
    return [];
  }
}


export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'This blog post does not exist.',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    // Ensure posts is an array before mapping
    if (!Array.isArray(posts)) {
        return [];
    }
    return posts.map((post) => ({
      slug: post.slug,
    }));
}


// --- PAGE COMPONENT (CORRECTED) ---
export default async function SingleBlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // PERFORMANCE: Fetch all data in parallel
  const [blogPost, categories, recentPosts, topViewedProducts] = await Promise.all([
    getBlogPost(slug),
    getBlogCategories(),
    getRecentBlogPosts(),
    getTopViewedProducts(),
  ]);

  if (!blogPost) {
    return <div>Blog post not found</div>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blogPost.title,
    "image": `http://localhost:3000${blogPost.image}`,
    "author": {
      "@type": "Person",
      "name": blogPost.author || "Admin"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Your Brand Name",
      "logo": {
        "@type": "ImageObject",
        "url": "http://localhost:3000/logo.png"
      }
    },
    "datePublished": blogPost.date,
    "description": blogPost.excerpt
  };

  return (
    <BlogPageTemplate>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
              <input type="text" placeholder="Search..." className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Blog Categories</h2>
              <ul className="space-y-2 text-gray-700">
                {categories.map((category) => (
                  <li key={category}>
                    <Link href={`/blog/category/${category}`} className="block p-2 rounded-lg hover:bg-gray-100 transition-colors">{category}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Recent posts</h2>
              <ul className="space-y-4 text-gray-700">
                  {recentPosts.map((post) => (
                    <li key={post.slug} className="flex items-center gap-3">
                      <Image src={typeof post.image === 'string' && post.image ? post.image : '/img/placeholder.jpg'} alt={post.title} width={64} height={64} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                        <h4 className="text-sm font-medium"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h4>
                        <p className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>

          <main className="md:w-3/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
              <Image src={typeof blogPost.image === 'string' && blogPost.image ? blogPost.image : '/img/placeholder.jpg'} alt={blogPost.title} width={800} height={450} className="w-full h-auto object-cover mb-6" />
              <p className="text-sm text-gray-500 mb-2">{new Date(blogPost.date).toLocaleDateString()}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{blogPost.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
            </div>
          </main>
        </div>
        <HandpickedItems items={topViewedProducts} />
    </BlogPageTemplate>
  );
}
