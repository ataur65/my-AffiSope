import { MetadataRoute } from 'next'

const URL = 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/products',
    '/contact',
    '/login',
    '/blog',
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date(),
  }));

  // Fetch dynamic product routes
  const productsRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?limit=1000`);
  const productsData = await productsRes.json();
  const productUrls = productsData.products.map((product: any) => ({
    url: `${URL}/product/${product._id}`,
    lastModified: product.updatedAt || new Date(),
  }));

  // Fetch dynamic blog routes
  const blogsRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog?limit=1000`);
  const blogsData = await blogsRes.json();
  const blogUrls = blogsData.blogPosts.map((post: any) => ({
    url: `${URL}/blog/${post.slug}`,
    lastModified: post.date || new Date(),
  }));

  return [...staticUrls, ...productUrls, ...blogUrls];
}
