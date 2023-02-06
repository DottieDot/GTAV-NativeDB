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
  options: { label: string, value: any }[]
}

type CodeGenOptions<TSettings> = BooleanCodeGenOption<TSettings> | StringCodeGenOption<TSettings> | ComboCodeGenOption<TSettings>

type CodeGenOptionComponentProps<TSettings> = CodeGenOptions<TSettings> & {
  onChange: (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => void
  value: any
}

export function CodeGenOptionComponent<TSettings>(props:CodeGenOptionComponentProps<TSettings>) {
  const { type, label, prop, value, onChange } = props

  switch (type) {
    case 'boolean':
      return (
        <FormControlLabel
          control={
            <Checkbox
              name={prop}
              checked={value}
              onChange={onChange}
            />
          }
          sx={{ userSelect: 'none' }}
          label={label}
        />
      )
    case 'combo':
      const options = props.options
      return (
        <FormControl fullWidth>
          <InputLabel id={`${prop}-label`}>{label}</InputLabel>
          <Select
            id={`${prop}-select`}
            labelId={`${prop}-label`}
            name={prop}
            value={value}
            onChange={onChange}
            label={label}
          >
            {options.map(({ label, value }) => (
              <MenuItem key={value} value={value}>
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

interface PreviewDataExtraFile {
  name: string
  content: string
  language: string
}

interface PreviewData {
  main: string
  extra_files: PreviewDataExtraFile[]
}

export default 
function Language<TSettings extends CodeGeneratorBaseSettings>({ name, defaultSettings, generator, options, advancedOptions, extension }: Props<TSettings>) {
  const natives = useNatives()
  const namespaces = useNamespaces()
  const [settings, setSettings] = useLocalStorageState<TSettings>(`Pages.GenerateCode.${name}`, {
    defaultValue: defaultSettings
  })
  const [previewNative, setPreviewNative] = useState('0xD49F9B0955C367DE')
  const nativeData = useNative(previewNative)

  const preview = useMemo(() => {
    const exporter = new NativeExporter(
      new generator(settings)
    )

    const main_code = exporter.exportNatives({
      namespaces: {
        [nativeData.namespace]: {
          name: nativeData.namespace,
          natives: [nativeData.hash]
        }
      },
      natives: {
        [nativeData.hash]: nativeData
      }
    });

    let res: PreviewData = {main: main_code, extra_files: []};
    exporter.getExtraFiles().forEach(file => {
      const language = file.mimeType.slice(file.mimeType.indexOf('/') + 1);
      res.extra_files.push({
        name: `${file.name}.${file.extension}`,
        content: file.content,
        language: language
      });
    })

    return res;
  }, [settings, nativeData, generator])

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
  }, [settings, setSettings])

  const handleDownload = useCallback(() => {
    const exporter = new NativeExporter(
      new generator(settings)
    )

    const code = exporter.exportNatives({
      natives, 
      namespaces
    })

    download(code, `natives.${extension}`, 'text/plain')
    exporter.getExtraFiles().forEach(file => {
      download(file.content, `${file.name}.${file.extension}`, file.mimeType);
    });
  }, [settings, natives, namespaces, generator, extension])

  if (!nativeData) {
    setPreviewNative('0x4EDE34FBADD967A6')
    return null
  }

  return (
    <Grid spacing={3} container>
      <Grid xs={12} md={preview.extra_files.length > 0 ? 4 : 6} item>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
        >
         Settings
        </Typography>
        <FormGroup>
          <Stack gap={2}>
            {options.map(props => (
              <CodeGenOptionComponent 
                value={settings[props.prop]}
                onChange={handleChange}
                {...props}
                key={props.prop}
              />
            ))}
            <Collapsible label="Advanced">
              <Stack gap={2} sx={{ pt: 1, mb: 2 }}>
                {advancedOptions.map(props => (
                  <CodeGenOptionComponent 
                    value={settings[props.prop]}
                    onChange={handleChange}
                    {...props}
                    key={props.prop}
                  />
                ))}
              </Stack>
            </Collapsible>
          </Stack>
        </FormGroup>
        <Divider />
        <NativeSelect
          sx={{ mt: 2 }}
          value={previewNative}
          onChange={setPreviewNative}
        />
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={handleDownload}
          fullWidth
        >
          Download
        </Button>
      </Grid>
      <Grid xs={12} md={preview.extra_files.length > 0 ? 4 : 6} item>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
        >
          Preview
        </Typography>
        <Paper elevation={4}>
          <SyntaxHighlighter 
            language={name}
            customStyle={{
              height: '100%',
              overflow: 'auto'
            }}
          >
            {preview.main}
          </SyntaxHighlighter>
        </Paper>
      </Grid>
      {preview.extra_files.length > 0 &&
          <Grid xs={12} md={4} item>
            <Typography
                variant="h5"
                component="h2"
                gutterBottom
            >
              Extra files
            </Typography>
          {preview.extra_files.map(function(obj, i) {
            return (
                <Collapsible label={obj.name}>
                  <Paper elevation={4} sx={{ p: 0, flexGrow: 1, overflow: 'hidden' }}>
                    <SyntaxHighlighter
                        language={obj.language}
                        customStyle={{
                          height: '100%',
                          overflow: 'auto'
                        }}
                    >
                      {obj.content}
                    </SyntaxHighlighter>
                  </Paper>
                </Collapsible>
            );
            })}
          </Grid>
      }
    </Grid>
  )
}
