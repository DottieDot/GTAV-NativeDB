import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import download from 'downloadjs'
import { ChangeEvent, ChangeEventHandler, useCallback, useMemo, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { NativeExporter } from '../../code-generation'
import { CodeGeneratorBaseSettings } from '../../code-generation/CodeGeneratorBase'
import ICodeGenerator from '../../code-generation/ICodeGenerator'
import { Collapsible, NativeSelect, SyntaxHighlighter } from '../../components'
import { useNamespaces, useNative, useNatives } from '../../hooks'

export interface CodeGenOption<TSettings> {
  type : unknown
  label: string
  prop :  Extract<keyof TSettings, string>
}

export interface BooleanCodeGenOption<TSettings> extends CodeGenOption<TSettings> {
  type: 'boolean'
}

export interface StringCodeGenOption<TSettings> extends CodeGenOption<TSettings> {
  type: 'string'
}

export interface ComboCodeGenOption<TSettings> extends CodeGenOption<TSettings> {
  type   : 'combo'
  options: { label: string, value: unknown }[]
}

export interface MultiLineCodeGenOption<TSettings> extends CodeGenOption<TSettings> {
  type: 'multi'
}

type CodeGenOptions<TSettings> = BooleanCodeGenOption<TSettings> | StringCodeGenOption<TSettings> | ComboCodeGenOption<TSettings> | MultiLineCodeGenOption<TSettings>

type CodeGenOptionComponentProps<TSettings> = CodeGenOptions<TSettings> & {
  onChange: (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => void
  value: unknown
}

export function CodeGenOptionComponent<TSettings>(props: CodeGenOptionComponentProps<TSettings>) {
  const { type, label, prop, value, onChange } = props

  switch (type) {
    case 'boolean':
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={value as boolean}
              name={prop}
              onChange={onChange}
            />
          }
          label={label}
          sx={{ userSelect: 'none' }}
        />
      )
    case 'combo':
      return (
        <FormControl fullWidth>
          <InputLabel id={`${prop}-label`}>
            {label}
          </InputLabel>

          <Select
            id={`${prop}-select`}
            label={label}
            labelId={`${prop}-label`}
            name={prop}
            onChange={onChange}
            value={value as string}
          >
            {props.options.map(({ label, value }) => (
              <MenuItem key={value as string} value={value as string}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )
    case 'string':
      return (
        <TextField
          label={label}
          name={prop}
          onChange={(onChange as unknown as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>)}
          value={value}
        />
      )
    case 'multi':
      return (
        <TextField
          label={label}
          name={prop}
          onChange={(onChange as unknown as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>)}
          value={value}
          multiline
        />
      )
  }
}

interface Props<TSettings extends CodeGeneratorBaseSettings> {
  generator      : { new(settings: TSettings): ICodeGenerator }
  defaultSettings: TSettings
  name           : string
  options        : CodeGenOptions<TSettings>[]
  advancedOptions: CodeGenOptions<TSettings>[]
  extension      : string
}

export default 
function Language<TSettings extends CodeGeneratorBaseSettings>({ name, defaultSettings, generator, options, advancedOptions, extension }: Props<TSettings>) {
  const natives = useNatives()
  const namespaces = useNamespaces()
  const [ settings, setSettings ] = useLocalStorageState<TSettings>(`Pages.GenerateCode.${name}`, { defaultValue: defaultSettings })
  const [ previewNative, setPreviewNative ] = useState('0xD49F9B0955C367DE')
  const nativeData = useNative(previewNative)

  const preview = useMemo(() => (
    new NativeExporter(
      new generator(settings)
    ).exportNatives({
      namespaces: {
        [nativeData.namespace]: {
          name:    nativeData.namespace,
          natives: [ nativeData.hash ]
        }
      },
      natives: { [nativeData.hash]: nativeData }
    })
  ), [ settings, nativeData, generator ])

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
    if (!(event.target.name in settings)) {
      return
    }

    const type = typeof settings[event.target.name as (keyof TSettings)]
    if (type === 'boolean' && 'checked' in event.target) {
      setSettings({
        ...settings,
        [event.target.name]: event.target.checked
      })
    }
    else {
      setSettings({
        ...settings,
        [event.target.name]: event.target.value
      })
    }
  }, [ settings, setSettings ])

  const handleDownload = useCallback(() => {
    const exporter = new NativeExporter(
      new generator(settings)
    )

    const code = exporter.exportNatives({
      natives, 
      namespaces
    })

    download(code, `natives.${extension}`, 'text/plain')
  }, [ settings, natives, namespaces, generator, extension ])

  if (!nativeData) {
    setPreviewNative('0x4EDE34FBADD967A6')
    return null
  }

  return (
    <Grid spacing={3} container>
      <Grid
        md={6}
        sx={{
          display:       'flex',
          flexDirection: 'column' 
        }}
        xs={12}
        item
      >
        <Typography 
          component="h2" 
          variant="h5" 
          gutterBottom
        >
          settings
        </Typography>

        <FormGroup>
          <Stack gap={2}>
            {options.map(props => (
              <CodeGenOptionComponent 
                onChange={handleChange}
                value={settings[props.prop]}
                {...props}
                key={props.prop}
              />
            ))}

            <Collapsible label="Advanced">
              <Stack
                gap={2}
                sx={{
                  pt: 1,
                  mb: 2 
                }}
              >
                {advancedOptions.map(props => (
                  <CodeGenOptionComponent 
                    onChange={handleChange}
                    value={settings[props.prop]}
                    {...props}
                    key={props.prop}
                  />
                ))}
              </Stack>
            </Collapsible>
          </Stack>
        </FormGroup>

        <Box sx={{ flexGrow: 1 }} />
        <Divider />

        <NativeSelect
          onChange={setPreviewNative}
          sx={{ mt: 2 }}
          value={previewNative}
        />

        <Button
          onClick={handleDownload}
          sx={{ mt: 2 }}
          variant="contained"
          fullWidth
        >
          Download
        </Button>
      </Grid>

      <Grid
        md={6}
        sx={{
          display:       'flex',
          flexDirection: 'column' 
        }}
        xs={12}
        item
      >
        <Typography 
          component="h2" 
          variant="h5" 
          gutterBottom
        >
          preview
        </Typography>

        <Paper
          elevation={4}
          sx={{
            p:        0,
            flexGrow: 1,
            overflow: 'hidden' 
          }}
        >
          <SyntaxHighlighter 
            customStyle={{
              height:   '100%',
              overflow: 'auto'
            }}
            language={name}
          >
            {preview}
          </SyntaxHighlighter>
        </Paper>
      </Grid>
    </Grid>
  )
}
