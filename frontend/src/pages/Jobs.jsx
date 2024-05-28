import { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  const getJobs = async () => {
    try {
      const response = await fetch('http://localhost:3000/server/job/displayjob',{
        method: "GET",
      }
      );

      if (response.ok) {
        const data = await response.json();
        setJobs(data);
        
      } 
    } catch (error) {
      console.error('Error fetching jobs:', error);
     
    }
  };

  useEffect(() => {
    getJobs();
  }, []);


  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map(job => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
