import { Box } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function LoadingNewIssuePage() {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Skeleton height='20rem' />
    </Box>
  );
}
