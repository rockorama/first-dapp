import { Badge, Button, Heading, HStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { useDapp } from '../context/Context'
import { getNetwork } from '../eth/networks'
import truncateAddress from '../utils/truncateAddress'
import AccountIcon from './AccountIcon'

export default function Header() {
  const { ready, account, network, connect } = useDapp()

  return (
    <HStack
      width="full"
      backgroundColor="blue.600"
      p={4}
      justifyContent="space-between">
      <Heading size="lg" color="white">
        <Link to="/">First Dapp</Link>
      </Heading>
      {ready ? (
        <HStack spacing={4}>
          {network && (
            <Badge color="blue.600">
              {getNetwork(network)?.name || network}
            </Badge>
          )}

          {account ? (
            <HStack spacing={4}>
              <Text fontSize="sm" color="white">
                {truncateAddress(account)}
              </Text>
              <AccountIcon account={account} />
            </HStack>
          ) : (
            <Button colorScheme="gray" onClick={connect}>
              Connect
            </Button>
          )}
        </HStack>
      ) : null}
    </HStack>
  )
}
