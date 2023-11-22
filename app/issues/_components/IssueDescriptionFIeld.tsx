'use client';

import 'easymde/dist/easymde.min.css';
import { Control, Controller } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { IssueFormData } from './IssueForm';

export default function IssueDescriptionField({
  control,
  description,
}: {
  control: Control<IssueFormData>;
  description?: string;
}) {
  return (
    <Controller
      name='description'
      control={control}
      render={({ field }) => {
        field.value = description ?? '';
        return (
          <SimpleMDE
            defaultValue={description}
            placeholder='Description'
            {...field}
          />
        );
      }}
    />
  );
}
