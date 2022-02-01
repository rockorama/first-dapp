const NETWORKS = {
  1: { name: 'mainnet' },
  4: { name: 'rinkeby' },
  5: { name: 'goerli' },
  42: { name: 'kovan' },
  1337: { name: 'localhost' },
}

export function getNetwork(id: number) {
  return NETWORKS[id as keyof typeof NETWORKS] || undefined
}

export default NETWORKS
