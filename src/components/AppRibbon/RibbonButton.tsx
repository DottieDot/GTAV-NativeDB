import { ButtonBase, Paper, alpha, styled } from '@mui/material'
import { MouseEventHandler, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface RibbonButtonLink {
  href: string
  activeHref?: string
  target?: undefined
  onClick?: undefined
}

interface RibbonButtonExternalLink {
  href: string
  target: string
  onClick?: undefined
  activeHref?: undefined
}

interface RibbonButtonAction {
  onClick: MouseEventHandler<HTMLElement>
  href?: undefined
  target?: undefined
  activeHref?: undefined
}

type RibbonButtonProps = (RibbonButtonLink | RibbonButtonExternalLink | RibbonButtonAction) & { children: ReactNode }

interface ContainerProps {
  active?: boolean
}

const Container = styled(Paper)<ContainerProps>(({ theme, active }) => ({
  paddingTop: '100%',
  position: 'relative',
  overflow: 'hidden',
  background: active ? alpha(theme.palette.primary.dark, .16) : undefined,
  color: active ? theme.palette.primary.light : undefined,
}))

const Button = styled(ButtonBase)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  fontSize: '1.4em'
})

export function RibbonButton({ children, href, target, onClick, activeHref }: RibbonButtonProps) {
  const location = useLocation()

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
    const active = location?.pathname.includes(activeHref ?? href)
    return (
      <Container 
        variant='outlined' 
        active={active}
      >
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
