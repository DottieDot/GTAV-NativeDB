import { Box, Button, Container, Divider, FormControl, Grid, InputLabel, List, ListItemButton, ListItemText, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography, styled } from '@mui/material'
import { Remove as SignedIcon, Add as UnsignedIcon, Tag as HexIcon } from '@mui/icons-material'
import { v4 as uuid } from 'uuid'
import { ChangeEvent, Fragment, useCallback, useMemo, useState } from 'react'
import { HashingAlgorithm, HashingFormat, formatHash, hashInput } from './backend'
import useLocalStorageState from 'use-local-storage-state'

const ToolsContainer = styled(Paper)(({ theme } ) => ({
  display:      'flex',
  alignItems:   'center',
  padding:      theme.spacing(1),
  marginBottom: theme.spacing(2),
  overflowX:    'auto'
}))

interface HistoryItem {
  input: string
  algorithm: HashingAlgorithm
  key: string
}

export default function Hashing() {
  const [ algorithm, setAlgorithm ] = useLocalStorageState<HashingAlgorithm>('Hashing-algorithm', { defaultValue: 'atStringHash' })
  const [ format, setFormat ] = useLocalStorageState<HashingFormat>('Hashing-format', { defaultValue: 'hex' })
  const [ input, setInput ] = useState('')
  const [ rawOutput, setRawOutput ] = useState<([bigint, number]|undefined)[]>([])
  const [ history, setHistory ] = useLocalStorageState<HistoryItem[]>('Hashing-history', { defaultValue: []})

  const handleAlgorithmChange = useCallback((e: SelectChangeEvent<string>) => {
    const algo = e.target.value
    if (
      algo === 'atStringHash' ||
      algo === 'atStringHash64' ||
      algo === 'atLiteralStringHash'
    ) {
      setAlgorithm(algo)
    }
  }, [ setAlgorithm ])

  const handleOutputChange = useCallback((_: unknown, value: unknown) => {
    if (
      value === 'hex' ||
      value === 'signed' ||
      value === 'unsigned'
    ) {
      setFormat(value)
    }
  }, [ setFormat ])

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }, [ setInput ])

  const handleHash = useCallback(() => {
    setRawOutput(hashInput(input, algorithm))

    setHistory(history => [
      {
        input,
        algorithm,
        key: uuid()
      },
      ...history.slice(0, 19)
    ])
  }, [ input, setRawOutput, algorithm, setHistory ])

  const output = useMemo(() => (
    rawOutput.map(h => formatHash(h, format)).join('\n')
  ), [ rawOutput, format ])

  const loadHistoryItem = useCallback((index: number) => {
    const item = history[index]
    setInput(item.input)
    setAlgorithm(item.algorithm)
    setRawOutput(hashInput(item.input, item.algorithm))
  }, [ history, setAlgorithm, setInput, setRawOutput ])

  const handleClearHistory = useCallback(() => {
    setHistory([])
  }, [ setHistory ])

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography component="h1" variant="h3" gutterBottom>
        Hashing
      </Typography>

      <ToolsContainer elevation={4}>
        <Stack direction="row" gap={2}>
          <FormControl sx={{ width: 200 }}>
            <InputLabel id="hashing-algorithm-label" size="small">
              Algorithm
            </InputLabel>

            <Select
              label="Algorithm"
              labelId="hashing-algorithm-label"
              onChange={handleAlgorithmChange}
              size="small"
              value={algorithm}
            >
              <MenuItem value="atStringHash">
                atStringHash
              </MenuItem>

              <MenuItem value="atStringHash64">
                atStringHash64
              </MenuItem>

              <MenuItem value="atLiteralStringHash">
                atLiteralStringHash
              </MenuItem>
            </Select>
          </FormControl>

          <ToggleButtonGroup
            onChange={handleOutputChange}
            size="small"
            value={format}
            exclusive
          >
            <ToggleButton value="hex">
              <Tooltip title="Hexadecimal">
                <HexIcon />
              </Tooltip>
            </ToggleButton>

            <ToggleButton value="unsigned">
              <Tooltip title="Unsigned Integer">
                <UnsignedIcon />
              </Tooltip>
            </ToggleButton>

            <ToggleButton value="signed">
              <Tooltip title="Signed Integer">
                <SignedIcon />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Box sx={{ flex: 1 }} />

        <Button 
          color="primary" 
          disabled={!input} 
          onClick={handleHash}
          size="medium"
          sx={{ ml: 2 }}
          variant="contained"
        >
          Hash
        </Button>
      </ToolsContainer>

      <Grid columnSpacing={2} rowSpacing={2} container>
        <Grid
          md={4}
          sm={6}
          xs={12}
          item
        >
          <Typography component="h2" variant="h5" gutterBottom>
            Input
          </Typography>

          <TextField 
            onChange={handleInputChange}
            rows={10}
            value={input}
            variant="outlined"
            fullWidth
            multiline
          />
        </Grid>

        <Grid
          md={4}
          sm={6}
          xs={12}
          item
        >
          <Typography component="h2" variant="h5" gutterBottom>
            Output
          </Typography>

          <TextField
            InputProps={{ readOnly: true }}
            rows={10}
            value={output}
            variant="outlined"
            fullWidth
            multiline
          />
        </Grid>

        <Grid md={4} xs={12} item>
          <Box
            sx={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between' 
            }}
          >
            <Typography component="h2" variant="h5" gutterBottom>
              History (
              {history.length}
              /20)
            </Typography>

            <Button 
              color="error" 
              disabled={!history.length} 
              onClick={handleClearHistory}
              size="small"
            >
              Clear
            </Button>
          </Box>

          <List>
            {history.map(({ input, algorithm, key }, i) => (
              <Fragment key={key}>
                {!!i && <Divider />}

                <ListItemButton onClick={() => loadHistoryItem(i)}>
                  <ListItemText
                    primary={
                      <Typography 
                        sx={{ whiteSpace: 'pre-wrap' }}
                        variant="body1"
                      >
                        {input}
                      </Typography>
                    }
                    secondary={algorithm}
                  />
                </ListItemButton>
              </Fragment>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  ) 
}
