'use client';

import { Button, TextFieldInput, TextFieldRoot } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';

type IssueForm = {
  title: string;
  description: string;
};

export default function NewIssuePage() {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <form
      className='max-w-xl space-y-5'
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/issues', data);
        router.push('/issues');
      })}
    >
      <TextFieldRoot>
        <TextFieldInput placeholder='Title' {...register('title')} />
      </TextFieldRoot>
      <Controller
        name='description'
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder='Description' {...field} />
        )}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
}
