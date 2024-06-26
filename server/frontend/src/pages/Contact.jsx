import { useState } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    issueDescription: ''
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
      const response = await fetch(`${window.location.origin}/server/contact/addcontact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setFormData({
          name: '',
          email: '',
          phoneNo: '',
          issueDescription: ''
        });

      } else {
        console.error('Failed to submit contact form');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name" value="Name" />
              <TextInput
                type="text"
                placeholder="Name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phoneNo" value="Phone Number" />
              <TextInput
                type="text"
                placeholder="Phone Number"
                id="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="issueDescription" value="Issue Description" />
              <Textarea
                placeholder="Issue Description"
                id="issueDescription"
                value={formData.issueDescription}
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

export default Contact;
