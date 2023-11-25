"use client";

import { Skeleton, Spinner } from "@/app/components";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";
import { LiaBugSolid } from "react-icons/lia";
import { RiUser3Line } from "react-icons/ri";
import { LuMenuSquare } from "react-icons/lu";



import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  DropdownMenuItem,
  Flex,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import bug from '@/assets/bug.jpeg';
// import userLogo from '@/assets/user.png';
import userlogo from '@/assets/user-logo.png';
import bug5 from '@/assets/bug5.jpeg';
import img from '@/assets/user3.png';
import { FaChevronDown } from "react-icons/fa6";



const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    // { label: "logo", href: "/landing" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <nav className="bg-slate-200 px-5">
      <Container className="">
        <Flex justify="between" className="items-center h-16">
          <Box className="md:hidden">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Flex align='center' gap='2' className="hover:cursor-pointer">
                  <LuMenuSquare size='40' />
                </Flex>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>
                  <Link
                    className={classnames({
                      "": true,
                      "!text-blue-900": "/" === currentPath,
                    })}
                    href="/"
                  >
                    Home
                  </Link>
                </DropdownMenu.Item>
                {links.map((link) => (
                  <DropdownMenu.Item key={link.href}>
                    <Link
                      className={classnames({
                        "": true,
                        "!text-blue-900": link.href === currentPath,
                      })}
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </DropdownMenu.Item>
                ))}

              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Box>
          <Flex align="center" gap="3" className="sm: hidden md:flex">
            {/* <Link href="/">
              <Image src={bug} alt='ladybird logo' className="rounded-full w-10 h-10" />
            </Link> */}
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    // { label: "logo", href: "/landing" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <>
      <Link href='/'>
        {/* <Image src={bug5} alt='bug5' width={50} /> */}
        <LiaBugSolid size='30' />

      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classnames({
                "nav-link": true,
                "!border-b-2 border-solid border-slate-400 p-2 text-black": link.href === currentPath,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </>

  );
};

const AuthStatus = () => {
  const [isSubmitting, setSubmitting] = useState(false);

  const router = useRouter()
  const handleLogout = async () => {
    try {
      setSubmitting(true);

      signOut({ callbackUrl: 'http://localhost:3000/issues/list' })
      // router.push('/')
    }
    catch (error) {
      console.log('erros when logging out', error)
      setSubmitting(false);

    }
  }


  const { status, data: session } = useSession();
  console.log('session', session)

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")

    return (

      // <Button className="text-lg"><Link href="/login">Login</Link></Button>
      <button className='button-link-3 cree'>
        <Link href='/login'>Login</Link>
      </button>

    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Flex align='center' gap='2' className="hover:cursor-pointer">

            <Avatar
              src={session!.user!.image!}
              fallback={<RiUser3Line />}
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
            <p className="text-black text-sm font-medium">Hi {session!.user!.name}!</p>
            <FaChevronDown />

          </Flex>

        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item className="">
            <button onClick={handleLogout} className="mx-auto w-1/2" ><p>Log out </p>{isSubmitting && <Spinner />}
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
