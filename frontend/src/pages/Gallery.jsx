import { useEffect, useState } from 'react';

const GalleryDisplay = () => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await fetch('http://localhost:3000/server/gallery/displaygallery');
        const data = await response.json();
        setPictures(data);
      } catch (error) {
        console.error('Error fetching pictures:', error);
      }
    };

    fetchPictures();
  }, []);

  return (
    <div className="min-h-screen mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {pictures.map((picture) => (
          <div key={picture._id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={`http://localhost:3000${picture.imageUrl}`}
              alt={picture.description}
              className="w-full h-64 object-cover rounded-md"
            />
            <p className="text-gray-600 mb-2">{picture.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryDisplay;
