import { statusMap } from '@/app/utils';
import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

type Props = {
  status: Status;
};

export default function IssueStatusBadge({ status }: Props) {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
}
