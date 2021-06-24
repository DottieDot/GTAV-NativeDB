
export default interface NativeStats {
  namespaces: number
  natives   : number
  comments  : number
  knownNames: {
    total    : number
    confirmed: number
  }
}
