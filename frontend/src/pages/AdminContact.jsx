import { useState, useEffect } from 'react';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('https://connect-alumni-backend.vercel.app/server/contact/displaycontact', {credentials: 'include',});
        const data = await response.json();
        setContacts(data.contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://connect-alumni-backend.vercel.app/server/contact/deletecontact/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setContacts(contacts.filter(contact => contact._id !== id));
      } else {
        console.error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-3 w-full">
      <h1 className="text-2xl font-bold mb-5">Contact List</h1>
      {contacts.length > 0 ? (
        <ul className="space-y-4">
          {contacts.map(contact => (
            <li key={contact._id} className="bg-white border-2 rounded-lg p-6 mb-4 border-custom-blue">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{contact.name}</h2>
                  <p className="text-gray-600 mb-2">Email: {contact.email}</p>
                  <p className="text-gray-600 mb-2">Phone: {contact.phoneNo}</p>
                  <p className="text-gray-600 mb-2">Issue: {contact.issueDescription}</p>
                </div>
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="bg-red-500 text-white rounded-md py-2 px-4 hover:bg-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No contacts available.</p>
      )}
    </div>
  );
};

export default ContactList;

