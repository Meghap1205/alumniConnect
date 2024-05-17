
const JobCard = ({ job }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.companyname}</h2>
      <p className="text-gray-600 mb-2">{job.role}</p>
      <p className="text-gray-600 mb-2">{job.location}</p>
      <p className="text-gray-600 mb-2">{job.requireskills}</p>
      <p className="text-gray-600 mb-2">{job.coursespecialization}</p>
      <p className="text-gray-600">{job.description}</p>
    </div>
  );
};

export default JobCard;
