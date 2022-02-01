import { useCallback, useEffect, useMemo, useState } from 'react'

import { BigNumberish, Contract } from 'ethers'
import { formatEther } from 'ethers/lib/utils'

import { getAccounts, getContract, verifyMetamask } from './utils'

export function useNetwork(): number {
  const [network, setNetwork] = useState<number>(1)

  useEffect(() => {
    try {
      verifyMetamask()
      // detect Network account change
      window.ethereum.on('networkChanged', function (networkId: number) {
        setNetwork(networkId)

        // eslint-disable-next-line no-console
        console.log('networkChanged', networkId)
      })
    } catch (e) {}
  }, [])

  return network
}

export function useAccount(): [string, () => Promise<void>] {
  const [account, setAccount] = useState<string>('')

  const connectAccount = useCallback(async () => {
    const accounts = await getAccounts()
    setAccount(accounts[0])
  }, [])

  useEffect(() => {
    try {
      verifyMetamask()
      window.ethereum.on('accountsChanged', connectAccount)
    } catch (e) {}
  }, [])

  return [account, connectAccount]
}

export function useContract(account: string) {
  const network = useNetwork()
  return useMemo(() => {
    try {
      return getContract(network, account)
    } catch (e: any) {
      return null
    }
  }, [account, network])
}

export function useBotPrice(contract: Contract) {
  const [price, setBotPrice] = useState<BigNumberish | undefined>()

  useEffect(() => {
    const getPrice = async () => {
      const _price = await contract.mintPrice()
      setBotPrice(_price)
    }
    getPrice()
  }, [contract])

  return { price, formatted: formatEther(price || '0') }
}
