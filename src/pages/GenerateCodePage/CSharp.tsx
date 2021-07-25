import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Paper, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import download from 'downloadjs'
import React, { ChangeEvent, useCallback } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { CSharpCodeGenerator, CSharpCodeGeneratorSettings } from '../../code-generation'
import { useNamespaces, useNatives } from '../../hooks'
import * as _ from 'lodash'

export default function CSharp() {
  const natives = useNatives()
  const namespaces = useNamespaces()
  const [settings, setSettings] = useLocalStorageState<CSharpCodeGeneratorSettings>('Pages.GenerateCode.CSharp.Settings', {
    framework: 'SHVDN',
    comments: false,
    usePascalCase: true
  })

  const handleTargetFrameworkChange = useCallback((event: ChangeEvent<{ value: unknown }>) => {
    if (_.includes(['SHVDN', 'RPH'], event.target.value)) {
      setSettings({
        ...settings,
        // @ts-ignore
        framework: event.target.value
      })
    }
  }, [settings, setSettings])

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.checked
    })
  }, [settings, setSettings])

  const handleDownload = useCallback(() => {
    const generator = new CSharpCodeGenerator(settings, {
      natives, 
      namespaces
    })

    generator.generate()
    download(generator.getCode(), 'natives.cs', 'text/plain')
  }, [settings, natives, namespaces])

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
          <FormControl variant="standard" fullWidth>
            <InputLabel id="cs-target-framework-label">Target Framework</InputLabel>
            <Select
              labelId="cs-target-framework-label"
              label="Target Framework"
              value={settings.framework}
              name="framework"
              onChange={handleTargetFrameworkChange}
            >
              <MenuItem value="SHVDN">ScriptHookV.NET</MenuItem>
              <MenuItem value="RPH">RagePluginHook</MenuItem>
            </Select>
          </FormControl>
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
                name="usePascalCase"
                onChange={handleChange}
                checked={settings.usePascalCase}
              />
            }
            label="Use PascalCase"
          />
        </FormGroup>
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
          Soon&trade;
        </Paper>
      </Grid>
    </Grid>
  )
}
