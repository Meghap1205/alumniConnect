import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AlumniCard from '../components/AlumniCard';

const FetchAlumni = () => {
  const { companyname } = useParams();
  const [officeBearers, setOfficeBearers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchOfficeBearers = async () => {
    try {
      const response = await fetch(`${window.location.origin}/server/officebearer/${companyname}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOfficeBearers(data.alumni);
        setLoading(false);
      } 
    } catch (error) {
      console.error('Error fetching office bearers:', error);
    }
  };

  useEffect(() => {
    fetchOfficeBearers();
  }, [companyname]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Alumni working at {companyname}</h1>
      {officeBearers.length === 0 ? (
        <p>No alumni are currently working at {companyname}.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {officeBearers.map(officeBearer => (
            <AlumniCard key={officeBearer._id} alumnus={officeBearer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FetchAlumni;
