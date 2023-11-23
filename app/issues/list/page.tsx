import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex, Table, Text } from '@radix-ui/themes';
import NextLink from 'next/link';
import { IssueStatusBadge, Link } from '../../components';
import IssueStatusFilter from './IssueStatusFilter';

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

const orders = ['asc', 'desc'] as const;
type Order = (typeof orders)[number];
type OrderBy = { [Property in keyof Issue]?: Order };
type Props = {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    order?: Order;
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
            {columns.map((col) => (
              <Table.ColumnHeaderCell key={col.value} className={col.className}>
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: col.value,
                      order: searchParams.order === 'desc' ? 'asc' : 'desc',
                    } as Props['searchParams'],
                  }}
                >
                  {col.value === searchParams.orderBy &&
                    (searchParams.order !== 'desc' ? (
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

  const order: Order =
    params.order && orders.includes(params.order) ? params.order : 'asc';

  let orderBy: OrderBy | undefined = undefined;
  if (columns.map((col) => col.value).includes(params.orderBy)) {
    orderBy = { [params.orderBy]: order };
  }

  return { status, orderBy };
}
