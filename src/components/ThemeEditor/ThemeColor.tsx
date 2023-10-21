import { Card, CardActionArea, CardContent, CardMedia, Popover, styled, TextField, Typography, useTheme } from '@mui/material'
import PopupState from 'material-ui-popup-state'
import { bindPopover, bindTrigger } from 'material-ui-popup-state/hooks'
import { ChangeEvent, Fragment, memo, useCallback, useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import useDebouncedEffect from 'use-debounced-effect'
import { ThemeColors } from '../../context'

const Picker = styled(HexColorPicker)(() => ({
  '&&':                                                { flexDirection: 'column-reverse' },
  '.react-colorful__hue':                              { borderBottom: '1px solid white' },
  '.react-colorful__hue, .react-colorful__saturation': { borderRadius: 0 },
  '.react-colorful__saturation-pointer':               {
    width:  14,
    height: 14
  }
}))

interface ThemeColorProps {
  label: string
  prop: keyof ThemeColors
  themeColor: string
  onChange: (prop: keyof ThemeColors, value: string) => void
}

function ThemeColor({ label, themeColor, prop, onChange }: ThemeColorProps) { 
  const { extensions } = useTheme()
  const [ color, setColor ] = useState(themeColor)
  const [ input, setInput ] = useState(color)

  useDebouncedEffect(() => {
    onChange(prop, color)
  }, 300, [ color, prop ])

  useEffect(() => {
    setInput(color)
  }, [ color ])

  useEffect(() => setColor(themeColor), [ themeColor ])
  
  const handleInputChanged = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)

    if (e.target.value.match(/#[0-9a-f]{6}/gi)) {
      setColor(e.target.value)
    }
  }, [])

  return (
    <PopupState variant="popover">
      {(popupState) => (
        <Fragment>
          <Card sx={{ width: '100%' }}>
            <CardActionArea {...bindTrigger(popupState)}>
              <CardMedia
                sx={{
                  height:          100,
                  backgroundColor: color 
                }}
              />
            </CardActionArea>

            <CardContent>
              <Typography component="div" variant="body1" gutterBottom>
                {label}
              </Typography>

              <TextField
                error={color !== input}
                label="Hex"
                onChange={handleInputChanged}
                value={input}
                variant="standard"
              />
            </CardContent>
          </Card>

          <Popover
            {...bindPopover(popupState)}
            PaperProps={{
              sx: {
                border:     `solid 4px ${extensions.typeInfoBorderColor}`,
                whiteSpace: 'nowrap',
                overflow:   'hidden'
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
            <Picker color={color} onChange={setColor} />
          </Popover>
        </Fragment>
      )}
    </PopupState>
  )
}
export default memo(ThemeColor)
