import { atLiteralStringHash, atStringHash, atStringHash64 } from '../../common'

export type HashingAlgorithm = 'atStringHash' | 'atStringHash64' | 'atLiteralStringHash'
export type HashingFormat = 'hex' | 'unsigned' | 'signed'

function hashWithAlgorithm(input: string, algo: HashingAlgorithm): number | bigint | undefined {
  switch (algo) {
    case 'atLiteralStringHash':
      return atLiteralStringHash(input)
    case 'atStringHash':
      return atStringHash(input)
    case 'atStringHash64':
      return atStringHash64(input)
  }
}

function hashLine(line: string, algo: HashingAlgorithm): [bigint, number] | undefined {
  const trimmed = line.trim()
  const hash = hashWithAlgorithm(trimmed, algo)
  if (hash !== undefined) {
    const bits = algo === 'atStringHash64' ? 64 : 32
    return [ BigInt(hash), bits ]
  }
}

export function hashInput(input: string, algo: HashingAlgorithm): ([bigint, number] | undefined)[] {
  return input
    .replaceAll('\r', '')
    .split('\n')
    .filter(line => line.trim().length)
    .map(line => hashLine(line, algo))
}


export function formatHash(hashInput: [bigint, number] | undefined, format: HashingFormat): string {
  if (hashInput === undefined) {
    return '<ERROR>'
  }

  const [ hash, bits ] = hashInput

  switch (format) {
    case 'hex':
      return `0x${hash.toString(16).padStart(bits / 4, '0').toUpperCase()}`
    case 'signed':
      return BigInt.asIntN(bits, hash).toString(10)
    case 'unsigned':
      return hash.toString(10)
  }
}
