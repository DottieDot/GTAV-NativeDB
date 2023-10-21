import { Tooltip, IconButton } from '@mui/material'
import { CloudOff as OfflineIcon, Update as UpdateIcon } from '@mui/icons-material'
import { useCallback, useState } from 'react'
import { useOnlineStatus, useUpdateAvailable } from '../../hooks'
import { useUpdateServiceWorker } from '../../hooks'

interface StatusIconProps {
  status: string
}
function StatusIcon({ status }: StatusIconProps) {
  switch (status) {
    case 'offline':
      return <OfflineIcon />
    case 'update':
      return <UpdateIcon />
    default:
      return null
  }
}

const statusTexts: { [name: string]: string } = {
  offline: 'Running in offline mode',
  update:  'Update Available'
}

export default function StatusButton() {
  const updateServiceWorker = useUpdateServiceWorker()
  const onlineStatus = useOnlineStatus()
  const updateAvailable = useUpdateAvailable()
  const [ loading, setLoading ] = useState(false)
  const status = onlineStatus 
    ? updateAvailable ? 'update' : ''
    : 'offline'

  const handleClick = useCallback(() => {
    setLoading(true)
    switch (status) {
      case 'update':
        updateServiceWorker()
        break
      case 'offline':
        window.location.reload()
        break
    }
  }, [ status, setLoading, updateServiceWorker ])

  if (!status) {
    return null
  }

  return (
    <Tooltip title={statusTexts[status]}>
      <IconButton disabled={loading} onClick={handleClick}>
        <StatusIcon status={status} />
      </IconButton>
    </Tooltip>
  )
}
