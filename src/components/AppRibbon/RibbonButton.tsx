import { ButtonBase, Paper, styled } from '@mui/material'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface RibbonButtonProps {
  children: ReactNode,
  href: string
}

const Container = styled(Paper)({
  paddingTop: '100%',
  position: 'relative',
  overflow: 'hidden'
})

const Button = styled(ButtonBase)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0
})

export function RibbonButton({ children, href }: RibbonButtonProps) {
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
