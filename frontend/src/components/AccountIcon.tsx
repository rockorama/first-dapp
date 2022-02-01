import { useEffect, useRef } from 'react'

import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Jazzicon from '@metamask/jazzicon'

const StyledIdenticon = styled.div<{ size: number }>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  background-color: black;
`

export default function AccountIcon({
  account,
  size = 32,
}: {
  account: string
  size?: number
}) {
  const ref = useRef<HTMLDivElement>()
  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(
        Jazzicon(size, parseInt(account.slice(2, 10), 16)),
      )
    }
  }, [account])

  return (
    <Box border="2px solid white" borderRadius={size} padding={1}>
      <StyledIdenticon size={size} ref={ref as any} />
    </Box>
  )
}
