import { useCallback } from 'react'
import copy from 'copy-to-clipboard'

export default function useCopyToClipboard() {
  return useCallback((text: string, _successText: string = 'Copied to clipboard') => {
    if (copy(text)) {
      // TODO show sucess message
    }
  }, [])
}
