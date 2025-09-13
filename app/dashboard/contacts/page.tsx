'use client';

import { useEffect, useState } from 'react';
import Table from '@/components/Table';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contacts`);
        if (!res.ok) {
          console.error('Failed to fetch contact submissions:', res.status, res.statusText);
          setContacts([]); // Set to empty array on failure
          return;
        }
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text();
          console.error('Received non-JSON response for contact submissions:', text);
          setContacts([]); // Set to empty array on non-JSON response
          return;
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setContacts(data);
        } else {
          console.error('Received non-array data for contact submissions:', data);
          setContacts([]);
        }
      } catch (error) {
        console.error('Error fetching or parsing contact submissions:', error);
        setContacts([]); // Set to empty array on error
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contacts/${id}`, {
        method: 'DELETE',
      });
      console.log('Raw response from delete API:', res);
      if (res.ok) {
        setContacts(contacts.filter((contact) => contact._id !== id));
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('An error occurred while deleting the contact.');
    }
  };

  const handleView = (message) => {
    setSelectedMessage(message);
  };

  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Message', accessor: 'message' },
    { Header: 'Date', accessor: 'createdAt' },
  ];

  const actions = [
    { name: 'View', onClick: handleView },
    { name: 'Delete', onClick: (row) => handleDelete(row._id) },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Contact Submissions</h1>
      {Array.isArray(contacts) && <Table columns={columns} data={contacts} actions={actions} />}

      {selectedMessage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Message Details</h3>
            <p><strong>Name:</strong> {selectedMessage.name}</p>
            <p><strong>Email:</strong> {selectedMessage.email}</p>
            <p><strong>Message:</strong> {selectedMessage.message}</p>
            <div className="mt-4 flex justify-end">
              <button onClick={() => setSelectedMessage(null)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
