import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { Box, Button, Flex, Table, Text } from '@radix-ui/themes';
import delay from 'delay';
import NextLink from 'next/link';
import { IssueStatusBadge, Link } from '../../components';
import IssueStatusFilter from './IssueStatusFilter';

type Props = {
  searchParams: { status: Status };
};

export default async function IssuesPage({ searchParams }: Props) {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const issues = await prisma.issue.findMany({
    where: { status },
  });

  await delay(5000);

  return (
    <Box>
      <Flex mb='5' justify='between'>
        <IssueStatusFilter defaultValue={status ?? 'ALL'} />
        <Button>
          <NextLink
            className='flex justify-center items-center w-full h-full'
            href='/issues/new'
          >
            New Issue
          </NextLink>
        </Button>
      </Flex>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!issues.length && (
            <Table.Row>
              <Table.Cell className='col-span-1 md:col-span-3'>
                <Text>No issues found.</Text>
              </Table.Cell>
            </Table.Row>
          )}
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
