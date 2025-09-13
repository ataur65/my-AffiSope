'use client';

import { useState, useEffect } from 'react';
import SettingsForm from '@/components/SettingsForm';

const ContactSettingsPage = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      const res = await fetch('/api/settings/contact');
      const data = await res.json();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  const fields = [
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone', type: 'text' },
    { name: 'formTitle', label: 'Form Title', type: 'text' },
  ];

  const handleSubmit = async (newSettings) => {
    await fetch('/api/settings/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSettings),
    });
    setSettings(newSettings);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Contact Page Settings</h1>
      <SettingsForm fields={fields} data={settings} onSubmit={handleSubmit} />
    </div>
  );
};

export default ContactSettingsPage;
