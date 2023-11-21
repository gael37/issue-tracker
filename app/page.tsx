import prisma from '@/prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import { Metadata } from 'next';
import IssueChart from './IssueChart';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import PieChart from './PieChart'
import joli from '@/assets/joli.jpg';
import Image from 'next/image';


export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: 'OPEN' },
  });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED' },
  });

  return (
    <>
      {/* <IssueSummary
        open={open}
        inProgress={inProgress}
        closed={closed}
      /> */}
      <Grid columns={{ initial: '1', md: '2' }} gap="5" justify='start' className='mt-1'>
        <Flex direction="column" gap="5" align={'center'} className='justify-start'	>


          <LatestIssues />
          {/* <Image src={joli} alt='programming' className='rounded-2xl w-3/4 h-3/4' /> */}

        </Flex>
        <Flex direction="column" gap="5">

          <IssueChart
            open={open}
            inProgress={inProgress}
            closed={closed}
          />
          <PieChart
            open={open}
            inProgress={inProgress}
            closed={closed} />
        </Flex>
      </Grid>
    </>
  );
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues'
};