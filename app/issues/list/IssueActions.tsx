import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';

export default function IssueActions() {
  return (
    <Flex mb='5' justify='between'>
      <IssueStatusFilter />
      <Button>
        <Link
          className='flex justify-center items-center w-full h-full'
          href='/issues/new'
        >
          New Issue
        </Link>
      </Button>
    </Flex>
  );
}
