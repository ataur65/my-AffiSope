"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Editor from './Editor'; // Import the new Editor component

export interface ProductFormData {
  title: string;
  category: string;
  brand: string;
  shopDepartment: string;
  price: string;
  stock: string;
  description: string;
  shortDescription: string;
  metaKeywords: string;
  metaDescription: string;
  productImage: string; // Added for the image data URL
  gallery: string[]; // Added for gallery images
  url: string;
}

interface ProductFormProps {
  onSubmit: (formData: ProductFormData) => Promise<boolean>;
  initialData?: Partial<ProductFormData>;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [showNewBrandInput, setShowNewBrandInput] = useState(false);
  const [shopDepartments, setShopDepartments] = useState<string[]>([]);
  const [showNewShopDepartmentInput, setShowNewShopDepartmentInput] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.productImage || null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(initialData?.gallery || []);
  const [description, setDescription] = useState(initialData?.description || '');
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || '');

  const fetchData = async () => {
    try {
      const [categoriesRes, brandsRes, shopDepartmentsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/categories`),
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/brands`),
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/shopDepartments`),
      ]);

      if (!categoriesRes.ok || !brandsRes.ok || !shopDepartmentsRes.ok) {
        throw new Error('Failed to fetch categories, brands or shop departments');
      }

      const categoriesData = await categoriesRes.json();
      const brandsData = await brandsRes.json();
      const shopDepartmentsData = await shopDepartmentsRes.json();

      setCategories(categoriesData);
      setBrands(brandsData);
      setShopDepartments(shopDepartmentsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGalleryFiles(files);

    const newPreviews: string[] = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === files.length) {
          setGalleryPreviews(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = initialData?.productImage || '';
    let finalGalleryUrls = initialData?.gallery || []; // Start with existing gallery URLs

    // Upload main product image
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload`, {
          method: 'POST',
          body: formData,
          headers: {
            'x-filename': imageFile.name,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to upload main image');
        }

        const data = await response.json();
        // Ensure data.urls is an array before accessing [0]
        imageUrl = (data.urls && data.urls.length > 0) ? data.urls[0] : '';
      } catch (error) {
        console.error('Error uploading main image:', error);
        alert('Failed to upload main image. Please try again.');
        return;
      }
    }

    // Upload new gallery images
    if (galleryFiles.length > 0) {
      const formData = new FormData();
      galleryFiles.forEach((file) => {
        formData.append(`galleryFiles`, file, file.name);
      });

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload gallery images');
        }

        const data = await response.json();
        finalGalleryUrls = data.urls || []; // Ensure it's an array, even if data.urls is undefined
      } catch (error) {
        console.error('Error uploading gallery images:', error);
        alert('Failed to upload gallery images. Please try again.');
        return;
      }
    }

    const form = formRef.current;
    if (form) {
      const formData = new FormData(form);
      const productData = {
        title: formData.get('title') as string,
        category: showNewCategoryInput ? formData.get('newCategory') as string : formData.get('category') as string,
        brand: showNewBrandInput ? formData.get('newBrand') as string : formData.get('brand') as string,
        shopDepartment: showNewShopDepartmentInput ? formData.get('newShopDepartment') as string : formData.get('shopDepartment') as string,
        price: formData.get('price') as string,
        stock: formData.get('stock') as string,
        description: description,
        shortDescription: shortDescription,
        metaKeywords: formData.get('metaKeywords') as string,
        metaDescription: formData.get('metaDescription') as string,
        productImage: imageUrl,
        gallery: finalGalleryUrls, // Use the finalGalleryUrls
        url: formData.get('url') as string,
      };

      const success = await onSubmit(productData);
      if (success) {
        fetchData(); // Re-fetch after successful submission
      }
    }
  };

  return (
    <div className="bg-custom-surface rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">{initialData ? 'Edit Product' : 'Add New Product'}</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" name="title" placeholder="title" defaultValue={initialData?.title} className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm" />
          
          {/* Category Selection */}
          {!showNewCategoryInput ? (
            <select 
              name="category" 
              defaultValue={initialData?.category} 
              className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm text-custom-text-secondary"
              onChange={(e) => {
                if (e.target.value === '__addNew__') {
                  setShowNewCategoryInput(true);
                }
              }}
            >
              <option value="">Choose a Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              <option value="__addNew__">+ Add New Category</option>
            </select>
          ) : (
            <input 
              type="text" 
              name="newCategory" 
              placeholder="Enter new category name" 
              className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm"
              onBlur={(e) => {
                if (!e.target.value) {
                  setShowNewCategoryInput(false); // Revert if empty
                }
              }}
            />
          )}

          {/* Brand Selection */}
          {!showNewBrandInput ? (
            <select 
              name="brand" 
              defaultValue={initialData?.brand} 
              className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm text-custom-text-secondary"
              onChange={(e) => {
                if (e.target.value === '__addNew__') {
                  setShowNewBrandInput(true);
                }
              }}
            >
              <option value="">Choose a Brand</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
              <option value="__addNew__">+ Add New Brand</option>
            </select>
          ) : (
            <input 
              type="text" 
              name="newBrand" 
              placeholder="Enter new brand name" 
              className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm"
              onBlur={(e) => {
                if (!e.target.value) {
                  setShowNewBrandInput(false); // Revert if empty
                }
              }}
            />
          )}

          {/* Shop Department Selection */}
          {!showNewShopDepartmentInput ? (
            <select 
              name="shopDepartment" 
              defaultValue={initialData?.shopDepartment} 
              className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm text-custom-text-secondary"
              onChange={(e) => {
                if (e.target.value === '__addNew__') {
                  setShowNewShopDepartmentInput(true);
                }
              }}
            >
              <option value="">Choose a Shop Department</option>
              {shopDepartments.map((dep) => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
              <option value="__addNew__">+ Add New Shop Department</option>
            </select>
          ) : (
            <input 
              type="text" 
              name="newShopDepartment" 
              placeholder="Enter new shop department name" 
              className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm"
              onBlur={(e) => {
                if (!e.target.value) {
                  setShowNewShopDepartmentInput(false); // Revert if empty
                }
              }}
            />
          )}

          <input type="text" name="price" placeholder="price" defaultValue={initialData?.price} className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm" />
          <input type="text" name="stock" placeholder="stock" defaultValue={initialData?.stock} className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm" />
          
          <input type="text" name="url" placeholder="URL" defaultValue={initialData?.url} className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm" />
          <div className="md:col-span-2">
            <label htmlFor="product-image" className="block text-sm font-medium text-custom-text-secondary mb-2">Product Image</label>
            <input type="file" id="product-image" name="productImage" onChange={handleImageChange} className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm text-custom-text-secondary" />
            {imagePreview && (
              <div className="mt-4">
                <Image src={imagePreview} alt="Product image preview" width={200} height={200} className="rounded-lg" />
              </div>
            )}
          </div>
          <div className="md:col-span-2">
            <label htmlFor="gallery-images" className="block text-sm font-medium text-custom-text-secondary mb-2">Gallery Images</label>
            <input type="file" id="gallery-images" name="galleryImages" multiple onChange={handleGalleryChange} className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm text-custom-text-secondary" />
            <div className="mt-4 flex flex-wrap gap-2">
              {galleryPreviews.map((src, index) => (
                <Image key={index} src={src} alt={`Gallery image preview ${index + 1}`} width={100} height={100} className="rounded-lg object-cover" />
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-custom-text-secondary mb-2">Description</label>
            <Editor content={description} onChange={setDescription} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-custom-text-secondary mb-2">Short Description</label>
            <Editor content={shortDescription} onChange={setShortDescription} />
          </div>
          <textarea name="metaKeywords" placeholder="Meta Keywords" rows={3} defaultValue={initialData?.metaKeywords} className="md:col-span-2 w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm"></textarea>
          <textarea name="metaDescription" placeholder="Meta Description" rows={3} defaultValue={initialData?.metaDescription} className="md:col-span-2 w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm"></textarea>
        </div>
        <div className="mt-6">
          <button type="submit" className="w-full bg-custom-accent text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;