import { useState, useEffect } from 'react';
import AlumniCard from '../components/AlumniCard';

const DisplayAlumni = () => {
  const [officeBearers, setOfficeBearers] = useState([]);

  const fetchOfficeBearers = async () => {
    try {
      const response = await fetch('http://localhost:3000/server/officebearer', {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setOfficeBearers(data.alumni); // Assuming data structure is { alumni: [] }
      } 
    } catch (error) {
      console.error('Error fetching office bearers:', error);
    }
  };

  useEffect(() => {
    fetchOfficeBearers();
  }, []);

  return (
    <div className="container mx-auto py-8">
   
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {officeBearers.map(officeBearer => (
          <AlumniCard key={officeBearer._id} alumnus={officeBearer} />
        ))}
      </div>
    </div>
  );
};

export default DisplayAlumni;
