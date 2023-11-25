import Pagination from '@/app/components/Pagination';
import { APP_NAME } from '@/app/layout';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';
import IssueActions from './IssueActions';
import IssueTable, {
  IssueQuery,
  OrderBy,
  SortOrder,
  columnNames,
  sortOrders,
} from './IssueTable';

const pageSize = 10;

type Props = {
  searchParams: IssueQuery;
};

export default async function IssuesPage({ searchParams }: Props) {
  const { status, orderBy, page } = validateQueryParams(searchParams);
  const where = { status };

  const [issues, issueCount] = await Promise.all([
    prisma.issue.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.issue.count({ where, orderBy }),
  ]);

  return (
    <Flex direction='column' gap='5'>
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination currentPage={page} itemCount={issueCount} pageSize={10} />
    </Flex>
  );
}

function validateQueryParams(params: Props['searchParams']): {
  status?: Status;
  orderBy?: OrderBy;
  page: number;
} {
  const statuses = Object.values(Status);
  const status = statuses.includes(params.status) ? params.status : undefined;

  const sortOrder: SortOrder =
    params.sortOrder && sortOrders.includes(params.sortOrder)
      ? params.sortOrder
      : 'asc';

  let orderBy: OrderBy | undefined = undefined;
  if (columnNames.includes(params.sortBy)) {
    orderBy = { [params.sortBy]: sortOrder };
  }

  let page = parseInt(params.page, 10);
  page = isNaN(page) ? 1 : page;

  return { status, orderBy, page };
}

export const metadata: Metadata = {
  title: `Issue List - ${APP_NAME}`,
  description: 'View all project issues.',
  openGraph: {
    title: `Issue List - ${APP_NAME}`,
    description: 'View all project issues.',
  },
};
