
import  { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const getJobs = async () => {
    try {
      const response = await fetch(`${window.location.origin}/server/job/displayjob`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data); 
      } else {
        console.error('Failed to fetch jobs:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const handleSearch = query => {
    const filtered = jobs.filter(job =>
      job.companyname.toLowerCase().includes(query.toLowerCase()) ||
      job.role.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase()) ||
      job.requireskills.toLowerCase().includes(query.toLowerCase()) ||
      job.coursespecialization.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="container mx-auto py-8">
      <SearchBar onSearch={handleSearch} /> 
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map(job => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
