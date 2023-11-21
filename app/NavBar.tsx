"use client";

import { Skeleton, Spinner } from "@/app/components";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { signOut, useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import bug from '@/assets/bug.jpeg';
// import userLogo from '@/assets/user.png';
import userlogo from '@/assets/user-logo.png';
import img from '@/assets/user3.png';
import { FaChevronDown } from "react-icons/fa6";



const NavBar = () => {

  return (
    <nav className="p-2 border-2 border-b-slate-200 ">
      <Container className="">
        <Flex justify="between" className="items-center h-16">
          <Flex align="center" gap="3">
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
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
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
  );
};

const AuthStatus = () => {
  const [isSubmitting, setSubmitting] = useState(false);

  const router = useRouter()
  const handleLogout = async () => {
    try {
      setSubmitting(true);

      const result = await signOut()
      router.push('/')
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
      <Flex gap='5'>
        <Link href="/login">
          <p className='button-link'>Login</p>
        </Link>
        {/* <Link href="/register">
          <p className='button-link'>register</p>
        </Link> */}
      </Flex>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Flex align='center' gap='2' className="hover:cursor-pointer">

            <Avatar
              src={session!.user!.image!}
              fallback={<Image src={img} alt='user' />}
              size="4"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
            <p className="text-black text-xl font-medium">Hi {session!.user!.name}!</p>
            <FaChevronDown />

          </Flex>

        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Button onClick={handleLogout} className="button-link w-full hover:p-0"><p>Log out </p>{isSubmitting && <Spinner />}
            </Button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
