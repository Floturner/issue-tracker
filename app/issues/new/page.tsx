'use client';

import {
  Button,
  TextArea,
  TextFieldInput,
  TextFieldRoot,
} from '@radix-ui/themes';
import React from 'react';

export default function NewIssuePage() {
  return (
    <div className='max-w-xl space-y-5'>
      <TextFieldRoot>
        <TextFieldInput placeholder='Title' />
      </TextFieldRoot>
      <TextArea placeholder='Description' />
      <Button>Submit New Issue</Button>
    </div>
  );
}
