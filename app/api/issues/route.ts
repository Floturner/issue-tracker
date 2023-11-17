import { createIssueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';

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
