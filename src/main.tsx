import React from "react"
import ReactDOM from "react-dom"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "react-query"

import App from "./App"

const queryClient = new QueryClient()
const config = {
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark"
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={extendTheme(config)}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
