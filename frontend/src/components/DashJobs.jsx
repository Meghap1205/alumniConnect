import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';


export default function DashJobs() {
  const { currentstudent } = useSelector((state) => state.student);
  const [totalJobs, setTotalJobs] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [jobIdToDelete, setJobIdToDelete] = useState('');
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://connect-alumni-backend.vercel.app/server/job/getjobs',{
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          setTotalJobs(data.jobs);
          if (data.jobs.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentstudent.isAdmin) {
      fetchJobs();
    }
  }, []);

  const handleShowMore = async () => {

  };

  const handleDeleteJob = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/server/job/admin/deleteJobs/${jobIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setTotalJobs((prev) =>
          prev.filter((job) => job._id !== jobIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };



  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentstudent.isAdmin && totalJobs.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Company</Table.HeadCell>
              <Table.HeadCell>Location</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
              <Table.HeadCell>Required skills</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Link</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>

            </Table.Head>
            {totalJobs.map((job) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {job.companyname}
                  </Table.Cell>
                  <Table.Cell>
                    {job.location}
                  </Table.Cell>
                  <Table.Cell>
                    {job.role}
                  </Table.Cell>
                  <Table.Cell>
                    {job.requireskills}
                  </Table.Cell>
                  <Table.Cell>
                    {job.description}
                  </Table.Cell>
                  <Table.Cell>
                    {job.websiteUrl}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setJobIdToDelete(job._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no jobs yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this event?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteJob}>
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
}
