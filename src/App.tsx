import WorldMap from "./views/WorldMap"
import styled from "styled-components"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

function App() {
  return (
    <BodyWrapper>
      <Title>World Map</Title>
      <QueryClientProvider client={queryClient}>
        <WorldMap />
      </QueryClientProvider>
    </BodyWrapper>
  )
}

const BodyWrapper = styled.section`
  height: calc(100vh - 2rem);
  background: #3b4151;
  padding: 1rem 15vw;
`

const Title = styled.h1`
  margin: 0;
  color: whitesmoke;
  text-align: center;
`

export default App
