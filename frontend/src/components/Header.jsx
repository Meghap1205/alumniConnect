import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav id="navbar" className="navJS-code bg-[#e4f2ff] py-6 drop-shadow-xl">

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        <div className="text-4xl font-bold  text-blue-500 mb-4 md:mb-0 md:mr-6 font-grype">
          Connect<span className="text-3xl font-semibold text-black">Alumni</span>
        </div>

        {/* Toggle button only appears on mobile view */}
        <button
          onClick={toggleMobileMenu}
          className="block md:hidden focus:outline-none"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/>
          </svg>
        </button>

        {/* Menu items */}
        <div className={`${isMobileMenuOpen ? "block" : "hidden"} flex flex-col md:flex md:min-h-fit left-[0] top-[-100%] md:w-auto  md:flex-row gap-[4vw] items-center text-lg`}>
          <Link to="/home" className="nav-link text-black hover:text-black/70">Home</Link>
          <Link to="/alumni" className="nav-link text-black hover:text-black/70">Alumni</Link>
          <Link to="/jobs" className="nav-link text-black hover:text-black/70">Jobs</Link>
          <Link to="/about" className="nav-link text-black hover:text-black/70">About</Link>
          <Link to="/contactus" className="nav-link text-black hover:text-black/70">Contact Us</Link>
        </div>

        {/* Sign Up button */}
        <Link to="/signup">
          <button className="btn-signup bg-blue-500 hover:bg-blue-500/75 text-white px-4 py-2 rounded-md">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
}
