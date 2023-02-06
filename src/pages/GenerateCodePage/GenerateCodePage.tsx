import { Container, Paper, Typography, Tab, Divider, Box } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import React, { memo, SyntheticEvent } from 'react'
import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CPlusPlus from './CPlusPlus'
import CSharpEnum from './CSharpEnum'
import Rust from './Rust'

function GenerateCodePage() {
  const { language = 'cpp' } = useParams<{ language: string }>()
  const navigate = useNavigate()

  const onTabChange = useCallback((_e: SyntheticEvent<Element, Event>, language: string) => {
    navigate(`/generate-code/${language}`, { replace: true })
  }, [navigate])

  return (
    <Box sx={{ py: 2, overflow: 'hidden scroll', flexGrow: 1 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" component="h1" align='center' gutterBottom>
          Generate Code
        </Typography>
        <Paper>
          <TabContext value={language}>
            <TabList onChange={onTabChange}>
              <Tab label="C++" value="cpp" />
              <Tab label="Rust" value="rs" />
              <Tab label="C# Enum" value="cs" />
            </TabList>
            <Divider />
            <TabPanel value="cpp">
              <CPlusPlus />
            </TabPanel>
            <TabPanel value="rs">
              <Rust />
            </TabPanel>
            <TabPanel value="cs">
              <CSharpEnum />
            </TabPanel>
          </TabContext>
        </Paper>
      </Container>
    </Box>
  )
}
export default memo(GenerateCodePage)
