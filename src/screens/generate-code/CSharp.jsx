import React, { useCallback } from 'react'
import { Typography, Button, makeStyles, FormControl, FormLabel, FormControlLabel, Checkbox } from '@material-ui/core'
import { useSelector } from 'react-redux'
import CodeGenerator from '../../code-gen/CSharpCodeGenerator'
import download from 'downloadjs'
import { useState } from 'react'

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
  const [settings, setSettings] = useState({
    includeUnnamed: false,
  })

  const generateCode = useCallback(() => {
    const generator = new CodeGenerator(settings, {
      natives, 
      namespaces,
    })

    generator.generate()
    download(generator.getCode(), 'natives.cs', 'text/plain')
  }, [natives, namespaces, settings])

  const handleChange = React.useCallback((event) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.checked
    })
  }, [settings])

  return (
    <React.Fragment>
      <Typography variant="h5">
        Generate natives enum
      </Typography>
      <FormControl className={classes.formControl} component="fieldset">
        <FormLabel component="legend">
          Settings
          </FormLabel>
        <FormControlLabel
          className={classes.controlLabel}
          control={
            <Checkbox
              checked={settings.includeUnnamed}
              onChange={handleChange}
              name="includeUnnamed"
            />
          }
          label="Include unnamed natives"
        />
      </FormControl>
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
