import { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const AdminDeleteEvent = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/server/event/getevents');
        const result = await response.json();
        setEvents(result.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const deleteEvent = async (id) => {
    try {
      const response = await fetch(`/server/event/deleteevent/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEvents(events.filter((event) => event._id !== id));
        console.log('Event deleted successfully');
        setShowModal(false);
      } else {
        console.error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleDeleteClick = (id) => {
    setEventIdToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    deleteEvent(eventIdToDelete);
  };

  return (
    <div className="max-w-4xl mx-auto p-3 w-full">
      <h1 className="text-2xl font-bold mb-5">Events</h1>
      <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {events.length > 0 ? (
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Location</Table.HeadCell>
              <Table.HeadCell>Event Name</Table.HeadCell>
              <Table.HeadCell>Time</Table.HeadCell>
              <Table.HeadCell>Organized By</Table.HeadCell>
              <Table.HeadCell>Contact No</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {events.map((event) => (
                <Table.Row key={event._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(event.date).toLocaleString('en-US', { month: 'long', day: 'numeric' })}</Table.Cell>
                  <Table.Cell>{event.location}</Table.Cell>
                  <Table.Cell>{event.eventName}</Table.Cell>
                  <Table.Cell>{event.time}</Table.Cell>
                  <Table.Cell>{event.organizedBy}</Table.Cell>
                  <Table.Cell>{event.contactNo}</Table.Cell>
                  <Table.Cell>{event.description}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => handleDeleteClick(event._id)}
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
          <p>No events available.</p>
        )}
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this event?
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

export default AdminDeleteEvent;

