import prisma from '@/prisma/client';
import { z } from 'zod';

const createIssueSchema = z.object({
  title: z
    .string({ required_error: 'Title is required.' })
    .min(1, 'Title is required.')
    .max(255, 'Title must contain at most 255 characters.'),
  description: z
    .string({ required_error: 'Title is required' })
    .min(1, 'Description is required.'),
});

export async function POST(req: Request) {
  const body = await req.json();

  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return Response.json(validation.error.format(), { status: 400 });
  }

  const issue = await prisma.issue.create({
    data: { ...validation.data },
  });

  return Response.json(issue, { status: 201 });
}
