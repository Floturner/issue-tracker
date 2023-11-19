import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import IssueForm from '../../_components/IssueForm';

type Props = {
  params: { id: string };
};

export default async function EditIssuePage({ params }: Props) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();

  const issue = await prisma.issue.findUnique({ where: { id } });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}
