import { Context, useContext } from 'react'

export default function useGuardedContext<T>(context: Context<T | null>, hookName: string, providerName: string): T {
  const ctx = useContext(context)
  if (ctx === null) {
    throw Error(`${hookName} used without a ${providerName}`)
  }
  return ctx
}
