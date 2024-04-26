import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav id="navbar" className="navJS-code bg-blue-100 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-semibold text-blue-500 mb-4 md:mb-0 md:mr-6">
          Connect<span className="text-xl font-semibold text-black">Alumni</span>
        </div>
        <div className="flex gap-5 items-center">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/alumni" className="nav-link">Alumni</Link>
          <Link to="/jobs" className="nav-link">Jobs</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contactus" className="nav-link">Contact Us</Link>
          <Link to="/signup">
            <button className="btn-signup bg-blue-500 text-white px-4 py-2 rounded-md">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
