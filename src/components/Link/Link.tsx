import NextLink, { LinkProps as MantineLinkProps } from 'next/link'
import { Button } from '@mantine/core'

export type LinkProps = MantineLinkProps & {
  children: React.ReactNode
}

export const Link: React.FC<LinkProps> = ({ children, ...other }) => {
  return (
    <NextLink passHref {...other}>
      <Button component='a' variant='subtle'>
        {children}
      </Button>
    </NextLink>
  )
}
