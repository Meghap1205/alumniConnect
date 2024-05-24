import { Link } from "react-router-dom";

const NotFound = () => {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">404 - Page Not Found</h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Sorry, the page you are looking for does not exist.
          </p>
          <Link to="/" className="text-blue-500 hover:underline">Go back to home page</Link>
        </div>
      </div>
    );
  };
  
  export default NotFound;
  