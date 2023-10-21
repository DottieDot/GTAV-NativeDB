import { Autocomplete, AutocompleteProps, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { memo, ReactNode, useMemo } from 'react'
import { useNatives } from '../../hooks'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import { Native } from '../../context'

const LISTBOX_PADDING = 8

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: (style.top as number) + LISTBOX_PADDING
    }
  })
}

const OuterElementContext = React.createContext({})

const OuterElementType = React.forwardRef<HTMLDivElement>(function OuterElementType(props, ref) {
  const outerProps = React.useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})

function useResetCache(_data: unknown) {
  const ref = React.useRef<FixedSizeList>(null)
  return ref
}

interface Props {
  children?: ReactNode
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<HTMLDivElement>(function ListboxComponent(
  props: Props,
  ref,
) {
  const { children, ...other } = props
  const itemData = React.Children.toArray(children)
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true })
  const itemCount = itemData.length
  const itemSize = smUp ? 36 : 48

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize
    }
    return itemData.map(() => smUp ? 36 : 48).reduce((a, b) => a + b, 0)
  }

  const gridRef = useResetCache(itemCount)

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <FixedSizeList
          height={getHeight() + 2 * LISTBOX_PADDING}
          innerElementType="ul"
          itemCount={itemCount}
          itemData={itemData}
          itemSize={smUp ? 36 : 48}
          outerElementType={OuterElementType}
          overscanCount={5}
          ref={gridRef}
          width="100%"
        >
          {renderRow}
        </FixedSizeList>
      </OuterElementContext.Provider>
    </div>
  )
})

interface NativeSelectProps {
  value: string
  onChange: (value: string) => void
  sx?: AutocompleteProps<Native, true, true, true>['sx']
}

function NativeSelect({ value, onChange, sx }: NativeSelectProps) {
  const natives = useNatives()
  const nativesArray = useMemo(() => Object.values(natives), [ natives ])

  return (
    <Autocomplete
      ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
      getOptionLabel={(native) => native.name}
      onChange={(e, native) => native && onChange(native.hash)}
      options={nativesArray}
      renderInput={(params) => (
        <TextField 
          {...params} 
          label="Preview Native" 
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <Typography noWrap>
            {option.name}
          </Typography>
        </li>
      )}
      sx={sx}
      value={natives[value]}
      disableClearable
      disableListWrap
      fullWidth
    />
  )
}
export default memo(NativeSelect)