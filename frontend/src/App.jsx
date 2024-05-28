import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home  from './pages/Home_main.jsx';
import About  from './pages/About.jsx';
import   Login   from './pages/Login.jsx';
import  Signup  from './pages/Signup.jsx';
import { Contactus } from './pages/Contactus.jsx';
import Header from './components/Header.jsx';
import Jobs from './pages/Jobs.jsx';
import Gallery from './pages/Gallery.jsx';
import Footer from './components/Footer.jsx';
import AdminLayout from './pages/AdminLayout.jsx';
import AdminJobs from './pages/AdminJobs.jsx';
import AdminDeleteJob from './pages/AdminDeleteJob.jsx';
import GalleryUpload from './pages/GalleryUpload.jsx';
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


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/officebearer/:companyname" element={<FetchAlumni />} />
        <Route path="/event" element={<Event />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/officebearer" element={<DisplayAlumni />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/Student-dashboard" element={<Student_dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="insertjobs" element={<AdminJobs />} />
            <Route path="deletejobs" element={<AdminDeleteJob />} />
            <Route path="galleryupload" element={<GalleryUpload />} />
            <Route path="deletepic" element={<AdminDeletePic />} />
            <Route path="addevent" element={<AdminAddEvent />} />
            <Route path="deleteevent" element={<AdminDeleteEvent />} />
            <Route path="contact" element={<AdminContact />} />
          </Route>
        </Route>
        

        <Route path='/*' element={<NotFound/> }/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

