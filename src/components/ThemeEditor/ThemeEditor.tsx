import { Brightness6 as SystemIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { Autocomplete, Box, IconButton, Paper, styled, TextField, Typography } from '@mui/material'
import { ChangeEvent, Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useCustomTheme } from '../../hooks'
import { CustomThemeColors, patchTheme, removeTheme } from '../../store'
import ThemeColor from './ThemeColor'

const ColorGrid = styled('div')(({theme}) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: theme.spacing(2)
}))

interface ThemeEditorProps {
  themeId: string
}

interface Color {
  label: string
  prop: keyof CustomThemeColors
}
const colors: Color[] = [
  {
    label: 'Primary Color',
    prop: 'primary'
  },
  {
    label: 'Secondary Color',
    prop: 'secondary'
  },
  {
    label: 'Text Color',
    prop: 'text'
  },
  {
    label: 'Background Color',
    prop: 'background'
  },
  {
    label: 'Paper Color',
    prop: 'paper'
  },
  {
    label: 'Native Value Color',
    prop: 'nativeValueHighlight'
  },
  {
    label: 'Constant Identifier Color',
    prop: 'constantIdentifierHighlight'
  },
  {
    label: 'Type Info Border Color',
    prop: 'typeInfoBorderColor'
  },
  {
    label: 'Parameter Color',
    prop: 'parameterColor'
  },
  {
    label: 'Symbol Color',
    prop: 'symbolColor'
  }
]

function ThemeEditor({ themeId }: ThemeEditorProps) {
  const dispatch = useDispatch()
  const theme = useCustomTheme(themeId)
  const [name, setName] = useState(theme?.name ?? '')

  useEffect(() => {
    setName(theme?.name ?? '')
  }, [theme?.name])

  const handleColorChanged = useCallback((prop: keyof CustomThemeColors, value: string) => {
    dispatch(patchTheme(themeId, {
      colors: {
        [prop]: value
      }
    }))
  }, [dispatch, themeId])

  const handleModeChanged = useCallback((_: unknown, value: string) => {
    if (value === 'light' || value === 'dark') {
      dispatch(patchTheme(themeId, {
        mode: value
      }))
    }
  }, [dispatch, themeId])

  const handleDelete = useCallback(() => {
    dispatch(removeTheme(themeId))
  }, [dispatch, themeId])

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }, [])

  const handleBlur = useCallback((_: unknown) => {
    if (name !== '') {
      dispatch(patchTheme(themeId, {
        name
      }))
    }
  }, [name, themeId, dispatch])

  if (!theme) {
    return null
  }

  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2
        }}
      >
        <TextField
          label="Name"
          value={name}
          variant="filled"
          sx={{ flex: 1 }}
          onChange={handleNameChange}
          onBlur={handleBlur}
          error={!name}
          required
        />
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          background: 'none',
          p: 1,
          pl: 2
        }}
        variant="outlined"
      >
        <Typography sx={{ flex: 1, display: 'flex', alignItems: 'center' }} variant="body1">
          <SystemIcon fontSize="small" sx={{ mr: 1 }} /> Mode
        </Typography>
        <Autocomplete
          options={['dark', 'light']}
          value={theme.mode}
          onChange={handleModeChanged}
          renderInput={(params) => <TextField {...params} sx={{ textTransform: 'capitalize' }} />}
          size="small"
          sx={{ width: 200 }}
          disableClearable
          disablePortal
        />
      </Paper>
      <ColorGrid>
        {colors.map(({ label, prop }) => (
          <ThemeColor
            key={prop}
            label={label}
            prop={prop}
            onChange={handleColorChanged}
            themeColor={theme.colors[prop]}
          />
        ))}
      </ColorGrid>
    </Fragment>
  )
}

export default memo(ThemeEditor)
