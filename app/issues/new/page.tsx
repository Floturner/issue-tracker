'use client';

import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueForm = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState('');

  return (
    <div className='max-w-xl space-y-5'>
      {error && (
        <Callout.Root color='red'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className='space-y-5'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (err) {
            setError('An unexpected error occured.');
          }
        })}
      >
        <div className='space-y-3'>
          <TextField.Root>
            <TextField.Input placeholder='Title' {...register('title')} />
          </TextField.Root>
          {errors.title && (
            <Text as='p' color='red'>
              {errors.title.message}
            </Text>
          )}
        </div>
        <div>
          <Controller
            name='description'
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder='Description' {...field} />
            )}
          />
          {errors.description && (
            <Text as='p' color='red'>
              {errors.description.message}
            </Text>
          )}
        </div>
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
}
