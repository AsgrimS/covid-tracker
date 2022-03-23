import WorldMap from "./views/WorldMap"
import { QueryClient, QueryClientProvider } from "react-query"
import { Container, Text } from "@chakra-ui/react"

const queryClient = new QueryClient()

function App() {
  return (
    <Container maxW="container.xl" overflow="hidden" minHeight="100vh">
      <Text fontSize="6xl" textAlign="center">
        Covid Tracker
      </Text>
      <QueryClientProvider client={queryClient}>
        <WorldMap />
      </QueryClientProvider>
    </Container>
  )
}

export default App
