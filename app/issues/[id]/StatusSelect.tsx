'use client';

import { statusList } from '@/app/utils';
import { PatchIssueDto } from '@/app/validationSchemas';
import { Issue, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Props = {
  issue: Issue;
};

export default function StatusSelect({ issue }: Props) {
  const router = useRouter();

  return (
    <Select.Root
      defaultValue={issue.status}
      onValueChange={async (status) => {
        await axios.patch<any, any, PatchIssueDto>(`/api/issues/${issue.id}`, {
          status: status as Status,
        });
        router.refresh();
      }}
    >
      <Select.Trigger placeholder='Status' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          {statusList.map(([k, v]) => (
            <Select.Item key={k} value={k}>
              {v.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
