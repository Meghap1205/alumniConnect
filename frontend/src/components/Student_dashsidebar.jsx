
import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight, HiDocumentText } from 'react-icons/hi'
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { signoutSuccess } from '../redux/student/studentSlice'; 
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react'; 


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
                    <Link to='/Student-dashboard?tab=profile' >
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'Student'} labelColor='dark' as='div'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {
                        currentstudent.isAdmin && (
                            <Link to={'/admin/insertjobs'}>
                                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
                                    Insert Job
                                </Sidebar.Item>
                            </Link>
                        )
                    }
                    {
                        currentstudent.isAdmin && (
                            <Link to={'/admin/deletejobs'}>
                                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
                                    Delete Job
                                </Sidebar.Item>
                            </Link>
                        )
                    }
                    {
                        
                            currentstudent.isAdmin && (
                            <Link to='/Student-dashboard?tab=posts' >
                                    <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as='div'>
                                        Gallery
                                    </Sidebar.Item>

                                </Link>
                            )
                        
                    }
                    
                    {
                        currentstudent.isAdmin && (
                            <Link to={'/admin/addevent'}>
                                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
                                    Add Event
                                </Sidebar.Item>
                            </Link>
                        )
                    }
                    {
                        currentstudent.isAdmin && (
                            <Link to={'/admin/deleteevent'}>
                                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
                                    Delete Event
                                </Sidebar.Item>
                            </Link>
                        )
                    }
                    {
                        currentstudent.isAdmin && (
                            <Link to={'/admin/contact'}>
                                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
                                    Contact Admin
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
