import { Status } from '@prisma/client';

export const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'yellow' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'yellow' },
  CLOSED: { label: 'Closed', color: 'green' },
};

export const statusList = Object.entries(statusMap);
