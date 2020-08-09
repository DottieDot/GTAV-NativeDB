import React from 'react'
import { Container, Paper, makeStyles, Tab } from '@material-ui/core'
import { useState } from 'react'
import { TabPanel, TabContext, TabList } from '@material-ui/lab'
import CPlusPlus from './CPlusPlus'
import CSharp from './CSharp'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    whiteSpace: 'pre',
    overflowX: 'auto',
  },
}))

export default () => {
  const classes = useStyles()
  const [tab, setTab] = useState(0)

  const handleChangeTab = (_, value) => {
    setTab(value);
  }

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <TabContext value={tab}>
          <TabList onChange={handleChangeTab} aria-label="target programming language tabs">
            <Tab label="C++" value={0} />
            <Tab label="C#" value={1} />
          </TabList>
          <TabPanel value={0}>
            <CPlusPlus />
          </TabPanel>
          <TabPanel value={1}>
            <CSharp />
          </TabPanel>
        </TabContext>
      </Paper>
    </Container>
  )
}
