import prisma from '@/prisma/client';
import { z } from 'zod';

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(req: Request) {
  const body = await req.json();

  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return Response.json(validation.error.errors, { status: 400 });
  }

  const issue = await prisma.issue.create({
    data: { ...validation.data },
  });

  return Response.json(issue, { status: 201 });
}
