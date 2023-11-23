import prisma from '@/prisma/client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import IssueFormSkeleton from './loading';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

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
