'use client';

import { Card } from '@radix-ui/themes';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { StatData } from './page';

type Props = {
  stat: StatData;
};

export default function IssueChart({ stat }: Props) {
  const data: { label: string; value: number }[] = [
    { label: 'Open', value: stat.open },
    { label: 'In-progress', value: stat.inProgress },
    { label: 'Closed', value: stat.closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <XAxis dataKey='label' />
          <YAxis />
          <Bar
            dataKey='value'
            barSize={50}
            style={{ fill: 'var(--accent-9)' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
