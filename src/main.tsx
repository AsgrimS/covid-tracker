import React from "react"
import ReactDOM from "react-dom"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

import App from "./App"

const config = {
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark"
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={extendTheme(config)}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
