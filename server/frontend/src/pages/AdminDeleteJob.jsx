import { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const AdminDeleteJob = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [jobIdToDelete, setJobIdToDelete] = useState(null);

  // Fetching jobs from the backend
  const fetchJobs = async () => {
    try {
      const response = await fetch(`${window.location.origin}/server/job/displayjob`, {
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
      const response = await fetch(`${window.location.origin}/server/job/admin/deleteJobs/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setJobs(jobs.filter(job => job._id !== id));
        console.log('Job deleted successfully');
        setShowModal(false);
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

  const handleDeleteClick = (id) => {
    setJobIdToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    deleteJob(jobIdToDelete);
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div className='max-w-4xl mx-auto p-3 w-full'>
      <div className='container mx-auto py-8'>
        <h1 className='text-3xl font-bold mb-4'>Manage Jobs</h1>
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
          {jobs.length > 0 ? (
            <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell>Company Name</Table.HeadCell>
                <Table.HeadCell>Role</Table.HeadCell>
                <Table.HeadCell>Location</Table.HeadCell>
                <Table.HeadCell>Date Created</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className='divide-y'>
                {jobs.map((job) => (
                  <Table.Row key={job._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>{job.companyname}</Table.Cell>
                    <Table.Cell>{job.role}</Table.Cell>
                    <Table.Cell>{job.location}</Table.Cell>
                    <Table.Cell>{formatDate(job.createdAt)}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => handleDeleteClick(job._id)}
                        className='font-medium text-red-500 hover:underline cursor-pointer'
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <p>You have no jobs yet!</p>
          )}
        </div>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this job?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleConfirmDelete}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminDeleteJob;

