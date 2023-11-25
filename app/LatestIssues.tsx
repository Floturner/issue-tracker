import prisma from '@/prisma/client';
import { Avatar, Flex, Heading, Table } from '@radix-ui/themes';
import { IssueStatusBadge, Link } from './components';

export default async function LatestIssues() {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      assignedUser: true,
    },
  });

  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          <Table.Cell>
            <Heading size='4' my='2'>
              Latest Issues
            </Heading>
          </Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Flex justify='between' align='center'>
                <Flex direction='column' align='start' gap='2'>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <IssueStatusBadge status={issue.status} />
                </Flex>
                {issue.assignedUserId && (
                  <Avatar
                    src={issue.assignedUser?.image ?? undefined}
                    fallback='?'
                    size='2'
                    radius='full'
                    referrerPolicy='no-referrer'
                  />
                )}
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
