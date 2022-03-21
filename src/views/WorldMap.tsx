import { useEffect, useState } from "react"
import ReactTooltip from "react-tooltip"

import { CountryInfoData } from "../types"
import MapChart from "../components/MapChart"
import CountryInfo from "../components/CountryInfo"
import styled from "@emotion/styled"

type mapSizeType = "70vh" | "30vh"

const WorldMap = () => {
  const [countryName, setCountryName] = useState("")
  const [showInfo, setShowInfo] = useState(false)
  const [mapSize, setMapSize] = useState<mapSizeType>("70vh")
  // const [lastCountryName, setLastCountryName] = useState("")
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
      setMapSize("30vh")
    } else {
      setMapSize("70vh")
    }
  }, [showInfo])

  return (
    <>
      <MapChartContainer height={mapSize}>
        <MapChart
          setCountryName={setCountryName}
          selectCountryCallback={selectCountryCallback}
        />
      </MapChartContainer>
      <ReactTooltip>{countryName}</ReactTooltip>
      <CountryInfo
        countryData={selectedCountry}
        setShow={setShowInfo}
        show={showInfo}
      />
    </>
  )
}

const MapChartContainer = styled.div<{ height: string }>`
  svg {
    max-width: 100%;
    max-height: ${(props) => props.height};
    transition: max-height 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    margin-left: auto;
    margin-right: auto;
  }
`

export default WorldMap
