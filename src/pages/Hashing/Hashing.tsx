import { Box, Button, Container, Divider, FormControl, Grid, InputLabel, List, ListItemButton, ListItemText, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography, styled } from '@mui/material'
import { Remove as SignedIcon, Add as UnsignedIcon, Tag as HexIcon } from '@mui/icons-material'
import { v4 as uuid } from 'uuid'
import { ChangeEvent, Fragment, useCallback, useMemo, useState } from 'react'
import { HashingAlgorithm, HashingFormat, formatHash, hashInput } from './backend'
import useLocalStorageState from 'use-local-storage-state'

const ToolsContainer = styled(Paper)(({ theme } ) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  marginBottom: theme.spacing(2),
  overflowX: 'auto'
}))

interface HistoryItem {
  input: string
  algorithm: HashingAlgorithm
  key: string
}

export default function Hashing() {
  const [algorithm, setAlgorithm] = useLocalStorageState<HashingAlgorithm>('Hashing-algorithm', { defaultValue: 'atStringHash' })
  const [format, setFormat] = useLocalStorageState<HashingFormat>('Hashing-format', { defaultValue:  'hex' })
  const [input, setInput] = useState('')
  const [rawOutput, setRawOutput] = useState<([bigint, number]|undefined)[]>([])
  const [history, setHistory] = useLocalStorageState<HistoryItem[]>('Hashing-history', { defaultValue: [] })

  const handleAlgorithmChange = useCallback((e: SelectChangeEvent<string>) => {
    let algo = e.target.value
    if (
      algo === 'atStringHash' ||
      algo === 'atStringHash64' ||
      algo === 'atLiteralStringHash'
    ) {
      setAlgorithm(algo)
    }
  }, [setAlgorithm])

  const handleOutputChange = useCallback((_: unknown, value: unknown) => {
    if (
      value === 'hex' ||
      value === 'signed' ||
      value === 'unsigned'
    ) {
      setFormat(value)
    }
  }, [setFormat])

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }, [setInput])

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
  }, [input, setRawOutput, algorithm, setHistory])

  const output = useMemo(() => (
    rawOutput.map(h => formatHash(h, format)).join('\n')
  ), [rawOutput, format])

  const loadHistoryItem = useCallback((index: number) => {
    const item = history[index]
    setInput(item.input)
    setAlgorithm(item.algorithm)
    setRawOutput(hashInput(item.input, item.algorithm))
  }, [history, setAlgorithm, setInput, setRawOutput])

  const handleClearHistory = useCallback(() => {
    setHistory([])
  }, [setHistory])

  return (
    <Container sx={{ py: 4 }} maxWidth="xl">
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
              labelId="hashing-algorithm-label"
              label="Algorithm"
              size="small"
              value={algorithm}
              onChange={handleAlgorithmChange}
            >
              <MenuItem value="atStringHash">atStringHash</MenuItem>
              <MenuItem value="atStringHash64">atStringHash64</MenuItem>
              <MenuItem value="atLiteralStringHash">atLiteralStringHash</MenuItem>
            </Select>
          </FormControl>
          <ToggleButtonGroup
            size="small"
            value={format}
            onChange={handleOutputChange}
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
          variant="contained" 
          color="primary" 
          size="medium"
          onClick={handleHash}
          sx={{ ml: 2 }}
          disabled={!input}
        >
          Hash
        </Button>
      </ToolsContainer>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item md={4} sm={6} xs={12}>
          <Typography component="h2" variant="h5" gutterBottom>
            Input
          </Typography>
          <TextField 
            variant="outlined"
            rows={10}
            value={input}
            onChange={handleInputChange}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Typography component="h2" variant="h5" gutterBottom>
            Output
          </Typography>
          <TextField
            variant="outlined"
            rows={10}
            value={output}
            InputProps={{
              readOnly: true
            }}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography component="h2" variant="h5" gutterBottom>
              History ({history.length}/20)
            </Typography>
            <Button 
              size="small" 
              color="error" 
              onClick={handleClearHistory}
              disabled={!history.length}
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
                        variant="body1"
                        sx={{ whiteSpace: 'pre-wrap' }}
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
