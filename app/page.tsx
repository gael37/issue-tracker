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
    'Sort and update issues',
    'Assignments',
    'Statistical overview',
    'Sign up with Google'
  ]
  return (
    <section className='landing-section-home lg:landing-section'>

      <div className='max-w-6xl pt-4 md:pt-24 mx-auto pl-5 pr-5'>
        <Grid columns={{ initial: '1', md: '2' }} gap="5" justify='start' className='mt-1'>
          <Flex direction="column" gap="6" align={'start'} className='justify-start text-white'	>
            <Heading size='8'>Track and assign issues within your team</Heading>
            <Text size='5'>
              With this issue tracker, easily keep track of what problem your team is working on. Have a better control on issue handling using updating, assigning, and sorting features in a secured way.

            </Text>
            <Heading>Features</Heading>
            {features.map(feature => (
              <Flex key={feature} gap='3' className='ml-2'>
                <Image src={valid} width={24} height={20} alt='icon feature' />
                <p>{feature}</p>
              </Flex>
            ))}

          </Flex >



          <Flex direction="column" gap="6" align={'start'} className=''>

            <Flex gap='9' className='mt-5 lg:mt-0 lg:h-80 w-full flex-wrap lg:flex-nowrap'>
              <Image src={image18} width={300} height={400} alt='image 18' />
              <Flex direction="column" gap="6" align={'start'} className='justify-start h-80 '>
                <Image src={image21} width={100} height={200} alt='image 21 ' className='' />
                <Image src={image19} width={500} height={600} alt='image 19' className='pl-5 ' />
                <Image src={image23} width={80} height={20} alt='image 23' className='pl-5 ' />
              </Flex>
            </Flex>

            <Text className='text-white mt-16 sm:mt-36 lg:mt-0' size='4'>
              Create your account now and post your first issue, browse through the list and visit the dashboard for a statistical overview of the current issues handling.
            </Text>

            <button className='button-link-2 self-center mb-5'>
              <Link href='/issues/list'>Get Started</Link>
            </button>

          </Flex>





        </Grid>
      </div>
    </section>
  )
}

export default landingPage