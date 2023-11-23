'use client';

import { ErrorMessage, Spinner } from '@/app/components';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

export type IssueFormData = z.infer<typeof issueSchema>;

export default function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post('/api/issues', data);
      }
      router.push('/issues');
      router.refresh();
    } catch (err) {
      setIsSubmitting(false);
      setError('An unexpected error occured.');
    }
  });

  return (
    <div className='max-w-xl space-y-5'>
      {error && (
        <Callout.Root color='red'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-5' onSubmit={onSubmit}>
        <div className='space-y-3'>
          <TextField.Root>
            <TextField.Input
              defaultValue={issue?.title}
              placeholder='Title'
              {...register('title')}
            />
          </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>
        <div>
          <Controller
            name='description'
            control={control}
            defaultValue={issue?.description}
            render={({ field }) => (
              <SimpleMDE placeholder='Description' {...field} />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>
        <Button disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          {issue ? 'Update Issue' : 'Create Issue'}
        </Button>
      </form>
    </div>
  );
}
