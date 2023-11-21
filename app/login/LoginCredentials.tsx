'use client'

import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Spinner } from '../components';

interface FormData {
  email: string;
  password: string;
}

interface Props {
  email: string
  password: string
}

const LoginCredentials = ({ email, password }: Props) => {
  const [isSubmitting, setSubmitting] = useState(false);

  const router = useRouter()
  // const [error, setError] = useState('')
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    try {
      setSubmitting(true);

      const result = await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: 'https://issue-tracker-reborn.vercel.app/'
      },
      )
      console.log('signed in with credentisls result', result)
      // setError('')
      // router.push('/issues/list')
    } catch (error) {
      console.log('erros when submitting the login form', error)
      setSubmitting(false);
      // setError('error')

    }
  };

  return (
    <button
      onClick={handleSubmit}
      className="button-link-login mt-5 w-full"
      type="submit"
    >
      <p>Login with email </p>
      {isSubmitting && email && password && <Spinner />}

    </button>
  );
};

export default LoginCredentials
