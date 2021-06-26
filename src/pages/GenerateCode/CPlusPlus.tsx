import { Button, Checkbox, FormControlLabel, FormGroup, Grid, Paper, Typography, Box } from '@material-ui/core'
import React, { useState, useCallback, ChangeEvent, useMemo } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { gtaParamsToNativeParams, gtaTypeToNativeType, makeNativeNameCPlusPlusCompliant } from '../../common'
import { CodeComment, NativeDefinition, NativeSelect } from '../../components'
import { useNative } from '../../hooks'

export default function CPlusPlus() {
  const [previewNative, setPreviewNative] = useState('0xD49F9B0955C367DE')
  const nativeData = useNative(previewNative)
  const [settings, setSettings] = useLocalStorageState('Pages.GenerateCode.CPlusPlus.Settings', {
    comments: false,
    typedefs: true,
    cppCompliant: true,
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
          {settings.comments && previewData.comment && (
            <CodeComment noWrap>
              {previewData.comment.replace(/(^|\n)/g, '$1// ')}
            </CodeComment>
          )}
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
