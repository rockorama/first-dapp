export default function truncateAddress(address: string) {
  const edgeSize = 10
  const start = address.substring(0, edgeSize)
  const end = address.substring(address.length - edgeSize)
  return `${start}...${end}`
}
