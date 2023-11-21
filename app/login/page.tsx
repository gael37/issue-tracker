'use client'

import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import LoginCredentials from './LoginCredentials';
import LoginGoogle from './LoginGoogle';
import { Flex, Link } from '@radix-ui/themes';

interface FormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {

  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials')
      console.log('signed in data', result)
      router.push('/issues/list')
    } catch (error) {
      console.log('erros when submitting the login form', error)
    }
  };

  return (
    <div className="gap-5 border-2 rounded-2xl p-8  flex flex-col items-center justify-center w-80 mx-auto from-violet-600 to-violet-500 bg-gradient-to-b"
    >
      <form
        onSubmit={handleSubmit}
        className='w-64 mb-3 mx-auto block'
      >

        <div className="mx-auto w-full">
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
        <div className="">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            Password *
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-0"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <LoginCredentials email={formData.email} password={formData.password} />

      </form>
      <LoginGoogle />
      <Flex align='center' gap='2'>
        <p className='text-white'>Not an account yet?</p>
        <Link href='/register' className='link'>Register</Link>
      </Flex>
    </div>
  );
};

export default LoginPage
