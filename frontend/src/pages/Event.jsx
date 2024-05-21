import  { useEffect, useState } from 'react';

const DisplayEvents = () => {
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

  return (
    <div className="min-h-screen mt-20 p-5">
      <h1 className="text-2xl font-bold mb-5">Events</h1>
      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event._id}>
              <div className="bg-white border-2 rounded-lg p-6 mb-4 border-custom-blue">
                <div className="flex flex-row">
                  <div className="w-1/4 flex flex-col items-center justify-center bg-gray-100 p-3">
                    <p className="text-xl font-semibold">{new Date(event.date).toLocaleString('en-US', { month: 'long', day: 'numeric' })}</p>
                    <p className="text-gray-700">{event.location}</p>
                  </div>
                  <div className="w-3/4 pl-5">
                    <h2 className="text-xl font-semibold">{event.eventName}</h2>
                    <p><span className="font-bold">Time:</span> {event.time}</p>
                    <p><span className="font-bold">Organized By:</span> {event.organizedBy}</p>
                    <p><span className="font-bold">Contact Number:</span> {event.contactNo}</p>
                    <p><span className="font-bold">Description:</span> {event.description}</p>
                  </div>
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

export default DisplayEvents;
