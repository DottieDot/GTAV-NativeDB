import { ButtonBase, Paper, Typography, alpha, styled } from '@mui/material'
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

type RibbonButtonProps = (RibbonButtonLink | RibbonButtonExternalLink | RibbonButtonAction) & { children: ReactNode, label: string }

interface ContainerProps {
  active?: boolean
}

const Container = styled(Paper)<ContainerProps>(({ theme, active }) => ({
  position: 'relative',
  height:   '2.5rem',
  
  background: active ? alpha(theme.palette.primary.dark, .16) : undefined,
  color:      active ? theme.palette.primary.light : undefined,

  
  overflow: 'hidden'
}))

const ActionArea = styled(ButtonBase)({
  position:            'absolute',
  display:             'grid',
  gridTemplateColumns: '2.5rem 1fr',
  width:               'auto',
  minWidth:            '100%',
  height:              '100%'
})

const Icon = styled('div')({
  display:     'flex',
  alignSelf:   'center',
  justifySelf: 'center',
  fontSize:    '1.4em'
})

const Label = styled(Typography)({
  alignSelf:   'center',
  justifySelf: 'left',
  whiteSpace:  'nowrap'
})

export function RibbonButton({ children, href, target, onClick, activeHref, label }: RibbonButtonProps) {
  const location = useLocation()

  if (target) {
    return (
      <Container variant='outlined'>
        <ActionArea 
          // https://github.com/mui/material-ui/issues/31194
          // @ts-ignore
          component="a"
          href={href}
          target={target}  
        >
          <Icon>
            {children}
          </Icon>

          <Label variant="body1">
            {label}
          </Label>
        </ActionArea>
      </Container>
    )
  }
  if (href) {
    const active = location?.pathname.includes(activeHref ?? href)
    return (
      <Container active={active} variant='outlined'>
        <ActionArea
          // https://github.com/mui/material-ui/issues/31194
          // @ts-ignore
          component={Link}
          to={href}
        >
          <Icon>
            {children}
          </Icon>

          <Label variant="body1">
            {label}
          </Label>
        </ActionArea>
      </Container>
    )
  }

  return (
    <Container variant='outlined'>
      <ActionArea onClick={onClick}>
        <Icon>
          {children}
        </Icon>

        <Label variant="body1">
          {label}
        </Label>
      </ActionArea>
    </Container>
  )
}
