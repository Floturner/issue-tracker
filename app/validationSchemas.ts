import { Status } from '@prisma/client';
import { z } from 'zod';

export const createIssueSchema = z.object({
  title: z
    .string({ required_error: 'The [title] field is required.' })
    .min(1, 'The [title] field is required.')
    .max(255, 'The [title] field must contain at most 255 characters.'),
  description: z
    .string({ required_error: 'The [description] field is required.' })
    .min(1, 'The [description] field is required.')
    .max(
      65535,
      'The [description] field must contain at most 65535 characters.'
    ),
});

export const patchIssueSchema = createIssueSchema.partial().extend({
  status: z
    .nativeEnum(Status, {
      invalid_type_error: `The [status] field is invalid.`,
    })
    .optional(),
  assignedUserId: z
    .string({ required_error: 'The [assignedUserId] field is required.' })
    .min(1, 'The [assignedUserId] field is required.')
    .max(255, 'The [assignedUserId] field must contain at most 255 characters.')
    .nullable()
    .optional(),
});

export type CreateIssueDto = z.infer<typeof createIssueSchema>;
export type PatchIssueDto = z.infer<typeof patchIssueSchema>;
