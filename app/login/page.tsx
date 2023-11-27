'use client'

import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import LoginCredentials from './LoginCredentials';
import LoginGoogle from './LoginGoogle';
import { Flex, Link } from '@radix-ui/themes';
import LoginWithCredentials from './LoginWithCredentials';

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

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const result = await signIn('credentials')
  //     console.log('signed in data', result)
  //     // router.push('/issues/list')
  //   } catch (error) {
  //     console.log('erros when submitting the login form', error)
  //   }
  // };

  return (
    <section className='landing-section'>
      <div className='max-w-6xl pt-24 mx-auto pl-5 pr-5'>

        <div className="gap-5 border-2 rounded-2xl p-8  flex flex-col items-center justify-center w-68 sm:w-80 mx-auto from-slate-100 to-slate-200 bg-gradient-to-b"
        >
          <form
            // onSubmit={handleSubmit}
            className='w-52 sm:w-64 mb-3 mx-auto block'
          >

            <div className="mx-auto w-full">
              <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                Email *
              </label>
              <input
                className="shadow appearance-none border-thin rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
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
              <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                Password *
              </label>
              <input
                className="shadow appearance-none border-thin rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <LoginWithCredentials email={formData.email} password={formData.password} />

          </form>
          <LoginGoogle />
          <Flex align='center' gap='2'>
            <p className='text-black text-center'>Not an account yet?</p>
            <Link href='/register' className='link-2'>Register</Link>
          </Flex>
        </div>
      </div>
    </section>
  );
};

export default LoginPage
