import React, { useState } from 'react'
import { Paper, Typography, makeStyles, FormControl, FormLabel, Checkbox, FormControlLabel, TextField, Button } from '@material-ui/core'
import { NativeDefinition, NativeComment } from '../../components'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { transformParamTypesToNativeTypes, transformTypeToNativeType } from '../../code-gen/util'
import { Autocomplete } from '@material-ui/lab'
import { useCallback } from 'react'
import CodeGenerator from '../../code-gen/CPlusPlusCodeGenerator'
import download from 'downloadjs'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    whiteSpace: 'pre',
    overflowX: 'auto',
  },
  formControl: {
    marginTop: theme.spacing(1),
  },
  controlLabel: {
    userSelect: 'none',
  },
  comboBox: {
    width: 400,
    maxWidth: 'auto',
    marginBottom: theme.spacing(2)
  }
}))

export default () => {
  const classes = useStyles()
  const { natives, namespaces } = useSelector(({ natives, namespaces }) => ({ natives, namespaces }))
  const [previewNative, setPreviewNative] = useState('0x4EDE34FBADD967A6')
  const rawNativeData = useSelector(({ natives }) => natives[previewNative])
  const [previewNativeData, setPreviewNativeData] = useState({})
  const [settings, setSettings] = useState({
    comments: false,
    typedefs: true,
    cpp_complient: true,
  })

  const handleChange = React.useCallback((event) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.checked
    })
  }, [settings])

  useEffect(() => {
    if (rawNativeData) {
      let native_name = rawNativeData.name
      if (settings.cpp_complient && native_name[0] === '_') {
        if (native_name[1] === '0') {
          native_name = `N${native_name}`
        }
        else {
          native_name = `${native_name.substr(1)}_`
        }
      }

      const copy = {
        ...rawNativeData,
        name: native_name,
        params: settings.typedefs ? rawNativeData.params : transformParamTypesToNativeTypes(rawNativeData.params),
        return_type: settings.typedefs ? rawNativeData.return_type : transformTypeToNativeType(rawNativeData.return_type)
      }

      setPreviewNativeData(copy)
    }
  }, [settings, previewNative, rawNativeData])

  const generateCode = useCallback(() => {
    const generator = new CodeGenerator({
      comments: settings.comments,
      nativeTypes: !settings.typedefs,
      cpp_complient: settings.cpp_complient,
    }, {
      natives, namespaces
    })

    generator.generate()
    download(generator.getCode(), 'natives.hpp', 'text/plain')
  }, [natives, namespaces, settings])

  return (
    <React.Fragment>
      <Typography variant="h5">
        Generate natives.h
      </Typography>
      <FormControl className={classes.formControl} component="fieldset">
        <FormLabel component="legend">
          Settings
          </FormLabel>
        <FormControlLabel
          className={classes.controlLabel}
          control={
            <Checkbox
              checked={settings.comments}
              onChange={handleChange}
              name="comments"
            />
          }
          label="Include Comments"
        />
        <FormControlLabel
          className={classes.controlLabel}
          control={
            <Checkbox
              checked={settings.typedefs}
              onChange={handleChange}
              name="typedefs"
            />
          }
          label="Use Typedefs"
        />
        <FormControlLabel
          className={classes.controlLabel}
          control={
            <Checkbox
              checked={settings.cpp_complient}
              onChange={handleChange}
              name="cpp_complient"
            />
          }
          label="C++ Complient"
        />
        <Autocomplete
          className={classes.comboBox}
          value={natives[previewNative] ?? {}}
          options={Object.values(natives)}
          getOptionLabel={({ name }) => name ?? ''}
          disableClearable
          onChange={(_, newValue) => {
            setPreviewNative(newValue.hash)
          }}
          renderInput={(props) => (
            <TextField
              {...props}
              label="Preview Native"
              variant="standard"
            />
          )}
        />
      </FormControl>
      <Typography variant="h6" gutterBottom>Preview</Typography>
      <Paper className={classes.paper}>
        {(settings.comments && previewNativeData.comment) && (
          <NativeComment>
            {previewNativeData.comment?.replace(/^/gm, '// ')}<br />
          </NativeComment>
        )}
        <NativeDefinition
          name={previewNativeData.name}
          return_type={previewNativeData.return_type}
          params={previewNativeData.params}
        />
        <NativeComment>
          {' // '} {previewNativeData.hash} {previewNativeData.jhash} b{previewNativeData.build}
        </NativeComment>
      </Paper>
      <br />
      <Button
        onClick={generateCode}
        color="primary"
        variant="contained"
        fullWidth
      >
        Download
      </Button>
    </React.Fragment>
  )
}
