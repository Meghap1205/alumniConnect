import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { Home } from './components/Home';
import { About } from './components/About';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Contactus } from './components/Contactus';

export default function App() {
  return (
    <BrowserRouter>
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

