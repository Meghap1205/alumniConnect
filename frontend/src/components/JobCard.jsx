import { useNavigate } from 'react-router-dom';
import { FaUserFriends, FaExternalLinkAlt } from 'react-icons/fa'; 

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const handleViewAlumniClick = () => {
    navigate(`/officebearer/${job.companyname}`);
  };

  return (
    <div className="bg-white border-2 rounded-lg p-6 mb-4 border-custom-blue relative">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.companyname}</h2>
      <p className="text-gray-600 mb-2">Role: {job.role}</p>
      <p className="text-gray-600 mb-2">Location: {job.location}</p>
      <p className="text-gray-600 mb-2">Required Skills: {job.requireskills}</p>
      <p className="text-gray-600 mb-2">Course: {job.coursespecialization}</p>
      <p className="text-gray-600">{job.description}</p>
      <p className="text-gray-600 float-right mb-3">Posted on: {formatDate(job.createdAt)}</p>

      <FaUserFriends
        className="absolute bottom-2 right-2 cursor-pointer text-custom-blue" 
        style={{ fontSize: '24px' }}
        onClick={handleViewAlumniClick}
      />
      
      {job.websiteUrl && (
        <a href={job.websiteUrl} target="_blank" rel="noopener noreferrer" className="absolute top-2 right-2 cursor-pointer">
          <FaExternalLinkAlt className="text-custom-blue" style={{ fontSize: '24px' }} />
        </a>
      )}
    </div>
  );
};

export default JobCard;
