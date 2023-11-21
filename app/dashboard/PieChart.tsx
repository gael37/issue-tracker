'use client'

import { Card } from '@radix-ui/themes';
import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, Cell } from 'recharts';



interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const PieC = ({ open, inProgress, closed }: Props) => {


  const data = [
    { name: 'Open', value: open },
    { name: 'In Progress', value: inProgress },
    { name: 'Closed', value: closed },
  ];

  const COLORS = ['#e36670', '#5e4db1', '#257e52'];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel: React.FC<{
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }> = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <Card className='h-52 w-full'>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default PieC