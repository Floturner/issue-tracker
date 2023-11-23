import { IssueStatusBadge, Link } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { Table, Text } from '@radix-ui/themes';
import NextLink from 'next/link';

export type IssueQuery = {
  status: Status;
  sortBy: keyof Issue;
  sortOrder?: SortOrder;
  page: string;
};

type Props = {
  searchParams: IssueQuery;
  issues: Issue[];
};

export default function IssueTable({ issues, searchParams }: Props) {
  return (
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
  );
}

export const sortOrders = ['asc', 'desc'] as const;
export type SortOrder = (typeof sortOrders)[number];
export type OrderBy = { [Property in keyof Issue]?: SortOrder };

type Column = { label: string; value: keyof Issue; className?: string };
const columns: Column[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];
export const columnNames = columns.map((col) => col.value);
