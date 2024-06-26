import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { Carousel } from "flowbite-react";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${window.location.origin}/server/job/displayjob`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
    
          setJobs(data.slice(0, 3));
        } else {
          console.error('Failed to fetch jobs');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    const fetchEvents = async () => {
        try {
          const response = await fetch('/server/event/getevents');
          const result = await response.json();
        
          if (response.ok) {
            setEvents(result.events);
            if (data.events.length < 3) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
  
      fetchJobs();
      fetchEvents();
  }, []);

  const handleShowMore = async () => {
    const startIndex = events.length;
    try {
      const response = await fetch(`/server/event/getevents?startIndex=${startIndex}`);
      const data = await response.json();
      if (response.ok) {
        setEvents((prev) => [...prev, ...data.events]);
        if (data.events.length < 3) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log('Error fetching more events:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="h-80 sm:h-96 xl:h-[500px] 2xl:h-[600px] p-0.5">
        <Carousel>
          <img src="https://cdn.pixabay.com/photo/2018/01/18/09/13/book-3089857_640.jpg" alt="..." className='object-cover'/>
          <img src="https://cdn.pixabay.com/photo/2015/07/19/10/00/school-work-851328_640.jpg" alt="..." className='object-cover' />
          <img src="https://cdn.pixabay.com/photo/2015/11/19/21/11/book-1052014_640.jpg" alt="..." className='object-cover' />
          <img src="https://cdn.pixabay.com/photo/2019/11/19/22/24/watch-4638673_640.jpg" alt="..." className='object-cover' />
        </Carousel>
      </div>

      {/* Latest Jobs Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold mb-8 text-center  text-gray-500 ">Latest Job Openings</h2>
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
            
          </div>
        ) : (
          <p className="text-center text-gray-600">No jobs available at the moment.</p>
        )}
      </div>
    

     {/* Latest Events Section */}
      <div className="min-h-screen mt-20 p-5 dark:text-white">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-500 ">Upcoming Events</h2>
     {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event._id}>
              <div className=" border-2 rounded-lg p-6 mb-4 border-custom-blue">
              <div className="flex flex-row">
                  <div className="w-1/4 flex flex-col items-center justify-center  p-3">
                    <p className="text-xl font-semibold  mb-2">{new Date(event.date).toLocaleString('en-US', { month: 'long', day: 'numeric' })}</p>
                    <p className="">{event.location}</p>
                  </div>
                  <div className="w-3/4 pl-5">
                    <h2 className="text-xl font-semibold mb-2">{event.eventName}</h2>
                    <p className=" mb-2">Time: {event.time}</p>
                    <p className=" mb-2">Organized By: {event.organizedBy}</p>
                    <p className=" mb-2">Contact Number: {event.contactNo}</p>
                    <p className=" mb-2">Description: {event.description}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
            {showMore && (
              <button
                onClick={handleShowMore}
                className='w-full text-teal-500 self-center text-sm py-7'
              >
                Show more
              </button>
            )}
        </ul>
        
      ) : (
        <p>No events available.</p>
      )}
   </div>
  
   </div>
 
  );
};

export default Home;
