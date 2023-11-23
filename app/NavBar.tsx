'use client';

import { Box, Container, Flex } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

export default function NavBar() {
  const path = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  return (
    <nav>
      <Container mb='5' className='border-b'>
        <Flex gap='5' p='5' align='center' justify='between'>
          <Flex gap='5' align='center'>
            <Link href='/'>
              <AiFillBug />
            </Link>
            <ul className='flex space-x-6'>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classNames({
                      'text-zinc-900': link.href === path,
                      'text-zinc-500 hover:text-zinc-800': link.href !== path,
                      'transition-colors': true,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <Link href='/api/auth/signout'>Log out</Link>
            )}
            {status === 'unauthenticated' && (
              <Link href='/api/auth/signin'>Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}
