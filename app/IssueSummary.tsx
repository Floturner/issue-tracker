import { Status } from '@prisma/client';
import { Card, Flex, Grid, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { StatData } from './page';

type Props = {
  stat: StatData;
};

export default function IssueSummary({ stat }: Props) {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: 'Open Issues', value: stat.open, status: Status.OPEN },
    {
      label: 'In-progress Issues',
      value: stat.inProgress,
      status: Status.IN_PROGRESS,
    },
    { label: 'Closed Issues', value: stat.closed, status: Status.CLOSED },
  ];

  return (
    <Grid columns='3' gap='4'>
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction='column' gap='1'>
            <Link
              className='text-sm font-medium'
              href={`/issues/list?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size='5' color='blue' className='font-bold'>
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Grid>
  );
}
