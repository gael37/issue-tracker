import { Button, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import Image from 'next/image';
import React from 'react'
import { RxCheckCircled } from "react-icons/rx";
import valid from '@/assets/valid.png'
import image12 from '@/assets/image 12.png'
import image13 from '@/assets/image 13.png'
import image14 from '@/assets/image 14.png'
import image16 from '@/assets/image 16.png'
import image18 from '@/assets/image 18.png'
import image19 from '@/assets/image 19.png'
import image20 from '@/assets/image 20.png'
import image21 from '@/assets/image 21.png'
import image22 from '@/assets/image 22.png'
import image23 from '@/assets/image23.png'
import Link from 'next/link';
import { FaArrowRightLong } from "react-icons/fa6";





const landingPage = () => {

  const features: string[] = [
    'Gated Content',
    'Update and Assign Issues',
    'Sort issues',
    'Dashboard Overview'
  ]
  return (
    <section className='landing-section'>

      <div className='max-w-6xl pt-24 mx-auto pl-5 pr-5'>
        <Grid columns={{ initial: '1', md: '2' }} gap="5" justify='start' className='mt-1'>
          <Flex direction="column" gap="6" align={'start'} className='justify-start text-white'	>
            <Heading size='8'>Track and assign issues within your team</Heading>
            <Text size='5'>
              With IssueHub, easily keep track of issues within your team and control with assigments and updates.
              With IssueHub, easily keep track of issues within your team and control with assigments and updates.

            </Text>
            <Heading>Features</Heading>
            {features.map(feature => (
              <Flex key={feature} gap='3' className='ml-2'>
                <Image src={valid} width={24} height={20} alt='icon feature' />
                <p>{feature}</p>
              </Flex>
            ))}

          </Flex >


          <div>
            <Flex direction="column" gap="6" align={'start'} className=''>
              <Flex gap='9' className='h-80 w-full'>
                <Image src={image18} width={300} height={400} alt='image 18' />
                <Flex direction="column" gap="6" align={'start'} className='justify-start h-80 '>
                  <Image src={image21} width={100} height={200} alt='image 21 ' className='invisible md:visible' />
                  <Image src={image19} width={500} height={600} alt='image 19' className='pl-5 invisible md:visible' />
                  <Image src={image23} width={80} height={20} alt='image 23' className='pl-5 invisible lg:visible' />

                </Flex>
              </Flex>


            </Flex>

            <Flex gap='7' justify='start' direction='column' className='mt-10'>
              { }
              <Text className='text-white' size='3'>
                Create your account now to to post your own issue, or simply browse through the list and the dashboard to have a visual overview of how they are currently handled.

              </Text>
              <button className='button-link-2 self-center'>
                <Link href='/issues/list'>Get Started</Link>
              </button>
              <button className='button-link-2 mx-auto hidden cree-2'>
                <Link href='/login'>Login</Link>
              </button>


              {/* <button className='button-link-2 self-center mt-16'>
                <Link href='/login'>Login</Link>
              </button> */}
            </Flex>
          </div>




        </Grid>
      </div>
    </section>
  )
}

export default landingPage