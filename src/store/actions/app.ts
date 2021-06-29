
export const SET_UPDATE_READY = 'SET_UPDATE_READY'

export interface SetUpdateReady {
  type          : typeof SET_UPDATE_READY
  swRegistration: ServiceWorkerRegistration
}

export function setUpdateReady(swRegistration: ServiceWorkerRegistration): SetUpdateReady {
  return {
    type: SET_UPDATE_READY,
    swRegistration
  }
}
