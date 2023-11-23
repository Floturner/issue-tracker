import { Box } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';

export default function IssueFormSkeleton() {
  return (
    <Box className='max-w-xl'>
      <Skeleton height='3rem' />
      <Skeleton height='20rem' />
    </Box>
  );
}
