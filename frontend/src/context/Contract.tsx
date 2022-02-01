import { createContext, useCallback, useContext, useState } from 'react'

import { useAccount, useContract as useContractHook } from '../eth/hooks'
import { Greeter } from '../eth/types'

type ContextType = {
  account?: string
  contract: Greeter
  connectAccount: () => void
}

const Context = createContext<ContextType>({
  contract: {} as Greeter,
  connectAccount: () => {},
})

export default function ContractProvider(props: { children: any }) {
  const [account, connect] = useAccount()
  const [error, setError] = useState<string>('')
  const contract = useContractHook(account)

  const connectAccount = useCallback(async () => {
    try {
      await connect()
    } catch (e: any) {
      setError(e.message)
    }
  }, [])

  if (!contract || error) return <div>No Metamask available</div>

  return (
    <Context.Provider
      value={{
        contract,
        connectAccount,
        account,
      }}>
      {props.children}
    </Context.Provider>
  )
}

export function useContract() {
  return useContext(Context)
}
