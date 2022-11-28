
const GAME = process.env["REACT_APP_GAME"]

export const TITLE = process.env["REACT_APP_TITLE"]

const allowedGameValues = ['GTA5', 'RDR3']
export function getGame(): 'GTA5' | 'RDR3' {
  if (allowedGameValues.includes(GAME ?? '')) {
    // @ts-ignore
    return GAME
  }
  
  throw new Error("Invalid game")
}

