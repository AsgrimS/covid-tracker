import { useState } from "react"
import MapChart from "../components/MapChart"
import ReactTooltip from "react-tooltip"
import CountryInfo from "../components/CountryInfo"

const WorldMap = () => {
  const [countryName, setCountryName] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")

  return (
    <>
      <MapChart
        setCountryName={setCountryName}
        setSelectedCountry={setSelectedCountry}
      />
      <ReactTooltip>{countryName}</ReactTooltip>
      <CountryInfo countryName={selectedCountry} />
    </>
  )
}

export default WorldMap
