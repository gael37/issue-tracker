import prisma from '@/prisma/client';
import { Avatar, Card, Flex, Heading, Table, Text } from '@radix-ui/themes';
import React from 'react';
import { IssueStatusBadge } from '../components';
import Link from 'next/link';

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 6,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card className='w-full h-full'>
      <Flex justify='between'>
        <Heading size="4" mb="5">Latest Issues</Heading>
        <Text size="2" mb="5">Assigned to</Text>
      </Flex>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between" align="center">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>
                      {issue.title}
                    </Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Flex align='center' justify='start' gap='1'>
                      {/* <Avatar
                        src={issue.assignedToUser.image!}
                        fallback="👤"
                        size="2"
                        radius="full"
                      /> */}
                      <p className='text-black'>{(issue.assignedToUser.name!).split(' ')[0]}</p>
                    </Flex>

                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
