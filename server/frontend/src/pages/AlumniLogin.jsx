import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    signInStart,
    signInSuccess,
    signInFailure,
} from '../redux/student/studentSlice';

export default function AlumniLogin() {
    const [formData, setFormData] = useState({});
    const { error: errorMessage } = useSelector((state) => state.student);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.studentID || !formData.password) {
            return dispatch(signInFailure('Please fill all the fields'));
        }
        try {
            dispatch(signInStart());
            const res = await fetch('/server/studentauth/alumni-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
            }

            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };
    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>



                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value='Your studentID' />
                            <TextInput
                                type='text'
                                placeholder='studentID'
                                id='studentID'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value='Your password' />
                            <TextInput
                                type='password'
                                placeholder='**********'
                                id='password'
                                onChange={handleChange}
                            />
                        </div>
                        <Button

                            type='submit'
                        >
                            Log In
                        </Button>

                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Dont Have an account?</span>
                        <Link to='/signup' className='text-blue-500'>
                            Sign Up
                        </Link>
                    </div>
                    {errorMessage && (
                        <Alert className='mt-5' color='failure'>
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
}