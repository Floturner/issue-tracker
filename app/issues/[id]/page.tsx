import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
};

export default async function IssueDetailPage({ params }: Props) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();

  const issue = await prisma.issue.findUnique({ where: { id } });

  if (!issue) notFound();

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
}
