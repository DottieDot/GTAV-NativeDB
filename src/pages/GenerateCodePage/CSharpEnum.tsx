import { CSharpCodeGenerator } from '../../code-generation'
import Language from './Language'


export default function CSharpEnum() {
  return (
    <Language
      advancedOptions={[
        {
          type:    'combo',
          label:   'Indentation',
          prop:    'indentation',
          options: [
            {
              label: 'Tab',
              value: '\t' 
            },
            {
              label: '1 Space',
              value: ' ' 
            },
            {
              label: '2 Spaces',
              value: '  ' 
            },
            {
              label: '4 Spaces',
              value: '    ' 
            },
            {
              label: '8 Spaces',
              value: '        ' 
            }
          ]
        },
        {
          type:    'combo',
          label:   'Line Endings',
          prop:    'lineEnding',
          options: [
            {
              label: 'LF',
              value: 'lf' 
            },
            {
              label: 'CR-LF',
              value: 'crlf' 
            }
          ]
        },
        {
          type:  'string',
          label: 'Enum Name',
          prop:  'enumName'
        },
        {
          type:  'string',
          label: 'Namespace Name',
          prop:  'namespaceName'
        }
      ]}
      defaultSettings={{
        indentation:      '  ',
        lineEnding:       'lf',
        generateComments: false,
        includeNdbLinks:  false,
        includeParams:    false,
        enumName:         'Hash',
        namespaceName:    'GTA.Native',
        compactVectors:   false
      }}
      extension="cs"
      generator={CSharpCodeGenerator}
      name="csharp"
      options={[
        {
          type:  'boolean',
          label: 'Include Params',
          prop:  'includeParams'
        },
        {
          type:  'boolean',
          label: 'Include Comments',
          prop:  'generateComments'
        },
        {
          type:  'boolean',
          label: 'Include Links',
          prop:  'includeNdbLinks'
        }
      ]}
    />
  )
}
