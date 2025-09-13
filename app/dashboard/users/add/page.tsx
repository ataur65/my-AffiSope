'use client';

import React from 'react';
import Link from 'next/link';
import UserForm, { UserFormData } from '../../../../components/UserForm';
import { useRouter } from 'next/navigation';

const AddUserPage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = (formData: UserFormData) => {
    console.log('New User Data:', formData);
    // In a real application, you would send this data to an API
    // After successful submission, navigate back to the users list
    router.push('/dashboard/users');
  };

  return (
    <main id="adduser-content" className="page-content flex-1 p-4 md:p-8 overflow-y-auto w-full">
      <Link href="/dashboard/users" className="inline-flex items-center text-sm text-custom-text-secondary hover:text-white mb-4">
        <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        Back to Users
      </Link>
      <UserForm onSubmit={handleSubmit} />
    </main>
  );
};

export default AddUserPage;