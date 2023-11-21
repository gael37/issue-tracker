import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import IssueStatusFilter from './IssueStatusFilter';

const IssueActions = () => {
  return (
    <Flex justify="start" gap='7' align='center' className='mb-3'>
      <IssueStatusFilter />

      <Link href="/issues/new" className='button-link-new'>+ New Issue</Link>

    </Flex>
  );
};

export default IssueActions;
