import { Button, Container, Flex, Heading } from '@radix-ui/themes'
import React from 'react'
import joli2 from '@/assets/joli2.jpg';
import bug from '@/assets/bug.jpeg';
import bug2 from '@/assets/ladybug.jpeg';
import bug3 from '@/assets/bug3.png';
import Image from 'next/image';
import Link from 'next/link';


const page = () => {
  return (
    // <Flex gap='1' direction='column' align='center' justify='start' className='h-full w-full'>
    //   <Heading size='8' className='mt-10 text-purple-800'>BUG TRACKER</Heading>
    //   <Flex align='center' className='m-auto max-w-3xl p-20 justify-center mt-20 gap-20 h-20 bg-purple-800 from-purple-800 to-purple-300 bg-gradient-to-b'>
    //     <Container className='max-w-sm h-80'>
    //       <Image src={joli2} alt='programming issues' className='rounded-2xl h-80' />
    //     </Container>
    //     <Container className='max-w-xs rounded-2xl border-slate-200 border-0 h-80'>
    //       <Flex gap='5' direction='column' align='center' justify='center' className='h-80'>
    //         <Link className="nav-link" href="/api/auth/signin">
    //           <Button>Login</Button>
    //         </Link>
    //         <Link className="nav-link" href="/issues">
    //           <Button>View Issues</Button>
    //         </Link>
    //       </Flex>
    //     </Container>
    //   </Flex >
    // </Flex >
    // <div className='max-w-5xl mx-auto flex justify-center items-center h-[calc(100vh-180px)]'>

    //   <Image src={joli2} alt='programming issues' className='rounded-2xl w-1/3 h-3/4 rounded-r-none' />

    //   <div className='p-10 flex flex-col justify-between items-center w-1/3 h-3/4 rounded-xl  bg-green-100 from-green-800 to-green-600 bg-gradient-to-b rounded-l-none'>
    //     {/* <div className='flex items-center gap-5 '> */}
    //     {/* <Image src={bug} alt='ladybird logo' className="rounded-full w-16 h-16" /> */}
    //     <p className='font-medium text-4xl text-white '>Issue Tracker</p>
    //     {/* </div> */}
    //     <Link href="/issues/list">
    //       <p className='button-link-bigger'>View Issues</p>
    //     </Link>
    //     <div className=' flex justify-center items-center gap-5'>
    //       <Link href="/api/auth/signin" >
    //         <p className='nav-link'>Login</p>
    //       </Link>
    //       <p className='text-white'>/</p>
    //       <Link href="/api/auth/signin" >
    //         <p className='nav-link'>Register</p>
    //       </Link>
    //     </div>
    //   </div>
    // </div>

    <div className='h-screen w-screen bg-cubes'></div>

  )
}

export default page