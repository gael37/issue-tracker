'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue, Status } from '@prisma/client';
import { Button, Callout, Select, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';
import React, { useState, ChangeEvent, FormEvent } from 'react';



// type IssueFormData = z.infer<typeof issueSchema>;
type IssueFormData = {
  title: string
  description: string
  status: Status
}

const IssueForm = ({ issue }: { issue?: Issue }) => {

  const router = useRouter();

  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: issue?.title || '',
    description: issue?.description || '',
    status: issue?.status || 'OPEN'
  })

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
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>

        <TextField.Root>
          <TextField.Input
            name='title'
            placeholder="Title"
            value={form.title}
            onChange={() => setForm({ ...form, 'title': form.title })}
          />
        </TextField.Root>
        <ErrorMessage>{error}</ErrorMessage>

        <SimpleMDE placeholder="Description" value={form.description} onChange={() => setForm({ ...form, 'description': form.description })}
        />
        <ErrorMessage>{error}</ErrorMessage>



        <Select.Root
          value={form.status}
          onValueChange={(value: Status) => {
            setForm({ ...form, 'status': value })
          }}
        >
          <Select.Trigger placeholder="Status..." />
          <Select.Content>
            <Select.Group>
              <Select.Label>Suggestions</Select.Label>
              {options.map((option) => (
                <Select.Item key={option} value={option} >
                  {option}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>




        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
