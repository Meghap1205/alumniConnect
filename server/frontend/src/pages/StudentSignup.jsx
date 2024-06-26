import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function StudentSignup() {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.id]: e.target.value.trim() 
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password || !formData.studentID  || !formData.contact) {
            return setErrorMessage('Please fill out all fields.');
        }
        try {
            setLoading(true);
            setErrorMessage(null);

            const res = await fetch('/server/studentauth/student-signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            
            const data = await res.json();

            console.log(data);

            if (data.success === false) {
                return setErrorMessage(data.message);
            }
            setLoading(false);
            if (res.ok) {
                navigate('/student-login');
            }

        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
        }
    }

    return (

        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>

                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value='Your name' />
                            <TextInput
                                type='text'
                                placeholder='name'
                                id='name'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value='Your email' />
                            <TextInput
                                type='email'
                                placeholder='name@company.com'
                                id='email'
                                onChange={handleChange}

                            />
                        </div>
                        <div>
                            <Label value='Your password' />
                            <TextInput
                                type='password'
                                placeholder='Password'
                                id='password'
                                onChange={handleChange}

                            />
                        </div>
                        <div>
                            <Label value='Your StudentID' />
                            <TextInput
                                type='text'
                                placeholder='StudentID'
                                id='studentID'
                                onChange={handleChange}

                            />
                        </div>
                        <div>
                            <Label value='Your contact' />
                            <TextInput
                                type='text'
                                placeholder='contact'
                                id='contact'
                                onChange={handleChange}

                            />
                        </div>
                        <Button
                            
                            type='submit'
                            disabled={loading}
                
                            
                        >
                            {loading ? (
                                <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Loading...</span>
                                </>
                            ) : (
                                'Sign Up'
                            )
                            }
                        </Button>
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Have an account?</span>
                        <Link to='/student-login' className='text-blue-500' >
                            Sign In
                        </Link>
                    </div>
                    {errorMessage && (
                        <Alert className='mt-5' color='failure'>
                            {errorMessage}
                        </Alert>
                    )

                    }
                </div>


            </div>
        </div>


    );
}

