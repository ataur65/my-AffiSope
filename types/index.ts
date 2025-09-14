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