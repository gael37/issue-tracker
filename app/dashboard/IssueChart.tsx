'use client';

import { Card } from '@radix-ui/themes';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  Legend,
  Rectangle,
  Tooltip,
} from 'recharts';
import React from 'react';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  // const data = [
  //   { label: 'Open', value: open },
  //   { label: 'In Progress', value: inProgress },
  //   { label: 'Closed', value: closed },
  // ];
  const data = [
    {
      name: 'Issues',
      Open: open,
      InProgress: inProgress,
      Closed: closed,
    }
  ]

  return (
    <Card className='h-72 w-full'>
      {/* <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: 'var(--accent-9)' }}
          />
        </BarChart>
      </ResponsiveContainer> */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barGap={70}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Open" fill="#e36670" barSize={60} radius={[5, 5, 0, 0]} />
          <Bar dataKey="InProgress" fill="#5e4db1" barSize={60} radius={[5, 5, 0, 0]} />
          <Bar dataKey="Closed" fill="#257e52" barSize={60} radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
