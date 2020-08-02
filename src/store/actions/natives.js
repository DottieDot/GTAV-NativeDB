import { SET_NATIVES } from '../reducers/natives'

export const loadNatives = () => async (dispatch) => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/alloc8or/gta5-nativedb-data/master/natives.json')
    const data = await response.json()

    const namespaces = Object.keys(data).reduce((accumulator, namespace) => {
      accumulator[namespace] = {
        name: namespace,
        natives: Object.keys(data[namespace])
      }
      return accumulator
    }, {})
    
    const natives = Object.keys(data).reduce(
      (accumulator, namespace) => {
        (Object.keys(data[namespace]).forEach(
          (nativeHash) => 
            accumulator[nativeHash] = {
              hash: nativeHash,
              ...data[namespace][nativeHash]
            }))

        return accumulator
      }, {})

    dispatch({
      type: SET_NATIVES,
      natives, namespaces
    })
  }
  catch (e) {
    console.error(e)
  }
}
