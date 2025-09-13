"use client";
import React from 'react';

export interface UserFormData {
  username: string;
  email: string;
  password?: string;
  phone: string;
  isAdmin: boolean;
  isActive: boolean;
  address: string;
}

interface UserFormProps {
  onSubmit: (formData: UserFormData) => void;
  initialData?: UserFormData;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gather form data and pass to onSubmit
    const formData = {
      username: ((e.currentTarget as HTMLFormElement).elements.namedItem('username') as HTMLInputElement).value,
      email: ((e.currentTarget as HTMLFormElement).elements.namedItem('email') as HTMLInputElement).value,
      password: ((e.currentTarget as HTMLFormElement).elements.namedItem('password') as HTMLInputElement).value,
      phone: ((e.currentTarget as HTMLFormElement).elements.namedItem('phone') as HTMLInputElement).value,
      isAdmin: ((e.currentTarget as HTMLFormElement).elements.namedItem('isAdmin') as HTMLSelectElement).value === 'true',
      isActive: ((e.currentTarget as HTMLFormElement).elements.namedItem('isActive') as HTMLSelectElement).value === 'true',
      address: ((e.currentTarget as HTMLFormElement).elements.namedItem('address') as HTMLTextAreaElement).value,
    };
    onSubmit(formData);
  };

  return (
    <div className="bg-custom-surface rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">{initialData ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" name="username" placeholder="Username" defaultValue={initialData?.username} className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm" />
          <input type="email" name="email" placeholder="Email" defaultValue={initialData?.email} className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm" />
          <input type="password" name="password" placeholder="Password" defaultValue={initialData?.password} className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm" />
          <input type="text" name="phone" placeholder="Phone" defaultValue={initialData?.phone} className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm" />
          <select name="isAdmin" defaultValue={initialData?.isAdmin ? 'true' : 'false'} className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm text-custom-text-secondary">
            <option value="">Is Admin?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <select name="isActive" defaultValue={initialData?.isActive ? 'true' : 'false'} className="w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm text-custom-text-secondary">
            <option value="">Is Active?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <textarea name="address" placeholder="Address" rows={3} defaultValue={initialData?.address} className="md:col-span-2 w-full bg-custom-card rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-accent text-sm"></textarea>
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

export default UserForm;
