'use client';
import React, { useState } from 'react';
import Editor from './Editor'; // Import the new Editor component

export interface BlogFormData {
  title: string;
  content: string;
  author: string;
  category: string;
  excerpt: string;
  image?: string;
}

interface BlogFormProps {
  onSubmit: (formData: BlogFormData) => void;
  initialData?: BlogFormData;
  categories: string[];
}

const BlogForm: React.FC<BlogFormProps> = ({ onSubmit, initialData, categories }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [content, setContent] = useState(initialData?.content || '');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const form = e.currentTarget as HTMLFormElement;
      let imageUrl = initialData?.image || '';

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload`, {
          method: 'POST',
          body: formData,
          headers: {
            'X-FileName': imageFile.name,
          },
        });

        const responseText = await response.text();

        try {
          const data = JSON.parse(responseText);
          if (data.success) {
            imageUrl = data.urls[0];;
          } else {
            console.error('Image upload failed:', data.message);
          }
        } catch (error) {
          console.error('Error parsing JSON response:', error);
        }
      }

      const blogData: BlogFormData = {
        title: (form.elements.namedItem('title') as HTMLInputElement).value,
        content: content,
        author: (form.elements.namedItem('author') as HTMLInputElement).value,
        category: (form.elements.namedItem('category') as HTMLSelectElement).value,
        excerpt: (form.elements.namedItem('excerpt') as HTMLTextAreaElement).value,
        image: imageUrl,
      };

      onSubmit(blogData);
    } catch (error) {
      console.error('An unexpected error occurred in handleSubmit:', error);
    }
  };

  return (
    <div className="bg-custom-surface rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">{initialData ? 'Edit Blog Post' : 'Add New Blog Post'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" name="title" placeholder="Title" defaultValue={initialData?.title} className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm" />
          <input type="text" name="author" placeholder="Author" defaultValue={initialData?.author} className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm" />
          
          <select name="category" defaultValue={initialData?.category} className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm text-custom-text-secondary">
            <option value="">Choose a Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{
                category
              }</option>
            ))}
          </select>
          <div className="md:col-span-2">
            <label htmlFor="blog-image" className="block text-sm font-medium text-custom-text-secondary mb-2">Blog Image</label>
            <input type="file" id="blog-image" name="image" onChange={handleImageChange} className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm" />
            {initialData?.image && !imageFile && (
              <div className="mt-2">
                <img src={initialData.image} alt="Current blog image" className="w-32 h-32 object-cover rounded-lg" />
              </div>
            )}
          </div>
          <textarea name="excerpt" placeholder="Excerpt" rows={3} defaultValue={initialData?.excerpt} className="md:col-span-2 w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm"></textarea>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-custom-text-secondary mb-2">Content</label>
            <Editor content={content} onChange={setContent} />
          </div>
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

export default BlogForm;