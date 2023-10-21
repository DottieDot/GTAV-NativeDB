import { atStringHash as atStringHashWasm, atStringHash64 as atStringHash64Wasm, atLiteralStringHash as atLiteralStringHashWasm } from 'wasm-lib'

export function atStringHash(str: string): number | undefined {
  return atStringHashWasm(str)
}

export function atStringHash64(str: string): bigint | undefined {
  const hash = atStringHash64Wasm(str)
  if (hash === undefined) {
    return undefined
  }

  return BigInt.asUintN(64, BigInt(hash))
}

export function atLiteralStringHash(str: string): number | undefined {
  return atLiteralStringHashWasm(str)
}
