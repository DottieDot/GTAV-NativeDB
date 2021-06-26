import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Paper, Typography } from '@material-ui/core'
import download from 'downloadjs'
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { CPlusPlusCodeGenerator } from '../../code-generation'
import { gtaParamsToNativeParams, gtaTypeToNativeType, makeNativeNameCPlusPlusCompliant } from '../../common'
import { CodeComment, NativeDefinition, NativeSelect } from '../../components'
import { useNamespaces, useNative, useNatives } from '../../hooks'

export default function CPlusPlus() {
  const natives = useNatives()
  const namespaces = useNamespaces()
  const [previewNative, setPreviewNative] = useState('0xD49F9B0955C367DE')
  const nativeData = useNative(previewNative)
  const [settings, setSettings] = useLocalStorageState('Pages.GenerateCode.CPlusPlus.Settings', {
    comments: false,
    typedefs: true,
    cppCompliant: true,
    shvIncludes: false
  })
  const previewData = useMemo(() => {
    if (!nativeData) return nativeData

    return {
      ...nativeData,
      name: settings.cppCompliant
        ? makeNativeNameCPlusPlusCompliant(nativeData.name)
        : nativeData.name,
      params: settings.typedefs
        ? nativeData.params
        : gtaParamsToNativeParams(nativeData.params),
      returnType: settings.typedefs
        ? nativeData.returnType
        : gtaTypeToNativeType(nativeData.returnType)
    }
  }, [settings, nativeData])

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.checked
    })
  }, [settings, setSettings])

  const handleDownload = useCallback(() => {
    const generator = new CPlusPlusCodeGenerator(settings, {
      natives, 
      namespaces
    })

    generator.generate()
    download(generator.getCode(), 'natives.hpp', 'text/plain')
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
                name="comments"
                onChange={handleChange}
                checked={settings.comments}
              />
            }
            label="Include Comments"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="typedefs"
                onChange={handleChange}
                checked={settings.typedefs}
              />
            }
            label="Use Typedefs"
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
          <FormControlLabel
            control={
              <Checkbox
                name="shvIncludes"
                onChange={handleChange}
                checked={settings.shvIncludes}
              />
            }
            label="ScriptHookV Includes"
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
        <Paper elevation={4} sx={{ p: 2, overflow: 'scroll', height: 400 }}>
          <CodeComment noWrap>
            {settings.shvIncludes && (
              '#include "types.h"\n#include "nativeCaller.h"\n\n'
            )}
            {settings.comments && previewData.comment && (
                previewData.comment.replace(/(^|\n)/g, '$1// ')
            )}
          </CodeComment>
          <NativeDefinition
            name={previewData.name}
            params={previewData.params}
            returnType={previewData.returnType}
            noWrap
          />
        </Paper>
      </Grid>
    </Grid>
  )
}
