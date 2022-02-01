import { createContext, useContext } from 'react'

export type ContextType = {
  network: number
  account?: string
  ready?: boolean
  connect: () => void
}

const DappContext = createContext<ContextType>({
  ready: false,
  network: 0,
  account: undefined,
  connect: () => {},
})

export default DappContext

export function useDapp() {
  return useContext(DappContext)
}
