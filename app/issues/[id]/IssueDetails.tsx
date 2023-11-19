import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import Markdown from 'react-markdown';

export default function IssueDetails({ issue }: { issue: Issue }) {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap='3' my='2'>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose' mt='4'>
        <Markdown>{issue.description}</Markdown>
      </Card>
    </>
  );
}
