import { useEffect, useRef, useState } from 'react'

import {
  Heading,
  VStack,
  Progress,
  Text,
  Button,
  Box,
  CircularProgress,
} from '@chakra-ui/react'
import MetaMaskOnboarding from '@metamask/onboarding'

import DappContext from '../context/Context'
import Router from '../Router'
import Layout from './Layout'

export default function Root() {
  const [loading, setLoading] = useState(true)

  const [accounts, setAccounts] = useState<string[]>([])
  const onboarding = useRef<MetaMaskOnboarding>()
  const [network, setNetwork] = useState<number>(
    window?.ethereum?.networkVersion || 0,
  )

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        onboarding.current?.stopOnboarding()
      }
    }
  }, [accounts])

  // Listen to network changes
  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum.on('networkChanged', function (networkId: number) {
        setNetwork(networkId)
      })
    }
  }, [])

  // Listen to account changes
  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      const handleNewAccounts = (newAccounts: string[]) => {
        setAccounts(newAccounts)
        setNetwork(window?.ethereum?.networkVersion)
      }
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts)
      window.ethereum.on('accountsChanged', handleNewAccounts)
    }
  }, [])

  if (!onboarding.current || loading) {
    return <Progress hasStripe size="lg" isIndeterminate />
  }

  const connect = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts: string[]) => {
          setAccounts(newAccounts)
          setNetwork(window?.ethereum?.networkVersion)
        })
    } else {
      onboarding.current?.startOnboarding()
    }
  }
  const account = accounts[0]
  const ready = MetaMaskOnboarding.isMetaMaskInstalled() || !account

  return (
    <DappContext.Provider
      value={{
        account,
        ready,
        network,
        connect,
      }}>
      <Layout>
        {MetaMaskOnboarding.isMetaMaskInstalled() ? (
          ready ? (
            <Router />
          ) : (
            <VStack alignItems="center" justifyContent="center" flex={1}>
              <Heading size="md">Connecting...</Heading>
              <CircularProgress isIndeterminate />
            </VStack>
          )
        ) : (
          <VStack
            overflowY="auto"
            align="center"
            justifyContent="center"
            flex={1}
            spacing={10}
            padding={10}>
            <Box>
              <Heading>Oops! Metamask is not installed</Heading>
              <Text>
                In order to use this application, you need to install the
                Metamask extension
              </Text>
            </Box>
            <Button
              size="lg"
              colorScheme="blue"
              onClick={() => onboarding.current?.startOnboarding()}>
              Install Metamask
            </Button>
          </VStack>
        )}
      </Layout>
    </DappContext.Provider>
  )
}
