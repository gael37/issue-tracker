import prisma from '@/prisma/client';
import { Box, Flex, Grid, Heading } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';
import { cache } from 'react';

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }));

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound();

  return (
    <section className='landing-section'>

      <div className='max-w-6xl pt-24 mx-auto pl-5 pr-5'>
        {session && (
          <Flex gap='5' className=''>
            <Heading className='text-white hidden sm:block'>Assign to:</Heading>
            <div className=' light-blue-bg rounded-md inline-block mb-10 '>
              <AssigneeSelect issue={issue} />
            </div>
          </Flex>
        )}

        <Grid columns={{ initial: '1', sm: '5' }} gap="5">

          <Box className="md:col-span-4">
            <IssueDetails issue={issue} />
          </Box>
          {session && (
            <Box>
              <Flex direction="column" gap="4">

                <EditIssueButton issueId={issue.id} />
                <DeleteIssueButton issueId={issue.id} />
              </Flex>
            </Box>
          )}
        </Grid>
      </div>
    </section>

  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id
  }
}

export default IssueDetailPage;
