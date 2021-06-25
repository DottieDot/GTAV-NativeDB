import { AppBar as MaterialAppBar, Box, BoxProps, Divider, IconButton, Link, Toolbar, Tooltip, Typography } from '@material-ui/core'
import { GitHub as GithubIcon } from '@material-ui/icons'
import React, { memo, RefObject } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useStats } from '../../hooks'

export interface AppBarProps extends BoxProps {
  toolbarRef?: RefObject<HTMLDivElement>
}

function AppBar({ toolbarRef, ...rest }: AppBarProps) {
  const stats = useStats()

  return (
    <Box {...rest}>
      <MaterialAppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div">
            <Link
              to="/natives"
              color="inherit"
              underline="none"
              component={RouterLink}
            >
              GTA V Native Reference
            </Link>
          </Typography>
          <Tooltip title="View on GitHub" sx={{ mx: 1 }}>
            <IconButton
              aria-label="view on github" 
              color="inherit"
              href="https://github.com/DottieDot/GTAV-NativeDB/tree/v2"
              target="_blank"
            >
              <GithubIcon />
            </IconButton>
          </Tooltip>
          <div ref={toolbarRef} />
        </Toolbar>
        <Divider variant="fullWidth" />
        <Toolbar variant="dense">
          <Typography variant="subtitle1">
            Namespaces:&nbsp;{stats.namespaces}&nbsp;{'| '}
            Natives:&nbsp;{stats.natives}&nbsp;{'| '}
            Comments:&nbsp;{stats.comments}&nbsp;{'| '}
            Known names:&nbsp;{stats.knownNames.confirmed} ({stats.knownNames.total})&nbsp;{'| '}
            <Link
              to="/generate-header"
              color="inherit"
              underline="hover"
              component={RouterLink}
            >
              Generate&nbsp;code
            </Link>
          </Typography>
        </Toolbar>
      </MaterialAppBar>
    </Box>
  )
}
export default memo(AppBar)
