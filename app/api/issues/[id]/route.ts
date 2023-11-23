import authOptions from '@/app/auth/authOptions';
import { patchIssueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
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

  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) {
    return Response.json(validation.error.format(), { status: 400 });
  }

  const { title, description, status, assignedUserId } = validation.data;

  if (assignedUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedUserId },
    });
    if (!user) {
      return Response.json({ error: 'Invalid user.' }, { status: 400 });
    }
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id, 10) },
  });
  if (!issue) {
    return Response.json({ error: 'Invalid issue.' }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title, description, status, assignedUserId },
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
