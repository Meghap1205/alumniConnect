
const JobCard = ({ job }) => {
  
  // Function to format the date
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div className="bg-white border-2 rounded-lg p-6 mb-4 border-custom-blue">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.companyname}</h2>
      <p className="text-gray-600 mb-2">Role : {job.role}</p>
      <p className="text-gray-600 mb-2">Location : {job.location}</p>
      <p className="text-gray-600 mb-2">Required Skills : {job.requireskills}</p>
      <p className="text-gray-600 mb-2">Course : {job.coursespecialization}</p>
      <p className="text-gray-600"> {job.description}</p>
      <p className="text-gray-600 float-right">Posted on : {formatDate(job.createdAt)}</p>
    </div>
  );
};

export default JobCard;
