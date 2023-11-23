import authOptions from '@/app/auth/authOptions';
import { issueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { getServerSession } from 'next-auth';

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: 'Please, login first.' }, { status: 401 });
  }

  const body = await req.json();

  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return Response.json(validation.error.format(), { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id, 10) },
  });
  if (!issue) {
    return Response.json({ error: 'Invalid issue' }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: validation.data.title,
      description: validation.data.description,
      status: validation.data.status
        ? Status[validation.data.status]
        : undefined,
    },
  });

  return Response.json(updatedIssue);
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: 'Please, login first.' }, { status: 401 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id, 10) },
  });
  if (!issue) {
    return Response.json({ error: 'Invalid issue' }, { status: 404 });
  }

  await prisma.issue.delete({ where: { id: issue.id } });
  return Response.json({});
}
