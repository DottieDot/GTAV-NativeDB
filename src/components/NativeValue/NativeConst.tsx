import { Box, Popover, useTheme } from '@mui/material'
import InteractiveText from '../InteractiveText'
import { Fragment } from 'react'
import {
  bindTrigger,
  bindPopover
} from 'material-ui-popup-state/hooks'
import PopupState from 'material-ui-popup-state'
import ConstDefinition from '../ConstDefinition'

export interface NativeConstProps {
  constName: string
  popover?: boolean
}

export default function NativeConst({ constName, popover }: NativeConstProps) {
  const theme = useTheme()

  if (popover) {
    return (
      <PopupState variant="popover">
        {(popupState) => (
          <Fragment>
            <Box component="span" sx={{ color: theme.extensions.constantIdentifierHighlight }} {...bindTrigger(popupState)}>
              <InteractiveText>
                {constName}
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
              <ConstDefinition constName={constName} />
            </Popover>
          </Fragment>
        )}
      </PopupState>
    )
  }

  return (
    <Box component="span" sx={{ color: theme.extensions.constantIdentifierHighlight }}>
      {constName}
    </Box>
  )
}
