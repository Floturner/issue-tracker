import { issueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';

export async function POST(req: Request) {
  const body = await req.json();

  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return Response.json(validation.error.format(), { status: 400 });
  }

  const issue = await prisma.issue.create({
    data: {
      title: validation.data.title,
      description: validation.data.description,
    },
  });

  return Response.json(issue, { status: 201 });
}
