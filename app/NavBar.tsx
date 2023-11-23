'use client';

import { Skeleton } from '@/app/components';
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

export default function NavBar() {
  return (
    <nav>
      <Container mb='5' className='border-b'>
        <Flex gap='5' p='5' align='center' justify='between'>
          <Flex gap='5' align='center'>
            <Link href='/'>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

function NavLinks() {
  const path = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  return (
    <ul className='flex space-x-6'>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              'text-zinc-900 font-semibold': link.href === path,
              'nav-link': link.href !== path,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function AuthStatus() {
  const { status, data: session } = useSession();

  if (status === 'loading') return <Skeleton width='3rem' />;

  if (status === 'unauthenticated') {
    return (
      <Box>
        <Link className='nav-link' href='/api/auth/signin'>
          Login
        </Link>
      </Box>
    );
  }

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            className='cursor-pointer'
            src={session!.user!.image ?? undefined}
            fallback='?'
            radius='full'
            referrerPolicy='no-referrer'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size='2'>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link
              className='flex items-center w-full h-full'
              href='/api/auth/signout'
            >
              Log out
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
}
