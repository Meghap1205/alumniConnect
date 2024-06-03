
import { FaLinkedin } from 'react-icons/fa';

const AlumniCard = ({ alumnus }) => {
  const openLinkedInProfile = () => {
    window.open(alumnus.linkedinUrl, "_blank");
  };

  return (
    <div className="bg-white border-2 rounded-lg p-6 mb-4 border-custom-blue relative">
      <div className="flex flex-col items-center justify-center p-3 rounded-t-lg">
        <img src={alumnus.profilePicture} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
        <p className="text-xl font-semibold text-gray-800 mb-2">{alumnus.name}</p>
      </div>
      <div className="pl-5">
        <p className="text-gray-600 mb-2">Company: {alumnus.company}</p>
        <p className="text-gray-600 mb-2">Job Title: {alumnus.role}</p>
        <p className="text-gray-600 mb-2">Graduation Year: {alumnus.graduationYear}</p>
        <p className="text-gray-600 mb-2">Phone no: {alumnus.contact}</p>
        <p className="text-gray-600 mb-2">Email: {alumnus.email}</p>
        {/* Add more fields as needed */}
      </div>
      <FaLinkedin className="absolute bottom-2 right-2 cursor-pointer text-custom-blue" style={{ fontSize: '24px' }} onClick={openLinkedInProfile} />
    </div>
  );
};


export default AlumniCard;
