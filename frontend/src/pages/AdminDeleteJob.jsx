import { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';

const AdminDeleteJob = () => {
  const [jobs, setJobs] = useState([]);

  // Fetching jobs from the backend
  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:3000/server/job/displayjob', {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        console.error('Failed to fetch jobs:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  // Delete job by ID
  const deleteJob = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/server/job/admin/deleteJobs/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setJobs(jobs.filter(job => job._id !== id));
        console.log('Job deleted successfully');
      } else {
        console.error('Failed to delete job:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='container mx-auto py-8'>
        <h1 className='text-3xl font-bold mb-4'>Manage Jobs</h1>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {jobs.map((job) => (
            <div key={job._id} className='p-4 border rounded shadow'>
              <h2 className='text-xl font-semibold'>{job.companyname}</h2>
              <p>{job.role}</p>
              <p>{job.location}</p>
              <p>{formatDate(job.createdAt)}</p>
              <Button color='failure' onClick={() => deleteJob(job._id)} className='mt-2'>
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDeleteJob;
