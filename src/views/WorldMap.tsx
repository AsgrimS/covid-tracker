import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { Box, Flex, SlideFade } from "@chakra-ui/react"
import ReactTooltip from "react-tooltip"

import { CountryInfoData } from "../types"
import MapChart from "../components/MapChart"
import CountryInfo from "../components/CountryInfo"

type mapSizeType = "70vh" | "40rem"

const WorldMap = () => {
  const [countryName, setCountryName] = useState("")
  const [showInfo, setShowInfo] = useState(false)
  const [mapSize, setMapSize] = useState<mapSizeType>("70vh")
  const [selectedCountry, setSelectedCountry] = useState<CountryInfoData>({
    ISO_A3: "",
    NAME: ""
  })

  const selectCountryCallback = (country: CountryInfoData) => {
    setShowInfo(true)
    if (selectedCountry.NAME === country.NAME) return
    setSelectedCountry(country)
  }

  useEffect(() => {
    if (showInfo) {
      setMapSize("40rem")
    } else {
      setMapSize("70vh")
    }
  }, [showInfo])

  return (
    <Flex flexDir="column">
      <MapChartContainer height={mapSize}>
        <MapChart
          setCountryName={setCountryName}
          selectCountryCallback={selectCountryCallback}
        />
      </MapChartContainer>
      <ReactTooltip>{countryName}</ReactTooltip>
      <CountryInfoBox>
        <SlideFade
          transition={{ enter: { duration: 0.3 } }}
          offsetY="50vh"
          in={showInfo}
        >
          <CountryInfo countryData={selectedCountry} setShow={setShowInfo} />
        </SlideFade>
      </CountryInfoBox>
    </Flex>
  )
}

const MapChartContainer = styled(Box)<{ height: string }>`
  svg {
    max-width: 100%;
    max-height: ${(props) => props.height};
    transition: max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    margin-left: auto;
    margin-right: auto;
  }
`

const CountryInfoBox = styled(Box)`
  min-width: 35rem;
  align-self: center;
  margin-top: 1rem;
  margin-bottom: 3rem;
`
export default WorldMap
