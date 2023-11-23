'use client';

import { Container } from '@radix-ui/themes';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

export default function NavBar() {
  const path = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  return (
    <Container className=' border-b mb-5 p-5'>
      <nav className='flex space-x-6 items-center'>
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
      </nav>
    </Container>
  );
}
