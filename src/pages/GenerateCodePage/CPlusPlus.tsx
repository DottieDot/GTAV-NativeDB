import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Paper, Typography } from '@mui/material'
import download from 'downloadjs'
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { CPlusPlusCodeGenerator, CPlusPlusCodeGeneratorSettings, NativeExporter } from '../../code-generation'
import { NativeSelect, SyntaxHighlighter } from '../../components'
import { useNamespaces, useNative, useNatives } from '../../hooks'

export default function CPlusPlus() {
  const natives = useNatives()
  const namespaces = useNamespaces()
  const [previewNative, setPreviewNative] = useState('0xD49F9B0955C367DE')
  const nativeData = useNative(previewNative)
  const [settings, setSettings] = useLocalStorageState<CPlusPlusCodeGeneratorSettings>('Pages.GenerateCode.CPlusPlus.Settings.wadawd', {
    indentation       : '  ',
    lineEnding        : 'lf',
    compactVectors    : true,
    generateComments  : true,
    useNativeTypes    : false,
    cppCompliant      : true,
    includes          : [],
    invokeFunction    : 'invoke',
    invokeSupportsVoid: false,
    oneLineFunctions  : true,
  })
  const preview = useMemo(() => (
    new NativeExporter(
      new CPlusPlusCodeGenerator(settings)
    ).exportNatives({
      namespaces: {
        [nativeData.namespace]: {
          name: nativeData.namespace,
          natives: [nativeData.hash]
        }
      },
      natives: {
        [nativeData.hash]: nativeData
      }
    })
  ), [settings, nativeData])

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.checked
    })
  }, [settings, setSettings])

  const handleDownload = useCallback(() => {
    const exporter = new NativeExporter(
      new CPlusPlusCodeGenerator(settings)
    )

    const code = exporter.exportNatives({
      natives, 
      namespaces
    })

    download(code, 'natives.hpp', 'text/plain')
  }, [settings, natives, namespaces])

  if (!nativeData) {
    setPreviewNative('0x4EDE34FBADD967A6')
    return null
  }

  return (
    <Grid spacing={2} container>
      <Grid xs={12} md={6} item sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
        >
          settings
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name="generateComments"
                onChange={handleChange}
                checked={settings.generateComments}
              />
            }
            label="Include Comments"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="useNativeTypes"
                onChange={handleChange}
                checked={settings.useNativeTypes}
              />
            }
            label="Use Native Types"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="compactVectors"
                onChange={handleChange}
                checked={settings.compactVectors}
              />
            }
            label="Compact Vectors"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="oneLineFunctions"
                onChange={handleChange}
                checked={settings.oneLineFunctions}
              />
            }
            label="One Line Functions"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="cppCompliant"
                onChange={handleChange}
                checked={settings.cppCompliant}
              />
            }
            label="C++ Compliant"
          />
        </FormGroup>
        <NativeSelect
          value={previewNative}
          onChange={setPreviewNative}
          sx={{ mt: 2 }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <Button
          sx={{ mt: 1 }}
          variant="contained"
          onClick={handleDownload}
          fullWidth
        >
          Download
        </Button>
      </Grid>
      <Grid xs={12} md={6} item>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
        >
          preview
        </Typography>
        <Paper elevation={4} sx={{ p: 0 }}>
          <SyntaxHighlighter 
            language="cpp"
            customStyle={{
              height: 400,
              overflow: 'scroll'
            }}
          >
            {preview}
          </SyntaxHighlighter>
        </Paper>
      </Grid>
    </Grid>
  )
}
