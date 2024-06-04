import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home  from './pages/Home_main.jsx';
import About  from './pages/About.jsx';
import   Login   from './pages/Login.jsx';
import  Signup  from './pages/Signup.jsx';
import { Contactus } from './pages/Contactus.jsx';
import Header from './components/Header.jsx';
import Jobs from './pages/Jobs.jsx';
import Footer from './components/Footer.jsx';
import AdminLayout from './pages/AdminLayout.jsx';
import AdminJobs from './pages/AdminJobs.jsx';
import AdminAddEvent from './pages/AdminAddEvent.jsx';
import Event from './pages/Event.jsx';
import AdminDeletePic from './pages/AdminDeletePic.jsx';
import AdminDeleteEvent from './pages/AdminDeleteEvent.jsx'
import Contact from './pages/Contact.jsx';
import AdminContact from './pages/AdminContact.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Student_dashboard from './components/Student_dashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import DisplayAlumni from './pages/AlumniList.jsx';
import FetchAlumni from './pages/JobAlumni.jsx';
import CreateGallery from './pages/CreateGallery.jsx';
import UpdateGallery from './pages/UpdateGallery.jsx';
import AlumniLogin from './pages/AlumniLogin.jsx';
import AlumniSignup from './pages/AlumniSignup.jsx';



export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/alumni-login" element={< AlumniLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/alumni-signup" element={< AlumniSignup />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/officebearer/:companyname" element={<FetchAlumni />} />
        <Route path="/event" element={<Event />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/officebearer" element={<DisplayAlumni />} />
        
        
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Student_dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="insertjobs" element={<AdminJobs />} />
            <Route path="create-post" element={<CreateGallery />} />
            <Route path="update-post/:postId" element={<UpdateGallery />} />
            <Route path="addevent" element={<AdminAddEvent />} />
            <Route path="contact" element={<AdminContact />} />
          </Route>
        </Route>
        

        <Route path='/*' element={<NotFound/> }/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

