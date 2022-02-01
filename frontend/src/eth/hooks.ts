import { useCallback, useEffect, useMemo, useState } from 'react'

import { BigNumberish, Contract } from 'ethers'
import { formatEther } from 'ethers/lib/utils'

import { getAccounts, getContract, verifyMetamask } from './utils'

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
  return useMemo(() => {
    try {
      return getContract(account)
    } catch (e: any) {
      return null
    }
  }, [account])
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
