import { useState, useEffect } from 'react';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:3000/server/contact/displaycontact');
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
      const response = await fetch(`http://localhost:3000/server/contact/deletecontact/${id}`, {
        method: 'DELETE',
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
    <div className="min-h-screen mt-20 p-5">
      <h1 className="text-2xl font-bold mb-5">Contact List</h1>
      {contacts.length > 0 ? (
        <ul className="space-y-4">
          {contacts.map(contact => (
            <li key={contact._id} className="bg-white border-2 rounded-lg p-6 mb-4 border-custom-blue">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{contact.name}</h2>
                  <p>Email: {contact.email}</p>
                  <p>Phone: {contact.phoneNo}</p>
                  <p>Issue: {contact.issueDescription}</p>
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
