import authOptions from '@/app/auth/authOptions';
import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

type Props = {
  params: { id: string };
};

export default async function IssueDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();

  const issue = await prisma.issue.findUnique({ where: { id } });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
      <Box className={session ? 'md:col-span-4' : 'md:col-span-5'}>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box className='flex flex-col gap-5'>
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Box>
      )}
    </Grid>
  );
}
