import { z } from 'zod';

export const createIssueSchema = z.object({
  title: z
    .string({ required_error: 'Title is required.' })
    .min(1, 'Title is required.')
    .max(255, 'Title must contain at most 255 characters.'),
  description: z
    .string({ required_error: 'Title is required' })
    .min(1, 'Description is required.'),
});
