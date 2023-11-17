import { Text } from '@radix-ui/themes';
import React, { PropsWithChildren } from 'react';

export default function ErrorMessage({ children }: PropsWithChildren) {
  if (!children) return null;

  return (
    <Text as='p' color='red'>
      {children}
    </Text>
  );
}
