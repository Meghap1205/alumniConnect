import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/server/job/displayjob', {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          // Display only the latest 3 to 4 jobs
          setJobs(data.slice(0, 4));
        } else {
          console.error('Failed to fetch jobs');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    const fetchEvents = async () => {
        try {
          const response = await fetch('http://localhost:3000/server/event/displayevent');
          const result = await response.json();
          // Display only the latest 2 events
          setEvents(result.event.slice(0, 2));
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
  
      fetchJobs();
      fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative h-[500px] md:h-[700px]">
        <img
          src="home2.jpg"
          alt="College"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl  italic text-center px-4">
            The future belongs to those who believe in the beauty of their dreams.
          </h1>
        </div>
      </div>

      {/* Latest Jobs Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Latest Job Openings</h2>
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No jobs available at the moment.</p>
        )}
      </div>
    

     {/* Latest Events Section */}
     <div className="min-h-screen mt-20 p-5">
     <h2 className="text-3xl font-semibold mb-8 text-center">Upcoming Events</h2>
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
   </div>
 
  );
};

export default Home;
