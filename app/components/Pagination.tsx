'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Flex, IconButton, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
};

export default function Pagination({
  itemCount,
  pageSize,
  currentPage,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount <= 1) return null;

  function changePage(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  }

  return (
    <Flex justify='center' align='center' gap='2'>
      <Text size='2'>
        Page {currentPage} of {pageCount}
      </Text>
      <IconButton
        variant='soft'
        color='gray'
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </IconButton>
      <IconButton
        variant='soft'
        color='gray'
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        variant='soft'
        color='gray'
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </IconButton>
      <IconButton
        variant='soft'
        color='gray'
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </IconButton>
    </Flex>
  );
}
