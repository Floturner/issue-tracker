import prisma from '@/prisma/client';
import { Box, Table, Text } from '@radix-ui/themes';
import IssueStatusBadge from '../components/IssueStatusBadge';
import Link from '../components/Link';
import IssueActions from './IssueActions';

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  return (
    <Box>
      <IssueActions />
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
