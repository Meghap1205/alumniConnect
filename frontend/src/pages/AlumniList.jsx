import { useState, useEffect } from 'react';
import AlumniCard from '../components/AlumniCard';
import SearchBar from '../components/SearchBar';

const DisplayAlumni = () => {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);

  const fetchAlumni = async () => {
    try {
      const response = await fetch('https://connect-alumni-backend.vercel.app/server/officebearer', {
        method: "GET",
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setAlumni(data.alumni);
        setFilteredAlumni(data.alumni); // Set filtered alumni initially
      } 
    } catch (error) {
      console.error('Error fetching alumni:', error);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const handleSearch = query => {
    const filtered = alumni.filter(alumnus => {
      const { name, company, role, graduationYear } = alumnus;
      return (
        name.toLowerCase().includes(query.toLowerCase()) ||
        company.toLowerCase().includes(query.toLowerCase()) ||
        role.toLowerCase().includes(query.toLowerCase()) ||
        (graduationYear && graduationYear.toString().includes(query.toLowerCase())) 
      );
    });
    setFilteredAlumni(filtered);
  };
  

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredAlumni.map(alumnus => (
          <AlumniCard key={alumnus._id} alumnus={alumnus} />
        ))}
      </div>
    </div>
  );
};

export default DisplayAlumni;
