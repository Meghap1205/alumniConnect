import {
  Navbar,
  Button,
  Dropdown,
  Avatar,
  DropdownHeader,
  DropdownDivider,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/student/studentSlice";
import { AiOutlineSearch } from "react-icons/ai";

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentstudent } = useSelector((state) => state.student);
  const { theme } = useSelector((state) => state.theme);

  const handleSignout = async () => {
    try {
      const res = await fetch("/server/student/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 rounded-lg text-black">Connect</span>
        Alumni
      </Link>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentstudent ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentstudent.profilePicture} rounded />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">@{currentstudent.name}</span>
              <span className="block text-sm font-medium truncate">
                {currentstudent.email}
              </span>
            </DropdownHeader>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <DropdownDivider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <>
          <Dropdown label="Login" dismissOnClick={false}>
              <Dropdown.Item><Link to='/student-login'>Login as Student </Link></Dropdown.Item>
              <Dropdown.Item><Link to='/alumni-login'>Login as Alumni </Link></Dropdown.Item>
            </Dropdown>
            <Dropdown label="Sign Up" dismissOnClick={false}>
              <Dropdown.Item><Link to='/student-signup'>Signup as Student </Link></Dropdown.Item>
              <Dropdown.Item><Link to='/alumni-signup'>Signup as Alumni </Link></Dropdown.Item>
            </Dropdown>
            </>

        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/officebearer"} as={"div"}>
          <Link to="/officebearer">Office Bearer</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/jobs"} as={"div"}>
          <Link to="/jobs">Jobs</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/event"} as={"div"}>
          <Link to="/event">Events</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/gallery"} as={"div"}>
          <Link to="/gallery">Posts</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/contact"} as={"div"}>
          <Link to="/contact">Contact us</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
