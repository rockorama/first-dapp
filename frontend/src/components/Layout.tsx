import { VStack } from '@chakra-ui/react'

import Header from './Header'

export default function Layout(props: { children: any }) {
  return (
    <VStack h="full" spacing={0} height="100vh">
      <Header />
      <VStack width="full" overflowY="auto" flex={1} spacing={0} padding={0}>
        {props.children}
      </VStack>
    </VStack>
  )
}
