import { useState } from "react"
import ReactTooltip from "react-tooltip"

import { CountryInfoData } from "../types"
import MapChart from "../components/MapChart"
import CountryInfo from "../components/CountryInfo"

const WorldMap = () => {
  const [countryName, setCountryName] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<CountryInfoData>({
    ISO_A3: "",
    NAME: "",
  })

  return (
    <>
      <MapChart
        setCountryName={setCountryName}
        setSelectedCountry={setSelectedCountry}
      />
      <ReactTooltip>{countryName}</ReactTooltip>
      <CountryInfo countryInfo={selectedCountry} />
    </>
  )
}

export default WorldMap
