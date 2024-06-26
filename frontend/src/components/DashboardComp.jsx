import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    HiArrowNarrowUp,
    HiOutlineUserGroup,
    HiAnnotation,
    HiDocumentText
} from 'react-icons/hi';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { MdWork, MdEventAvailable } from "react-icons/md";
export default function DashboardComp() {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [jobs, setJobs] = useState([]);
    const [totalJobs, setTotalJobs] = useState(0);
    const [lastMonthJobs, setLastMonthJobs] = useState(0);
    const [posts, setPosts] = useState([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [events, setEvents] = useState([]);
    const [totalEvents, setTotalEvents] = useState(0);
    const [lastMonthEvents, setLastMonthEvents] = useState(0);
    const { currentstudent } = useSelector((state) => state.student);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('https://connect-alumni-backend.vercel.app/server/student/getusers?limit=5', {
                    credentials: 'include',
                })
                const data = await res.json()
                if (res.ok) {
                    setUsers(data.users)
                    setTotalUsers(data.totalUsers)
                    setLastMonthUsers(data.lastMonthUsers)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        const fetchJobs = async () => {
            try {
                const res = await fetch('https://connect-alumni-backend.vercel.app/server/job/getjobs?limit=5', {
                    credentials: 'include',
                })
                const data = await res.json()
                if (res.ok) {
                    setJobs(data.jobs)
                    setTotalJobs(data.totalJobs)
                    setLastMonthJobs(data.lastMonthJobs)
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        const fetchPosts = async () => {
            try {
                const res = await fetch('https://connect-alumni-backend.vercel.app/server/post/getposts?limit=5', {
                    credentials: 'include',
                })
                const data = await res.json()
                if (res.ok) {
                    setPosts(data.posts)
                    setTotalPosts(data.totalPosts)
                    setLastMonthPosts(data.lastMonthPosts)
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        const fetchEvents = async () => {
            try {
                const res = await fetch('https://connect-alumni-backend.vercel.app/server/event/getevents?limit=5', {
                    credentials: 'include',
                })
                const data = await res.json()
                if (res.ok) {
                    setEvents(data.events)
                    setTotalEvents(data.totalEvents)
                    setLastMonthEvents(data.lastMonthEvents)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
       
        if (currentstudent.isAdmin) {
            fetchUsers();
            fetchJobs();
            fetchPosts();
            fetchEvents();
        }

    }, [currentstudent])
    return (
        <div className='p-3 md:mx-auto'>
            <div className='flex-wrap flex gap-4 justify-center'>
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
                            <p className='text-2xl'>{totalUsers}</p>
                        </div>
                        <HiOutlineUserGroup className='bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex  gap-2 text-sm'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {lastMonthUsers}
                        </span>
                        <div className='text-gray-500'>Last month</div>
                    </div>
                </div>

                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h3 className='text-gray-500 text-md uppercase'>
                                Total Job Posts
                            </h3>
                            <p className='text-2xl'>{totalJobs}</p>
                        </div>
                        <MdWork className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex  gap-2 text-sm'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {lastMonthJobs}
                        </span>
                        <div className='text-gray-500'>Last month</div>
                    </div>
                </div>

                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h3 className='text-gray-500 text-md uppercase'>
                                Total Gallery Posts
                            </h3>
                            <p className='text-2xl'>{totalPosts}</p>
                        </div>
                        <HiDocumentText className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex  gap-2 text-sm'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {lastMonthPosts}
                        </span>
                        <div className='text-gray-500'>Last month</div>
                    </div>
                </div>

                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h3 className='text-gray-500 text-md uppercase'>
                                Total Event Posts
                            </h3>
                            <p className='text-2xl'>{totalEvents}</p>
                        </div>
                        <MdEventAvailable className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>
                    <div className='flex  gap-2 text-sm'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {lastMonthEvents}
                        </span>
                        <div className='text-gray-500'>Last month</div>
                    </div>
                </div>
            </div>


            

          



            <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
                <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                    <div className='flex justify-between  p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2'>Recent users</h1>
                        <Button outline >
                            <Link to={'/dashboard?tab=users'}>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>User image</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                        </Table.Head>
                        {users &&
                            users.map((user) => (
                                <Table.Body key={user._id} className='divide-y'>
                                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                        <Table.Cell>
                                            <img
                                                src={user.profilePicture}
                                                alt='user'
                                                className='w-10 h-10 rounded-full bg-gray-500'
                                            />
                                        </Table.Cell>
                                        <Table.Cell>{user.name}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ))}
                    </Table>
                </div>


                <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                    <div className='flex justify-between  p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2'>Recent Jobs Posts</h1>
                        <Button outline>
                            <Link to={'/dashboard?tab=jobs'}>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Company</Table.HeadCell>
                            <Table.HeadCell>Role</Table.HeadCell>
                            <Table.HeadCell>Created On</Table.HeadCell>
                        </Table.Head>
                        {jobs &&
                            jobs.map((job) => (
                                <Table.Body key={job._id} className='divide-y'>
                                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                        <Table.Cell>
                                            <p className='line-clamp-2'>{job.companyname}</p>
                                        </Table.Cell>
                                        <Table.Cell>{job.role}</Table.Cell>
                                        <Table.Cell>{moment(job.createdAt).format('MM/DD/YYYY')}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ))}
                    </Table>
                </div>



                <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                    <div className='flex justify-between  p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2'>Recent Gallery Posts</h1>
                        <Button outline >
                            <Link to={'/dashboard?tab=posts'}>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Image</Table.HeadCell>
                            <Table.HeadCell>Title</Table.HeadCell>
                            <Table.HeadCell>Content</Table.HeadCell>
                        </Table.Head>
                        {posts &&
                            posts.map((post) => (
                                <Table.Body key={post._id} className='divide-y'>
                                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                        <Table.Cell>
                                            <img
                                                src={post.image}
                                                alt='post'
                                                className='w-10 h-10 rounded-full bg-gray-500'
                                            />
                                        </Table.Cell>
                                        <Table.Cell>{post.title}</Table.Cell>
                                        <Table.Cell>{post.content}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ))}
                    </Table>
                </div>

                <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                    <div className='flex justify-between  p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2'>Recent Events Posts</h1>
                        <Button outline >
                            <Link to={'/dashboard?tab=events'}>See all</Link>
                        </Button>
                    </div>
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Event</Table.HeadCell>
                            <Table.HeadCell>Date</Table.HeadCell>
                            <Table.HeadCell>Location</Table.HeadCell>
                        </Table.Head>
                        {events &&
                            events.map((event) => (
                                <Table.Body key={event._id} className='divide-y'>
                                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                        <Table.Cell>
                                            {event.eventName}
                                        </Table.Cell>
                                        <Table.Cell>{event.date}</Table.Cell>
                                        <Table.Cell>{event.location}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            ))}
                    </Table>
                </div>



                
            
            </div>
        </div>
    )
}
