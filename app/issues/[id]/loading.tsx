import { Box, Card, Flex } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function LoadingIssueDetailPage() {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Flex gap='3' my='2'>
        <Skeleton width='5rem' />
        <Skeleton width='8rem' />
      </Flex>
      <Card className='prose' mt='4'>
        <Skeleton count={3} />
      </Card>
    </Box>
  );
}
