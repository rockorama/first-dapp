import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import Root from './components/Root'

export default function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Root />
      </ChakraProvider>
    </BrowserRouter>
  )
}
