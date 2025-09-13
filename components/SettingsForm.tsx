'use client';

import { useState, useEffect } from 'react';

const SettingsForm = ({ fields, data, onSubmit }) => {
  const [formData, setFormData] = useState(() => {
    const initialData = {};
    fields.forEach(field => {
      initialData[field.name] = data[field.name] || '';
    });
    return initialData;
  });

  useEffect(() => {
    const updatedData = {};
    fields.forEach(field => {
      updatedData[field.name] = data[field.name] || '';
    });
    setFormData(updatedData);
  }, [data, fields]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Array.isArray(fields) && fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            id={field.name}
            value={formData ? formData[field.name] || '' : ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      ))}
      <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Save
      </button>
    </form>
  );
};

export default SettingsForm;
