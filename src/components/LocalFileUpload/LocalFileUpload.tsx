import { Paper, Typography, Box, Button, styled, FormHelperText } from '@mui/material'
import { Upload as UploadIcon } from '@mui/icons-material'
import { ChangeEventHandler, DragEventHandler, ReactNode, useCallback } from 'react'
import useLocalStorageState from 'use-local-storage-state'

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'none',
  padding:    theme.spacing(2), 
  width:      '100%', 
  textAlign:  'center',
  transition: 'all .2s ease-in-out'
}))

export interface LocalFileUploadProps {
  storeAs: string
  label: string
  helpText: ReactNode
}

export default function LocalFileUpload({ storeAs, label, helpText }: LocalFileUploadProps) {
  const [ storedFile, setStoredFile ] = useLocalStorageState<string | null>(storeAs, { defaultValue: null })

  const handleFiles = useCallback((files: File[]) => {
    if (files.length === 0) {
      return
    }
    if (files.length > 1) {
      return
    }

    const file = files[0]
    if (file.type !== 'application/json') {
      return
    }

    file.text().then(text => {
      setStoredFile(text)
    })
  }, [ setStoredFile ])

  const handleInputChanged = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    handleFiles(e.target.files ? [ ...e.target.files ] : [])
  }, [ handleFiles ])

  const handleDrop = useCallback<DragEventHandler<HTMLElement>>((e) => {
    e.preventDefault()

    const files = e.dataTransfer.files 
      ? [ ...e.dataTransfer.files ]
      : [ ...e.dataTransfer.items ]
        .filter(item => item.type === 'file')
        .map(item => item.getAsFile()!)

    handleFiles(files)
  }, [ handleFiles ])

  const handleDelete = useCallback(() => {
    setStoredFile(null)
  }, [ setStoredFile ])

  const handleDragOver = useCallback<DragEventHandler<HTMLElement>>((e) => {
    e.preventDefault()
  }, [])

  return (
    <Box>
      <StyledPaper
        // @ts-ignore
        component={(props) => <Button {...props} component="label" variant="outlined" />}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        variant="outlined" 
      >
        <div>
          <UploadIcon fontSize="medium" />
          <br />

          <Typography variant="button">
            Upload
            {label}
          </Typography>
        </div>

        <input
          accept="application/json"
          onChange={handleInputChanged}
          type="file"
          hidden
        />
      </StyledPaper>

      <FormHelperText>
        {helpText}
      </FormHelperText>

      {storedFile && (
        <Button 
          color="error"
          onClick={handleDelete} 
          sx={{ mt: 1 }} 
          variant="outlined"
          fullWidth
        >
          Delete 
          {' '}
          {label}
        </Button>
      )}
    </Box>
  )
}
