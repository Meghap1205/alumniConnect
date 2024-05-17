import React from 'react'
import { Navbar, TextInput, Button, Dropdown} from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa';

export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2py-1  rounded-lg text-black'>Connect</span>
        Alumni
      </Link>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>

      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={'div'}>
          <Link to='/'>
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={'div'}>
          <Link to='/about'>
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/gallery"} as={'div'}>
          <Link to='/gallery'>
            Gallery
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/jobs"} as={'div'}>
          <Link to='/jobs'>
            Jobs
          </Link>
        </Navbar.Link>
        <Dropdown label="Login" dismissOnClick={false}>
          <Dropdown.Item><Link to='/login'>Login as Student </Link></Dropdown.Item>
          <Dropdown.Item><Link to='/login'>Login as Alumni </Link></Dropdown.Item>
          <Dropdown.Item><Link to='/login'>Login as Admin </Link></Dropdown.Item>
        </Dropdown>
        <Dropdown label="Sign Up" dismissOnClick={false}>
          <Dropdown.Item><Link to='/signup'>  Signup as Student </Link></Dropdown.Item>
          <Dropdown.Item><Link to='/signup'>Signup as Alumni </Link></Dropdown.Item>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  )
}
