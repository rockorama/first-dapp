import { Container, Heading, Table, Tbody, Td, Tr } from '@chakra-ui/react'

import useGreeter from '../eth/contracts/Greeter'

export default function Index() {
  const contract = useGreeter()

  return (
    <Container maxW="container.xl" paddingY={10}>
      {!contract ? (
        <Heading>Unsupported network</Heading>
      ) : (
        <>
          <Heading mb={10}>Contract Details</Heading>
          <Table variant="striped">
            <Tbody>
              <Tr>
                <Td>Name</Td>
                <Td>{contract.name}</Td>
              </Tr>
              <Tr>
                <Td>Address</Td>
                <Td>{contract.contract.address}</Td>
              </Tr>
            </Tbody>
          </Table>
          <Heading my={10}>Methods</Heading>
          <Table variant="striped">
            <Tbody>
              {contract.abi
                .filter((i) => i.type === 'function')
                .map((item) => (
                  <Tr key={item.name}>
                    <Td>{item.name}</Td>
                    <Td>{item.inputs.length}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </>
      )}
    </Container>
  )
}
