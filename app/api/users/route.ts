import authOptions from '@/app/auth/authOptions';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: 'Please, login first.' }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    orderBy: { name: 'asc' },
  });

  return Response.json(users);
}
