
import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiChartPie } from 'react-icons/hi'
import { FaUpload } from 'react-icons/fa';
import { MdWork } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { signoutSuccess } from '../redux/student/studentSlice'; 
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react'; 
import { MdOutlineFeedback } from "react-icons/md";


export default function DashSidebar() {
    const { currentstudent, error, loading } = useSelector((state) => state.student);
    const location = useLocation();
    const dispatch = useDispatch();
    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    const handleSignout = async () => {
        try {
            const res = await fetch('/server/student/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    {currentstudent && currentstudent.isAdmin && (
                        <Link to='/dashboard?tab=dash'>
                            <Sidebar.Item
                                active={tab === 'dash' || !tab}
                                icon={HiChartPie}
                                as='div'
                            >
                                Dashboard
                            </Sidebar.Item>
                        </Link>
                    )}
                    <Link to='/dashboard?tab=profile' >
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentstudent.isAdmin ? 'Admin' : currentstudent.isAlumni ? 'Alumni' : 'Student'} labelColor='dark' as='div'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {
                        currentstudent.isAdmin && (
                            <Link to='/dashboard?tab=jobs' >
                                <Sidebar.Item active={tab === 'jobs'} icon={MdWork} as='div'>
                                    Jobs
                                </Sidebar.Item>

                            </Link>
                        )
                    }
                
                    {
                        currentstudent.isAdmin && (
                            <Link to={'/dashboard?tab=addjob'}>
                                <Sidebar.Item active={tab === 'addjob'} icon={FaUpload} className='cursor-pointer'>
                                    Upload Job
                                </Sidebar.Item>
                            </Link>
                        )
                    }
                    {
                        currentstudent.isAlumni && (
                            <Link to={'/alumni/insertjobs'}>
                                <Sidebar.Item icon={FaUpload} className='cursor-pointer'>
                                    Upload Job
                                </Sidebar.Item>
                            </Link>
                        )
                    }
                  
                    {
                        
                            currentstudent.isAdmin && (
                            <Link to='/dashboard?tab=posts' >
                                    <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as='div'>
                                        Posts
                                    </Sidebar.Item>

                                </Link>
                            )
                        
                    }
                    
                    {

                        currentstudent.isAdmin && (
                            <Link to='/dashboard?tab=createpost' >
                                <Sidebar.Item  active={tab === 'posts'}  icon={FaUpload} as='div'>
                                    Upload Posts
                                </Sidebar.Item>

                            </Link>
                        )

                    }
                    {

                        currentstudent.isAlumni && (
                            <Link to='/alumni/create-post' >
                                <Sidebar.Item icon={FaUpload} as='div'>
                                    Upload Posts
                                </Sidebar.Item>

                            </Link>
                        )

                    }
                    {
                        currentstudent.isAdmin && (
                            <Link to='/dashboard?tab=users' >
                                <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} as='div'>
                                    Students
                                </Sidebar.Item>

                            </Link>
                        )
                    }
                    
                    {
                        currentstudent.isAdmin && (
                            <Link to={'/dashboard?tab=addevent'}>
                                <Sidebar.Item active={tab === 'addevent'}
                                icon={FaUpload} className='cursor-pointer'>
                                    Upload Event
                                </Sidebar.Item>
                            </Link>
                        )
                    }
                    {
                        currentstudent.isAdmin && (
                            <Link to={'/dashboard?tab=events'}>
                                <Sidebar.Item active={tab === 'events'}  icon={MdEventAvailable} className='cursor-pointer'>
                                    Events
                                </Sidebar.Item>
                            </Link>
                        )
                    }
                    {
                        currentstudent.isAdmin && (
                            <Link to={'/dashboard?tab=feedbacks'}>
                                <Sidebar.Item icon={MdOutlineFeedback} className='cursor-pointer'>
                                    Feedback
                                </Sidebar.Item>
                            </Link>
                        )
                    }
                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
