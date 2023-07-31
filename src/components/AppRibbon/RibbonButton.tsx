import { ButtonBase, Paper, styled } from '@mui/material'
import { MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface RibbonButtonLink {
  href: string
  target?: undefined
  onClick?: undefined
}

interface RibbonButtonExternalLink {
  href: string
  target: string
  onClick?: undefined
}

interface RibbonButtonAction {
  onClick: MouseEventHandler<HTMLElement>
  href?: undefined
  target?: undefined
}

// interface RibbonButtonProps {
//   children: ReactNode,
//   href: string
// }

type RibbonButtonProps = (RibbonButtonLink | RibbonButtonExternalLink | RibbonButtonAction) & { children: ReactNode }

const Container = styled(Paper)({
  paddingTop: '100%',
  position: 'relative',
  overflow: 'hidden'
})

const Button = styled(ButtonBase)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  fontSize: '1.4em'
})

export function RibbonButton({ children, href, target, onClick }: RibbonButtonProps) {
  if (target) {
    return (
      <Container variant='outlined'>
        <Button
          // https://github.com/mui/material-ui/issues/31194
          // @ts-ignore
          component="a"
          href={href}
          target={target}
        >
          {children}
        </Button>
      </Container>
    )
  }
  if (href) {
    return (
      <Container variant='outlined'>
        <Button
          // https://github.com/mui/material-ui/issues/31194
          // @ts-ignore
          component={Link}
          to={href}
        >
          {children}
        </Button>
      </Container>
    )
  }

  return (
    <Container variant='outlined'>
      <Button 
        onClick={onClick}
      >
        {children}
      </Button>
    </Container>
  )
}
