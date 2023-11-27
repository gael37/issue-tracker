'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue, Status } from '@prisma/client';
import { Button, Callout, Heading, Select, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useSession } from 'next-auth/react';



// type IssueFormData = z.infer<typeof issueSchema>;
type IssueFormData = {
  title: string
  description: string
  status: Status
}

const IssueForm = ({ issue }: { issue?: Issue }) => {

  const router = useRouter();
  const { data: session } = useSession()
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: issue?.title || '',
    description: issue?.description || '',
    status: issue?.status || 'OPEN'
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleChangeDescription = (value: string) => {
    setForm({ ...form, description: value });
  };


  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('form to submit ', form)
      setSubmitting(true);
      let result
      if (issue) {
        result = await axios.patch('/api/issues/' + issue.id, form);
      }
      else await axios.post('/api/issues', form);
      router.push('/issues/list');
      router.refresh();
      console.log('data posted: ', result)
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred.');
    }
  }

  const options = ['OPEN', 'IN_PROGRESS', 'CLOSED'];

  // const [selectedOption, setSelectedOption] = useState<string>(form.status || 'OPEN');

  // const changeTitle = (e: HTMLInputElement) => {
  //   const { value } = e.target;
  //   setForm({ ...form, 'title': value });
  // };

  return (

    <section className="max-w-6xl mx-auto">
      <div className="max-w-xl">
        {error && (
          <Callout.Root color="red" className="mb-5">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <form className="space-y-5" onSubmit={onSubmit}>
          <Heading className='text-white mb-6 lg:mb-10' size='7'>Describe your issue</Heading>

          <TextField.Root>
            <TextField.Input
              name='title'
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
            />
          </TextField.Root>
          <ErrorMessage>{error}</ErrorMessage>
          <div className='light-blue-bg rounded-md'>

            <SimpleMDE placeholder="Description" value={form.description} onChange={handleChangeDescription}
            />
          </div>
          <ErrorMessage>{error}</ErrorMessage>


          <div className='light-blue-bg rounded-md inline-block'>
            <Select.Root
              value={form.status}
              onValueChange={(value: Status) => {
                setForm({ ...form, 'status': value })
              }}
            >
              <Select.Trigger placeholder="Status..." />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Status</Select.Label>
                  {options.map((option) => (
                    <Select.Item key={option} value={option} >
                      {option}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </div>




          {session ?
            <Button disabled={isSubmitting} className='block'>
              {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
              {isSubmitting && <Spinner />}
            </Button>
            :
            <>
              <p>To update this issue you must be logged-in</p>
              <br />
              <Button disabled className='block'>
                {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
              </Button>
            </>
          }

        </form>
      </div>
    </section>
  );
};

export default IssueForm;
