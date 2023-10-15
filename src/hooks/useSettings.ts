import { useSettingsContext } from '../context'

export default function useSettings() {
  return useSettingsContext().settings
}
