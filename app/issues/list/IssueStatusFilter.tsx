'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const statuses: { label: string; value: Status | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

type Props = {
  defaultValue?: Status | 'ALL';
};

export default function IssueStatusFilter({ defaultValue = 'ALL' }: Props) {
  const router = useRouter();

  return (
    <Select.Root
      defaultValue={defaultValue}
      onValueChange={(status) => {
        const query = status !== 'ALL' ? `?status=${status}` : '';
        router.push(`/issues/list${query}`);
      }}
    >
      <Select.Trigger placeholder='Filter by status...' />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
