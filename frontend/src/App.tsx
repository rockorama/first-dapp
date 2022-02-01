import { ChakraProvider } from '@chakra-ui/react'

import ContractProvider from './context/Contract'
import Router from './Router'

export default function App() {
  return (
    <ChakraProvider>
      <ContractProvider>
        <Router />
      </ContractProvider>
    </ChakraProvider>
  )
}
