import React from 'react'
import { RustCodeGenerator } from '../../code-generation'
import Language from './Language'


export default function Rust() {
  return (
    <Language
      name="rust"
      extension="rs"
      generator={RustCodeGenerator}
      defaultSettings={{
        indentation       : '  ',
        lineEnding        : 'lf',
        compactVectors    : true,
        generateComments  : true,
        oneLineFunctions  : true,
        includeNdbLinks   : false,
        rustNames         : true
      }}
      options={[
        {
          type : 'boolean',
          label: 'Include Comments',
          prop : 'generateComments'
        },
        {
          type : 'boolean',
          label: 'Include Links',
          prop : 'includeNdbLinks'
        },
        {
          type : 'boolean',
          label: 'Compact Vectors',
          prop : 'compactVectors'
        },
        {
          type : 'boolean',
          label: 'One Line Functions',
          prop : 'oneLineFunctions'
        },
        {
          type : 'boolean',
          label: 'Rust names',
          prop : 'rustNames'
        },
      ]}
      advancedOptions={[
        {
          type   : 'combo',
          label  : 'Indentation',
          prop   : 'indentation',
          options: [
            { label: 'Tab', value: '\t' },
            { label: '1 Space', value: ' ' },
            { label: '2 Spaces', value: '  ' },
            { label: '4 Spaces', value: '    ' },
            { label: '8 Spaces', value: '        ' }
          ]
        },
        {
          type   : 'combo',
          label  : 'Line Endings',
          prop   : 'lineEnding',
          options: [
            { label: 'LF', value: 'lf' },
            { label: 'CR-LF', value: 'crlf' }
          ]
        }
      ]}
    />
  )
}
