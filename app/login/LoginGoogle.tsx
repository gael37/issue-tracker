'use client'

import { Flex } from '@radix-ui/themes';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import google from '@/assets/google.png'
import { Spinner } from '../components';


const LoginGoogle = () => {

  const router = useRouter()
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    try {
      setSubmitting(true);

      const result = await signIn('google', {
        redirect: true,
        callbackUrl: '/issues/list'
      })
      console.log('signed in with Google result', result)
      // router.push('/issues/list')
    } catch (error) {
      console.log('erros when submitting the login form', error)
      setSubmitting(false);

    }
  };

  return (
    <button
      onClick={handleSubmit}
      className="button-link-google mx-auto block w-64 mt-3"
      type="submit"
    >
      <Flex gap='3' align='center' justify='center'>
        <Image src={google} alt='google' width={20} height={20} />
        <p>Login with Google </p>
        {isSubmitting && <Spinner />}
      </Flex>

    </button>
  );
};

export default LoginGoogle
