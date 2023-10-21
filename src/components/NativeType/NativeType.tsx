import { Box, Popover, useTheme } from '@mui/material'
import InteractiveText from '../InteractiveText'
import { Fragment } from 'react'
import {
  bindTrigger,
  bindPopover
} from 'material-ui-popup-state/hooks'
import PopupState from 'material-ui-popup-state'
import TypeDefinition from '../TypeDefinition'

interface NativeTypeProps {
  popover?: boolean
  type: string
}

export default function NativeType({ popover = false, type }: NativeTypeProps) {
  const theme = useTheme()

  if (popover) {
    return (
      <PopupState variant="popover">
        {(popupState) => (
          <Fragment>
            <Box component="span" sx={{ color: 'secondary.main' }} {...bindTrigger(popupState)}>
              <InteractiveText>
                {type}
              </InteractiveText>
            </Box>

            <Popover
              {...bindPopover(popupState)}
              PaperProps={{
                sx: {
                  border:     `solid 1px ${theme.extensions.typeInfoBorderColor}`, 
                  whiteSpace: 'nowrap',
                  overflowX:  'auto' 
                }
              }}
              anchorOrigin={{
                vertical:   'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical:   'top',
                horizontal: 'center'
              }}
            >
              <TypeDefinition type={type} />
            </Popover>
          </Fragment>
        )}
      </PopupState>
    )
  }

  return (
    <Box component="span" sx={{ color: 'secondary.main' }}>
      {type}
    </Box>
  )
}
