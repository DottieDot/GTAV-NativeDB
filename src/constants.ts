
const GAME = process.env["REACT_APP_GAME"] ?? 'GTA5'

export const TITLE = process.env["REACT_APP_TITLE"] ?? 'GTA5 Native Reference'
export const SHORT_TITLE = process.env["REACT_APP_SHORT_TITLE"] ?? 'GTA5 NDB'

const allowedGameValues = ['GTA5', 'RDR3']
export function getGame(): 'GTA5' | 'RDR3' {
  if (allowedGameValues.includes(GAME)) {
    // @ts-ignore
    return GAME
  }
  
  throw new Error("Invalid game")
}
