import authOptions from '@/app/auth/authOptions';
import { APP_NAME } from '@/app/layout';
import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import AssigneeSelect from './AssigneeSelect';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import StatusSelect from './StatusSelect';

type Props = {
  params: { id: string };
};

export default async function IssueDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const issue = await fetchIssue(params.id);
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
      <Box className={session ? 'md:col-span-4' : 'md:col-span-5'}>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box className='flex flex-col gap-5'>
          <StatusSelect issue={issue} />
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Box>
      )}
    </Grid>
  );
}

const fetchIssue = cache((issueId: string) => {
  const id = parseInt(issueId, 10);
  if (isNaN(id)) notFound();
  return prisma.issue.findUnique({ where: { id } });
});

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(params.id);
  if (!issue) notFound();

  return {
    title: `${issue.title} - ${APP_NAME}`,
    description: `Details of issue ${issue.id}.`,
  };
}
