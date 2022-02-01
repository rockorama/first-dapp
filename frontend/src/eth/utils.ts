import { ethers } from 'ethers'

import GREETER from '../artifacts/contracts/Greeter.sol/Greeter.json'
import GREETER_CONTRACT from './contracts/Greeter/localhost/address.json'
import { Greeter } from './types'

export function verifyMetamask() {
  if (!window.ethereum) {
    throw new Error('Metamask not installed')
  }
}

export async function getAccounts(): Promise<string[]> {
  verifyMetamask()

  return window.ethereum.request({ method: 'eth_requestAccounts' })
}

export function getContract(network: number, account?: string) {
  verifyMetamask()

  const provider = new ethers.providers.Web3Provider(window.ethereum)

  // if an account is specified, return a contract with a signer
  if (account) {
    const signer = provider.getSigner(account)
    return new ethers.Contract(
      GREETER_CONTRACT.address,
      GREETER.abi,
      signer,
    ) as Greeter
  }

  // else, return a read only contract
  return new ethers.Contract(
    GREETER_CONTRACT.address,
    GREETER.abi,
    provider,
  ) as Greeter
}
