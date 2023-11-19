import { issueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';

type Props = {
  params: { id: string };
};

export async function PATCH(req: Request, { params }: Props) {
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
