export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  rating: number;
  originalPrice?: number;
  isSale: boolean;
  createdAt: string;
  updatedAt: string;
  url?: string;
  shopDepartment?: string;
  shortDescription?: string;
  reviewCount?: number;
  gallery?: string[];
}

export interface BlogPost {
  _id: string;
  slug: string;
  category: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  author: string;
}