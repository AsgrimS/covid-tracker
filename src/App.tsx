import WorldMap from "./views/WorldMap"
import styled from "styled-components"
import { QueryClient, QueryClientProvider } from "react-query"
import { Text } from "@chakra-ui/react"

const queryClient = new QueryClient()

function App() {
  return (
    <BodyWrapper>
      <Text fontSize="6xl" color="whitesmoke" textAlign="center">
        World Map
      </Text>
      <QueryClientProvider client={queryClient}>
        <WorldMap />
      </QueryClientProvider>
    </BodyWrapper>
  )
}

const BodyWrapper = styled.section`
  height: 100vh;
  overflow: hidden;
  background: #3b4151;
  padding: 1rem 10vw;
`

export default App
