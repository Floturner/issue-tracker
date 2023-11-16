'use client';

import { Button, TextFieldInput, TextFieldRoot } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import SimpleMDE from 'react-simplemde-editor';

export default function NewIssuePage() {
  return (
    <div className='max-w-xl space-y-5'>
      <TextFieldRoot>
        <TextFieldInput placeholder='Title' />
      </TextFieldRoot>
      <SimpleMDE placeholder='Description' />
      <Button>Submit New Issue</Button>
    </div>
  );
}
