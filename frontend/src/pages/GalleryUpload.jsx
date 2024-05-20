import { useState, useRef } from 'react';
import { Button, Label, Textarea, FileInput } from 'flowbite-react';

const GalleryUpload = () => {
  const [formData, setFormData] = useState({
    description: '',
  });
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('description', formData.description);
    data.append('image', file);

    try {
      const response = await fetch('http://localhost:3000/server/gallery/upload', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Upload successful:', responseData);
        // Clear the form after successful submission
        setFormData({ description: '' });
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        console.error('Failed to upload:', await response.text());
      }
    } catch (error) {
      console.error('Error uploading:', error);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="description" value="Description" />
              <Textarea
                placeholder="Enter description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="image" value="Upload Image" />
              <FileInput
                id="image"
                onChange={handleFileChange}
                required
                ref={fileInputRef}
              />
            </div>
            <Button type="submit">Upload</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GalleryUpload;
