import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { Box, Table, Text } from '@radix-ui/themes';
import NextLink from 'next/link';
import { IssueStatusBadge, Link } from '../../components';
import IssueActions from './IssueActions';

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

const sortOrders = ['asc', 'desc'] as const;
type SortOrder = (typeof sortOrders)[number];
type OrderBy = { [Property in keyof Issue]?: SortOrder };
type Props = {
  searchParams: {
    status: Status;
    sortBy: keyof Issue;
    sortOrder?: SortOrder;
  };
};

export default async function IssuesPage({ searchParams }: Props) {
  const { status, orderBy } = validateQueryParams(searchParams);

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  });

  return (
    <Box>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.ColumnHeaderCell key={col.value} className={col.className}>
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      sortBy: col.value,
                      sortOrder:
                        searchParams.sortOrder === 'desc' ? 'asc' : 'desc',
                    } as Props['searchParams'],
                  }}
                >
                  {col.value === searchParams.sortBy &&
                    (searchParams.sortOrder !== 'desc' ? (
                      <ArrowUpIcon className='inline' />
                    ) : (
                      <ArrowDownIcon className='inline' />
                    ))}
                  {col.label}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
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

function validateQueryParams(params: Props['searchParams']): {
  status?: Status;
  orderBy?: OrderBy;
} {
  const statuses = Object.values(Status);
  const status = statuses.includes(params.status) ? params.status : undefined;

  const sortOrder: SortOrder =
    params.sortOrder && sortOrders.includes(params.sortOrder)
      ? params.sortOrder
      : 'asc';

  let orderBy: OrderBy | undefined = undefined;
  if (columns.map((col) => col.value).includes(params.sortBy)) {
    orderBy = { [params.sortBy]: sortOrder };
  }

  return { status, orderBy };
}
