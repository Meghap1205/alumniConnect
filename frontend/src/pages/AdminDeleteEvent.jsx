import { useEffect, useState } from 'react';

const AdminDeleteEvent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/server/event/displayevent');
        const result = await response.json();
        setEvents(result.event);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const deleteEvent = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/server/event/deleteevent/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEvents(events.filter((event) => event._id !== id));
        console.log('Event deleted successfully');
      } else {
        console.error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="min-h-screen mt-20 p-5">
      <h1 className="text-2xl font-bold mb-5">Events</h1>
      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event._id}>
              <div className="bg-white border-2 rounded-lg p-6  border-custom-blue">
                <div className="flex flex-row">
                  <div className="w-1/4 flex flex-col items-center justify-center bg-gray-100 p-3">
                    <p className="text-xl font-semibold text-gray-800 mb-2">{new Date(event.date).toLocaleString('en-US', { month: 'long', day: 'numeric' })}</p>
                    <p className="text-gray-700">{event.location}</p>
                  </div>
                  <div className="w-3/4 pl-5">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.eventName}</h2>
                    <p className="text-gray-600 mb-2">Time: {event.time}</p>
                    <p className="text-gray-600 mb-2">Organized By: {event.organizedBy}</p>
                    <p className="text-gray-600 mb-2">Contact Number: {event.contactNo}</p>
                    <p className="text-gray-600 mb-2">Description: {event.description}</p>
                  </div>
                  <button
                      onClick={() => deleteEvent(event._id)}
                      className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 h-10"
                    >
                      Delete
                    </button>
                </div>
                
              </div>
            </li>
          ))}
          
                    
                  
        </ul>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default AdminDeleteEvent;
