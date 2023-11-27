import prisma from '@/prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import { Metadata } from 'next';
import PieChart from './PieChart';
import IssueChart from './IssueChart';
import LatestIssues from './LatestIssues';


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
      <section className='landing-section'>
        <div className='max-w-6xl  mx-auto p-5 pt:10 lg:pt-24'>
          <Grid columns={{ initial: '1', md: '2' }} gap="5" justify='start' className='mt-1'>
            <Flex direction="column" gap="5" align={'center'} className='justify-start order-last lg:order-first'	>


              <LatestIssues />
              {/* <Image src={joli} alt='programming' className='rounded-2xl w-3/4 h-3/4' /> */}

            </Flex>
            <Flex direction="column" gap="5" className='order-first lg:order-last'>

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
        </div>
        {/* <Image src={joli} width={500} height={500} alt='computing issues' className='rounded-xl' /> */}
      </section>


    </>
  );
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues'
};