
import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight } from 'react-icons/hi'
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/Student-dashboard?tab=profile' >
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'Student'} labelColor='dark'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
