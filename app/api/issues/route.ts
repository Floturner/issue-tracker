import authOptions from '@/app/auth/authOptions';
import { issueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: 'Please, login first.' }, { status: 401 });
  }

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

export async function GET(req: Request) {
  const issues = await prisma.issue.findMany({});

  return Response.json(issues);
}
