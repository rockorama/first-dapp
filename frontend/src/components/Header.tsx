import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import { useDapp } from '../context/Context'
import truncateAddress from '../utils/truncateAddress'

function Icon({ account }: { account: string }) {
  return (
    <Box>
      <Jazzicon diameter={40} seed={jsNumberForAddress(account)} />
    </Box>
  )
}

export default function Header() {
  const { ready, account, connect } = useDapp()
  return (
    <HStack
      width="full"
      backgroundColor="blue.600"
      p={4}
      justifyContent="space-between">
      <Heading color="white">First Dapp</Heading>
      {ready ? (
        account ? (
          <HStack spacing={4}>
            <Text color="white">{truncateAddress(account)}</Text>
            <Icon account={account} />
          </HStack>
        ) : (
          <Button colorScheme="gray" onClick={connect}>
            Connect
          </Button>
        )
      ) : null}
    </HStack>
  )
}
