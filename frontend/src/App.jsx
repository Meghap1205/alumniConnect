import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home_main';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Contactus } from './pages/Contactus';
import Header from './components/Header';


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

