import React from 'react'
import { LuaCodeGenerator } from '../../code-generation'
import Language from './Language'


export default function Lua() {
  return (
    <Language
      name="lua"
      extension="lua"
      generator={LuaCodeGenerator}
      defaultSettings={{
        indentation       : '  ',
        lineEnding        : 'lf',
        compactVectors    : true,
        generateComments  : true,
        useNativeTypes    : false,
        cppCompliant      : true,
        includes          : [],
        invokeFunction    : 'Native.Invoke',
        invokeSupportsVoid: false,
        oneLineFunctions  : true,
        includeNdbLinks   : false
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
          label: 'Native Types',
          prop : 'useNativeTypes'
        },
        {
          type : 'boolean',
          label: 'Compact Vectors',
          prop : 'compactVectors'
        }
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
        },
        {
          type : 'string',
          label: 'Invoke Function',
          prop : 'invokeFunction'
        }
      ]}
    />
  )
}
