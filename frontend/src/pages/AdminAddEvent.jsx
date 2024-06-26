import { useState } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';

const EventForm = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    time: '',
    location: '',
    organizedBy: '',
    contactNo: '',
    description: '',
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
      const response = await fetch('https://connect-alumni-backend.vercel.app/server/event/addevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Event added successfully:', data);

        setFormData({
          eventName: '',
          date: '',
          time: '',
          location: '',
          organizedBy: '',
          contactNo: '',
          description: '',
        });
      } else {
        console.error('Failed to add event:', await response.text());
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-3 w-full">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="eventName" value="Event Name" />
              <TextInput
                type="text"
                placeholder="Event Name"
                id="eventName"
                value={formData.eventName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="date" value="Date" />
              <TextInput
                type="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="time" value="Time" />
              <TextInput
                type="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="location" value="Location" />
              <TextInput
                type="text"
                placeholder="Location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="organizedBy" value="Organized By" />
              <TextInput
                type="text"
                placeholder="Organized By"
                id="organizedBy"
                value={formData.organizedBy}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="contactNo" value="Contact Number" />
              <TextInput
                type="text"
                placeholder="Contact Number"
                id="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description" value="Description" />
              <Textarea
                placeholder="Description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
