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
    <div className="border-2 rounded-lg p-6 mb-4 border-custom-blue relative dark:text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300 ..." >
      <h2 className="text-xl font-semibold mb-2">{job.companyname}</h2>
      <p className=" mb-2">Role: {job.role}</p>
      <p className=" mb-2">Location: {job.location}</p>
      <p className=" mb-2">Required Skills: {job.requireskills}</p>
      <p className="mb-2">Course: {job.coursespecialization}</p>
      <p className="">{job.description}</p>
      <p className=" float-right mb-3">Posted on: {formatDate(job.createdAt)}</p>

      <FaUserFriends
        className="absolute bottom-2 right-2 cursor-pointer text-custom-blue transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300 ..." 
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
