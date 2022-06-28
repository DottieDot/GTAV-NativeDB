import { Container, Paper, Typography, Tab, Divider, Box } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import React, { memo, SyntheticEvent } from 'react'
import { useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Lua from './Lua'
import CPlusPlus from './CPlusPlus'
import CSharpEnum from './CSharpEnum'
import Rust from './Rust'

function GenerateCodePage() {
  const { language } = useParams<{ language: string }>()
  const history = useHistory()

  const onTabChange = useCallback((e: SyntheticEvent<Element, Event>, language: string) => {
    history.replace(language)
  }, [history])

  return (
    <Box sx={{ py: 2, overflow: 'hidden scroll', flexGrow: 1 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Generate Code
        </Typography>
        <Paper>
          <TabContext value={language}>
            <TabList onChange={onTabChange}>
              <Tab label="C++" value="cpp" />
              <Tab label="Lua" value="lua" />
              <Tab label="Rust" value="rs" />
              <Tab label="C# Enum" value="cs" />
              <Tab label="SHV.NET" value="shvdn" />
              <Tab label="RPH" value="rph" />
            </TabList>
            <Divider />
            <TabPanel value="lua">
              <Lua />
            </TabPanel>
            <TabPanel value="cpp">
              <CPlusPlus />
            </TabPanel>
            <TabPanel value="rs">
              <Rust />
            </TabPanel>
            <TabPanel value="cs">
              <CSharpEnum />
            </TabPanel>
            <TabPanel value="shvdn">
              Soon&trade;
            </TabPanel>
            <TabPanel value="rph">
              Soon&trade;
            </TabPanel>
          </TabContext>
        </Paper>
      </Container>
    </Box>
  )
}
export default memo(GenerateCodePage)
