import { useEffect, useState } from 'react'

import { Box, Container, Heading, useToast } from '@chakra-ui/react'
import { SubmitButton, TextField } from '@formact/chakra-ui'
import Form from 'formact'

import useGreeter from '../eth/contracts/Greeter'

export default function Greeter() {
  const toast = useToast()
  const data = useGreeter()
  const [greeting, setGreeting] = useState('')

  const getGreeting = async () => {
    try {
      const _greeting = await data?.contract.greet()
      setGreeting(_greeting || '')
    } catch (e: any) {
      toast({
        title: 'Oops! Something went wrong',
        description: e.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    getGreeting()
  }, [data])

  return (
    <Container maxW="container.xl" paddingY={10}>
      {!data ? (
        <Heading>Unsupported network</Heading>
      ) : (
        <Box>
          <Heading mb={10}>Greeter Dapp</Heading>
          <Box my={10}>
            <Heading size="md">{greeting}</Heading>
          </Box>

          <Box my={10}>
            <Form<{ greeting: string }>
              onSubmit={async (payload) => {
                if (payload.valid) {
                  try {
                    const transaction = await data.contract.setGreeting(
                      payload.values.greeting,
                    )
                    await transaction.wait()
                    await getGreeting()
                    toast({
                      title: 'Greeting updated successfully',
                      description:
                        'Your new greeting was recorded on the blockchain!',
                      status: 'success',
                      duration: 9000,
                      isClosable: true,
                    })
                  } catch (e: any) {
                    toast({
                      title: 'Oops! Something went wrong',
                      description: e.message,
                      status: 'error',
                      duration: 9000,
                      isClosable: true,
                    })
                  }
                }
                payload.onFinish(true)
              }}>
              <TextField required name="greeting" label="New greeting" />
              <SubmitButton>Submit</SubmitButton>
            </Form>
          </Box>
        </Box>
      )}
    </Container>
  )
}
