import { useState } from "react"
import styled from "@emotion/styled"
import { Container, Fade, SlideFade, VStack } from "@chakra-ui/react"
import { Box, Flex, Text } from "@chakra-ui/react"

import { CountryInfoData } from "./types"
import MapChart from "./components/MapChart"
import CountryInfo from "./components/CountryInfo"

const animationsDuration = 0.4

function App() {
  const [showInfo, setShowInfo] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<CountryInfoData>({
    ISO_A3: "",
    NAME: ""
  })

  const selectCountryCallback = (country: CountryInfoData) => {
    setShowInfo(true)
    if (selectedCountry.NAME === country.NAME) return
    setSelectedCountry(country)
  }

  return (
    <Container>
      <StyledFlex flexDir="column" h="100vh" py="1rem" alignItems="center">
        <StyledFade in={!showInfo} transition={{ enter: { duration: animationsDuration } }}>
          <Text fontSize="xl">Choose country</Text>
        </StyledFade>
        <VStack w="full" h="full">
          <MapChartBox my="auto" border="#364765 3px solid" borderRadius="15px" w="full">
            <MapChart selectCountryCallback={selectCountryCallback} />
          </MapChartBox>
          <DynamicSlideFade in={showInfo} showInfo={showInfo}>
            <CountryInfo countryData={selectedCountry} setShow={setShowInfo} />
          </DynamicSlideFade>
        </VStack>
      </StyledFlex>
    </Container>
  )
}

const MapChartBox = styled(Box)`
  svg {
    outline: none;
    border-radius: 15px;
  }
`

const DynamicSlideFade = styled(SlideFade)<{ showInfo: boolean }>`
  width: 100%;
  height: ${(props) => (props.showInfo ? "100%" : "0")};
  transition: height ${animationsDuration}s ease-out;
`
const StyledFade = styled(Fade)`
  position: absolute;
`

const StyledFlex = styled(Flex)`
  @media (orientation: portrait) {
    overflow: hidden;
  }
`

export default App
