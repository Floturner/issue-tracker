'use client';

import { Skeleton } from '@/app/components';
import { PatchIssueDto } from '@/app/validationSchemas';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function AssigneeSelect({ issue }: { issue: Issue }) {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/users').then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton height='2rem' />;

  if (error || !users?.length) return null;

  return (
    <Select.Root
      defaultValue={issue.assignedUserId ?? ''}
      onValueChange={async (userId) => {
        axios.patch<any, any, PatchIssueDto>(`/api/issues/${issue.id}`, {
          assignedUserId: userId === 'unassigned' ? null : userId,
        });
      }}
    >
      <Select.Trigger placeholder='Assign...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value='unassigned'>Unassigned</Select.Item>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
