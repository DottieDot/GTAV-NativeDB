import { Brightness6 as ModeIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { Autocomplete, Box, IconButton, styled, TextField } from '@mui/material'
import { ChangeEvent, Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useCustomTheme } from '../../hooks'
import SettingsControl from '../SettingsControl'
import ThemeColor from './ThemeColor'
import { ThemeColors, useThemesContext } from '../../context'

const ColorGrid = styled('div')(({ theme }) => ({
  display:             'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap:                 theme.spacing(2)
}))

interface ThemeEditorProps {
  themeId: string
}

interface Color {
  label: string
  prop: keyof ThemeColors
}
const colors: Color[] = [
  {
    label: 'Primary Color',
    prop:  'primary'
  },
  {
    label: 'Secondary Color',
    prop:  'secondary'
  },
  {
    label: 'Text Color',
    prop:  'text'
  },
  {
    label: 'Background Color',
    prop:  'background'
  },
  {
    label: 'Paper Color',
    prop:  'paper'
  },
  {
    label: 'Native Value Color',
    prop:  'nativeValueHighlight'
  },
  {
    label: 'Constant Identifier Color',
    prop:  'constantIdentifierHighlight'
  },
  {
    label: 'Type Info Border Color',
    prop:  'typeInfoBorderColor'
  },
  {
    label: 'Parameter Color',
    prop:  'parameterColor'
  },
  {
    label: 'Symbol Color',
    prop:  'symbolColor'
  }
]

function ThemeEditor({ themeId }: ThemeEditorProps) {
  const { patchTheme, removeTheme } = useThemesContext()
  const theme = useCustomTheme(themeId)
  const [ name, setName ] = useState(theme?.name ?? '')

  useEffect(() => {
    setName(theme?.name ?? '')
  }, [ theme?.name ])

  const handleColorChanged = useCallback((prop: keyof ThemeColors, value: string) => {
    patchTheme(themeId, { colors: { [prop]: value }})
  }, [ patchTheme, themeId ])

  const handleModeChanged = useCallback((_: unknown, value: string) => {
    if (value === 'light' || value === 'dark') {
      patchTheme(themeId, { mode: value })
    }
  }, [ patchTheme, themeId ])

  const handleDelete = useCallback(() => {
    removeTheme(themeId)
  }, [ removeTheme, themeId ])

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }, [])

  const handleBlur = useCallback((_: unknown) => {
    if (name !== '') {
      patchTheme(themeId, { name })
    }
  }, [ name, themeId, patchTheme ])

  if (!theme) {
    return null
  }

  return (
    <Fragment>
      <Box
        sx={{
          display:       'flex',
          flexDirection: 'row',
          alignItems:    'center',
          gap:           2
        }}
      >
        <TextField
          error={!name}
          label="Name"
          onBlur={handleBlur}
          onChange={handleNameChange}
          sx={{ flex: 1 }}
          value={name}
          variant="filled"
          required
        />

        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>

      <SettingsControl
        icon={ModeIcon}
        label="Mode"
      >
        <Autocomplete
          onChange={handleModeChanged}
          options={[ 'dark', 'light' ]}
          renderInput={(params) => <TextField {...params} />}
          size="small"
          sx={{ width: 200 }}
          value={theme.mode}
          disableClearable
          disablePortal
        />
      </SettingsControl>

      <ColorGrid>
        {colors.map(({ label, prop }) => (
          <ThemeColor
            key={prop}
            label={label}
            onChange={handleColorChanged}
            prop={prop}
            themeColor={theme.colors[prop]}
          />
        ))}
      </ColorGrid>
    </Fragment>
  )
}

export default memo(ThemeEditor)
