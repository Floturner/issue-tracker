import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

export default function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button>
      <Link
        className='flex justify-center items-center w-full h-full'
        href={`/issues/edit/${issueId}`}
      >
        <Pencil2Icon className='mr-2' />
        Edit Issue
      </Link>
    </Button>
  );
}
