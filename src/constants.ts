
const GAME = process.env["REACT_APP_GAME"] ?? 'GTA5'

export const TITLE = process.env["REACT_APP_TITLE"] ?? 'GTA5 Native Reference'

const allowedGameValues = ['GTA5', 'RDR3']
export function getGame(): 'GTA5' | 'RDR3' {
  if (allowedGameValues.includes(GAME)) {
    // @ts-ignore
    return GAME
  }
  
  throw new Error("Invalid game")
}
