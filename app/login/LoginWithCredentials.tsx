'use client'

import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Spinner } from '../components';
import { setToken } from '../helpers/auth';

// interface FormData {
//   email: string;
//   password: string;
// }

interface Props {
  email: string
  password: string
}

const LoginWithCredentials = ({ email, password }: Props) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter()


  // const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault()
  //   try {
  //     setSubmitting(true);
  //     signIn('credentials', {
  //       email, password,
  //       // callbackUrl: 'http://localhost:3000/issues/list',
  //       redirect: false
  //     })
  //   } catch (error) {
  //     console.log('errors when submitting the login form', error)
  //     setSubmitting(false);
  //   }
  // };
  // const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault()
  //   try {
  //     setSubmitting(true);
  //     signIn('credentials', {
  //       email, password,
  //       // callbackUrl: 'http://localhost:3000/issues/list',
  //       redirect: false
  //     })
  //     if (res?.status == 200) {
  //       router.push('/')
  //     } else {
  //       throw new Error(res?.error)
  //     }
  //   } catch (error) {
  //     console.log(error) // error in the provider
  //   }
  // }
  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      setError('')

      setSubmitting(true);
      const res = await signIn('credentials', {
        email,
        password,
        // callbackUrl: 'http://localhost:3000/issues/list',
        redirect: false,
      });

      if (res?.status === 200) {
        router.push('/issues/list');
      } else {
        setSubmitting(false);
        setError('Invalid credentials')
      }
    } catch (error) {
      setSubmitting(false);
      setError('Invalid credentials')
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <button
        onClick={handleSubmit}
        className="button-link-login mt-5 w-full shadow-sm shadow-gray-400"
        type="submit"
      >
        <p>Login with email </p>
        {isSubmitting && email && password && <Spinner />}

      </button>
    </>
  );
};

export default LoginWithCredentials
