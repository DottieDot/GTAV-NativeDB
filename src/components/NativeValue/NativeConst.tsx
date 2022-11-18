import { Box, Popover } from '@mui/material'
import InteractiveText from '../InteractiveText'
import { Fragment } from 'react'
import {
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks'
import PopupState from 'material-ui-popup-state'
import ConstDefinition from '../ConstDefinition'

export interface NativeConstProps {
  constName: string
  popover?: boolean
}

export default function NativeConst({ constName, popover }: NativeConstProps) {
  if (popover) {
    return (
      <PopupState variant="popover">
        {(popupState) => (
          <Fragment>
            <Box sx={{ color: 'deepskyblue' }} component="span" {...bindTrigger(popupState)}>
              <InteractiveText>
                {constName}
              </InteractiveText>
            </Box>
            <Popover
              {...bindPopover(popupState)}
              PaperProps={{ sx: { border: 'solid 2px rgba(255, 255, 255, .5)' } }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
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
    <Box sx={{ color: 'deepskyblue' }} component="span">
      {constName}
    </Box>
  )
}
