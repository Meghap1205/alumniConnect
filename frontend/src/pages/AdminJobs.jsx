import { useState } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';

const AdminJobs = () => {
  const [formData, setFormData] = useState({
    companyname: '',
    location: '',
    role: '',
    requireskills: '',
    coursespecialization: '',
    websiteUrl: '',
    description: '',
    createdAt: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://connect-alumni-backend.vercel.app/server/job/admin/insertjobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Job inserted successfully:', data);
        // Clear the form after successful submission
        setFormData({
          companyname: '',
          location: '',
          role: '',
          requireskills: '',
          coursespecialization: '',
          websiteUrl: '',
          description: '',
          createdAt: ''

        });
      } else {
        console.error('Failed to insert job:', await response.text());
      }
    } catch (error) {
      console.error('Error inserting job:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label htmlFor='companyname' value='Company name' />
              <TextInput
                type='text'
                placeholder='Company name'
                id='companyname'
                value={formData.companyname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor='location' value='Location' />
              <TextInput
                type='text'
                placeholder='Location'
                id='location'
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor='role' value='Role' />
              <TextInput
                type='text'
                placeholder='Role'
                id='role'
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor='requireskills' value='Required Skills' />
              <TextInput
                type='text'
                placeholder='Required Skills'
                id='requireskills'
                value={formData.requireskills}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor='coursespecialization' value='Course Specialization' />
              <TextInput
                type='text'
                placeholder='Course Specialization'
                id='coursespecialization'
                value={formData.coursespecialization}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor='websiteUrl' value='Website URL' />
              <Textarea
                placeholder='Website URL'
                id='websiteUrl'
                value={formData.websiteUrl}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor='description' value='Description' />
              <Textarea
                placeholder='Description'
                id='description'
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor='createdAt' value='Creation Date' />
              <TextInput
                type='date'
                id='createdAt'
                value={formData.createdAt}
                onChange={handleChange}
                required
              />
            </div>
            <Button type='submit'>Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
