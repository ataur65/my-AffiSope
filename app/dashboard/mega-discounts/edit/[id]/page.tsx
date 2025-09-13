'use client';
import React, { useState, useEffect } from 'react';
import MegaDiscountForm from '@/components/MegaDiscountForm';

const EditMegaDiscountPage = ({ params }) => {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = params;

  useEffect(() => {
    const fetchMegaDiscount = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mega-discounts/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch mega discount');
        }
        const data = await response.json();
        setInitialData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMegaDiscount();
    }
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mega-discounts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update mega discount');
      }

      // Redirect to the mega discounts list page
      window.location.href = '/dashboard/mega-discounts';
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Mega Discount</h1>
      {initialData && <MegaDiscountForm onSubmit={handleSubmit} initialData={initialData} />}
    </div>
  );
};

export default EditMegaDiscountPage;
