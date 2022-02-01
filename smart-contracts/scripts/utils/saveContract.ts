import fs from 'fs'
import path from 'path'

const TEMPLATE = `import { useMemo } from 'react'

import { ethers } from 'ethers'

import ABI from '../../../artifacts/contracts/{{NAME}}.sol/{{NAME}}.json'
import { useDapp } from '../../../context/Context'
import { getNetwork } from '../../networks'
import { {{NAME}} } from '../../types'

export function get{{NAME}}Contract(network: number, account?: string) {
  const networkData = getNetwork(network)

  if (!networkData) throw new Error('unsupported_network')

  try {
    const CONTRACT_ADDRESS = require(\`./\${networkData.name}/address.json\`)
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const getData = () => {
      // if an account is specified, return a contract with a signer
      if (account) {
        const signer = provider.getSigner(account)
        return new ethers.Contract(
          CONTRACT_ADDRESS.address,
          ABI.abi,
          signer,
        ) as {{NAME}}
      }

      // else, return a read only contract
      return new ethers.Contract(
        CONTRACT_ADDRESS.address,
        ABI.abi,
        provider,
      ) as {{NAME}}
    }

    return { name: '{{NAME}}', abi: ABI.abi, contract: getData() }
  } catch (e) {
    throw new Error('unsupported_network')
  }
}

export default function use{{NAME}}() {
  const { network, account } = useDapp()
  return useMemo(() => {
    try {
      return get{{NAME}}Contract(network, account)
    } catch (e) {
      return undefined
    }
  }, [network, account])
}
`

function checkDir(dir: string) {
  const subDirs = dir.split(path.sep)
  let last = ''
  subDirs.forEach((s) => {
    const current = last + s + path.sep
    if (!fs.existsSync(current)) {
      fs.mkdirSync(current)
    }
    last = current
  })
}

export function saveContractAddress(
  name: string,
  address: string,
  network: string,
) {
  const dir = path.join(
    '..',
    'frontend',
    'src',
    'eth',
    'contracts',
    name,
    network,
  )
  checkDir(dir)
  const fileName = 'address.json'
  const fullPath = path.join(dir, fileName)

  fs.writeFileSync(fullPath, JSON.stringify({ name, address }))
  console.log(`'${fileName}' generated`)
}

export function saveContractHook(name: string) {
  const dir = path.join('..', 'frontend', 'src', 'eth', 'contracts', name)
  checkDir(dir)
  const fileName = 'index.ts'
  const fullPath = path.join(dir, fileName)

  fs.writeFileSync(fullPath, TEMPLATE.split('{{NAME}}').join(name))
}

export default function saveContract(
  name: string,
  address: string,
  network: string,
) {
  saveContractAddress(name, address, network)
  saveContractHook(name)
}
