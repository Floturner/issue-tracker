import { Button } from '@radix-ui/themes';
import Link from 'next/link';

export default function IssuesPage() {
  return (
    <div>
      <Button>
        <Link href='/issues/new'>New Issue</Link>
      </Button>
    </div>
  );
}
