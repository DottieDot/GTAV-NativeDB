import { ButtonBase, Typography, alpha, styled } from '@mui/material'
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

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  height:   '2.5rem',
  
  border: '1px solid transparent',

  '&.active': {
    background: alpha(theme.palette.primary.dark, .16) ,
    color:      theme.palette.primary.light,
    border:     '1px solid rgba(255, 255, 255, .1)'
  },

  borderRadius: '200px',
  
  overflow: 'hidden'
}))

const ActionArea = styled(ButtonBase)(({ theme }) => ({
  position:            'absolute',
  display:             'grid',
  gridTemplateColumns: '2rem 1fr',
  width:               'auto',
  minWidth:            '100%',
  height:              '100%',
  padding:             theme.spacing(0, 1)
}))

const Icon = styled('div')({
  display:     'flex',
  alignSelf:   'center',
  justifySelf: 'center',
  fontSize:    '1.2em'
})

const Label = styled(Typography)({
  alignSelf:   'center',
  justifySelf: 'left',
  whiteSpace:  'nowrap'
})

export function NavigationItem({ children, href, target, onClick, activeHref, label }: RibbonButtonProps) {
  const location = useLocation()

  if (target) {
    return (
      <Container>
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
      <Container className={active ? 'active' : 'undefined'}>
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
    <Container>
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
