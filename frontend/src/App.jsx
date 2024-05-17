import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home_main.jsx';
import { About } from './pages/About.jsx';
import   Login   from './pages/Login.jsx';
import  Signup  from './pages/Signup.jsx';
import { Contactus } from './pages/Contactus.jsx';
import Header from './components/Header.jsx';
import Jobs from './pages/Jobs.jsx';
import Gallery from './pages/Gallery.jsx';
import Footer from './components/Footer.jsx';


export default function App() {
  return (
    <BrowserRouter>
    <Header />
       <Routes>
          <Route path = "/" element={<Home/>}/>
          <Route path = "/login" element={<Login/>}/>
          <Route path = "/signup" element={<Signup/>}/>
          <Route path = "/about" element={<About/>}/>
          <Route path = "/jobs" element={<Jobs/>}/>
          <Route path = "/contactus" element={<Contactus/>}/>
        <Route path="/gallery" element={<Gallery />} />
       </Routes>
       <Footer/>
    </BrowserRouter>
  )
}

