import { Divider, Tab, useTheme } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import React, { memo, SyntheticEvent, useCallback, useState } from 'react'
import SyntaxHighlighter /*{ Prism as SyntaxHighlighter }*/ from 'react-syntax-highlighter'
import { CodeExample } from '../../store'
// import { materialLight as lightStyle, materialDark as darkStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { atomOneLight as lightStyle, atomOneDark as darkStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export interface CodeExamplesProps {
  examples: CodeExample[]
}

const langMap: { [name: string]: string } = {
  js: 'javascript',
  cs: 'csharp',
  lua: 'lua',
  cpp: 'cpp'
}

const humanLangMap: { [name: string]: string } = {
  js: 'Javascript',
  cs: 'C#',
  lua: 'Lua',
  cpp: 'C++'
}

function CodeExamples({ examples }: CodeExamplesProps) {
  const [language, setLanguage] = useState(examples[0].lang)
  const theme = useTheme()

  const onTabChange = useCallback((e: SyntheticEvent<Element, Event>, language: string) => {
    setLanguage(language)
  }, [setLanguage])

  const highlighterStyle = theme.palette.mode === 'dark'
    ? darkStyle
    : lightStyle

  return (
    <TabContext value={language}>
      <TabList onChange={onTabChange} sx={{ pl: 0 }}>
        {examples.map(({ lang }) => (
          <Tab
            label={humanLangMap[lang] ?? lang}
            value={lang}
          />
        ))}
      </TabList>
      <Divider />
      {examples.map(({ lang, code }) => (
        <TabPanel value={lang} sx={{ p: 0 }}>
          <SyntaxHighlighter 
            language={langMap[lang] ?? lang} 
            style={highlighterStyle} 
            customStyle={{ 
              background: 'none', 
              padding: theme.spacing(2), 
              margin: 0
            }}
          >
          {code}
          </SyntaxHighlighter>
        </TabPanel>
      ))}
    </TabContext>
  )
}

export default memo(CodeExamples)
