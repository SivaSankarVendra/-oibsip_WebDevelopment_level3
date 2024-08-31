import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/createuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        navigate('/login');
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gray-100'>
      <Navbar />
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-8'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Sign Up</h2>
        <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label htmlFor='name' className='text-gray-700 mb-1'>Username</label>
            <input
              type='text'
              id='name'
              name='name'
              value={credentials.name}
              onChange={handleChange}
              placeholder='Enter your username'
              className='border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='email' className='text-gray-700 mb-1'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={credentials.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className='border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password' className='text-gray-700 mb-1'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              value={credentials.password}
              onChange={handleChange}
              placeholder='Enter your password'
              className='border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='confirmPassword' className='text-gray-700 mb-1'>Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={credentials.confirmPassword}
              onChange={handleChange}
              placeholder='Confirm your password'
              className='border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
          <button
            type='submit'
            className='bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300'
          >
            Sign Up
          </button>
        </form>
        <div className='text-center mt-4'>
          <p className='text-gray-600'>
            Already have an account? 
            <Link to='/login' className='text-blue-400 hover:underline ml-1'>Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
