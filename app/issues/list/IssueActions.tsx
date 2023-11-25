import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import IssueStatusFilter from './IssueStatusFilter';
import { getServerSession } from 'next-auth';




const IssueActions = async () => {

  const session = await getServerSession()

  return (
    <Flex justify="start" gap='7' align='center' className='mb-3'>
      <IssueStatusFilter />

      {session ?
        // <Link href="/issues/new" className='button-link-new'>+ New Issue</Link> :
        <Button><Link href="/issues/new">+ New Issue</Link></Button> :
        <Button><Link href="/login">+ New Issue</Link></Button>
      }


    </Flex>
  );
};

export default IssueActions;
