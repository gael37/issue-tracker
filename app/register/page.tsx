'use client'

import { Flex } from '@radix-ui/themes';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import LoginGoogle from '../login/LoginGoogle';

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const RegistrationForm: React.FC = () => {

  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await axios.post('/api/register/', formData)
      console.log('form posted', data)
      router.push('/login')
    } catch (error) {
      console.log('erros when submitting the register form', error)
    }
    console.log('Form submitted:', formData);
  };

  return (
    <div className="gap-0 border-2 rounded-2xl p-5 mb-4 flex flex-col items-center justify-center w-80 mx-auto from-violet-600 to-violet-500 bg-gradient-to-b"
    >
      <form
        onSubmit={handleSubmit}
        className='w-64 mx-auto mb-2'
      >
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
            name *
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
            Email *
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            Password *
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password *
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            required
          />
        </div>

        <button
          className="button-link-login w-full mx-auto block"
          type="submit"
        >
          Register
        </button>


      </form>

      {/* <p className='text-center font-semibold mb-3'>Or</p> */}
      <LoginGoogle />
      <Flex align='center' gap='5' className='mt-4'>
        <p className='text-white '>Already an account?</p>
        <Link href='/login' className='link'>Login</Link>
      </Flex>
    </div>
  );
};

export default RegistrationForm;
