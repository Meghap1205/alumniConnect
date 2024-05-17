import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home_main.jsx';
import { About } from './pages/About.jsx';
import  { Login }  from './pages/Login.jsx';
import  Signup  from './pages/Signup.jsx';
import { Contactus } from './pages/Contactus.jsx';
import Header from './components/Header.jsx';


export default function App() {
  return (
    <BrowserRouter>
    <Header />
       <Routes>
          <Route path = "/" element={<Home/>}/>
          <Route path = "/login" element={<Login/>}/>
          <Route path = "/signup" element={<Signup/>}/>
          <Route path = "/about" element={<About/>}/>
          <Route path = "/contactus" element={<Contactus/>}/>
       </Routes>
    </BrowserRouter>
  )
}

