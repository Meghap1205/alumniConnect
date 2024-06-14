
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/Student_dashsidebar';
import DashProfile from '../components/Student_dashprofile';
import DashGallery from '../components/DashGallery';
import DashUsers from '../components/DashUsers';
import AdminDeleteJob from './AdminDeleteJob';
import AdminDeleteEvent from './AdminDeleteEvent';
import DashboardComp from '../components/DashboardComp';
import AdminJobs from "./AdminJobs";
import CreatePost from './CreateGallery';
import AdminAddEvent from './AdminAddEvent';
import AdminContact from "./AdminContact";

export default function Dashboard() {
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
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        <DashSidebar />
      </div>
      
      {tab === 'profile' && <DashProfile />}
      {tab === 'posts' && <DashGallery />}
      {tab === 'users' && <DashUsers />}
      {tab === 'jobs' && <AdminDeleteJob />}
      {tab === 'events' && <AdminDeleteEvent />}
      {tab === 'addevent' && <AdminAddEvent />}
      {tab === 'dash' && <DashboardComp />}
      {tab === 'addjob' && <AdminJobs/>}
      {tab === 'contact' && <AdminContact/>}
      {tab === 'createpost' && <CreatePost/>}
      

    </div>
  )
}
