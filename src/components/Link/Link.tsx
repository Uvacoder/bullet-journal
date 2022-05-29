import NextLink from 'next/link';
import { Button } from '@mantine/core';

export const Link = () => {
  return (
    <NextLink href="/hello" passHref>
      <Button component="a">Next link button</Button>
    </NextLink>
  );
};
