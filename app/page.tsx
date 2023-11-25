import prisma from '@/prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import { Metadata } from 'next';
import IssueChart from './IssueChart';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import { APP_NAME } from './layout';

export type StatData = {
  open: number;
  inProgress: number;
  closed: number;
};

export default async function Home() {
  const stats = await prisma.issue.groupBy({
    by: ['status'],
    _count: { status: true },
  });
  const data: StatData = {
    open: stats.find((s) => s.status === 'OPEN')?._count.status ?? 0,
    inProgress:
      stats.find((s) => s.status === 'IN_PROGRESS')?._count.status ?? 0,
    closed: stats.find((s) => s.status === 'CLOSED')?._count.status ?? 0,
  };

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <IssueSummary stat={data} />
        <IssueChart stat={data} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: `Dashboard - ${APP_NAME}`,
  description: 'View a summary of project issues.',
  openGraph: {
    title: `Dashboard - ${APP_NAME}`,
    description: 'View a summary of project issues.',
  },
};
