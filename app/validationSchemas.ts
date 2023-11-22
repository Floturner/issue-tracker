import { Status } from '@prisma/client';
import { z } from 'zod';

export const issueSchema = z.object({
  title: z
    .string({ required_error: 'Title is required.' })
    .min(1, 'Title is required.')
    .max(255, 'Title must contain at most 255 characters.'),
  description: z
    .string({ required_error: 'Description is required.' })
    .min(1, 'Description is required.'),
  status: z
    .nativeEnum(Status, { invalid_type_error: `Status is invalid.` })
    .nullable(),
});
