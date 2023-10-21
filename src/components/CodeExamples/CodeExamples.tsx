import { Divider, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { memo, SyntheticEvent, useCallback, useState } from 'react'
import { CodeExample } from '../../context'
import SyntaxHighlighter from '../SnytaxHighlighter'

export interface CodeExamplesProps {
  examples: CodeExample[]
}

const langMap: { [name: string]: string } = {
  js:  'javascript',
  cs:  'csharp',
  lua: 'lua',
  cpp: 'cpp'
}

const humanLangMap: { [name: string]: string } = {
  js:  'Javascript',
  cs:  'C#',
  lua: 'Lua',
  cpp: 'C++'
}

function CodeExamples({ examples }: CodeExamplesProps) {
  const [ language, setLanguage ] = useState(examples[0].lang)
  
  const onTabChange = useCallback((e: SyntheticEvent<Element, Event>, language: string) => {
    setLanguage(language)
  }, [ setLanguage ])

  return (
    <TabContext value={language}>
      <TabList onChange={onTabChange} sx={{ pl: 0 }}>
        {examples.map(({ lang }) => (
          <Tab
            key={lang}
            label={humanLangMap[lang] ?? lang}
            value={lang}
          />
        ))}
      </TabList>

      <Divider />

      {examples.map(({ lang, code }) => (
        <TabPanel key={lang} sx={{ p: 0 }} value={lang}>
          <SyntaxHighlighter 
            language={langMap[lang] ?? lang} 
          >
            {code}
          </SyntaxHighlighter>
        </TabPanel>
      ))}
    </TabContext>
  )
}

export default memo(CodeExamples)
