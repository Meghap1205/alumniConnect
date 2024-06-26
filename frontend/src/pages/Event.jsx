import React, { useEffect, useState } from 'react';

export default function DisplayEvents () {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://connect-alumni-backend.vercel.app/server/event/getevents', {
          credentials: 'include',
        });
        const result = await response.json();
        setEvents(result.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen mt-20 p-5 ">
      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event._id}>
              <div className=" border-2 rounded-lg p-6  border-custom-blue dark:text-white">
                <div className="flex flex-row">
                  <div className="w-1/4 flex flex-col items-center justify-center  p-3">
                    <p className="text-xl font-semibold  mb-2">{new Date(event.date).toLocaleString('en-US', { month: 'long', day: 'numeric' })}</p>
                    <p className="">{event.location}</p>
                  </div>
                  <div className="w-3/4 pl-5">
                    <h2 className="text-xl font-semibold  mb-2">{event.eventName}</h2>
                    <p className=" mb-2">Time: {event.time}</p>
                    <p className=" mb-2">Organized By: {event.organizedBy}</p>
                    <p className="mb-2">Contact Number: {event.contactNo}</p>
                    <p className=" mb-2">Description: {event.description}</p>
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
