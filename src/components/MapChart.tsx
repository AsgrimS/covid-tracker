import { memo } from "react"
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps"

import { CountryInfoData } from "../types"
import { geoUrl } from "../settings"

interface MapChartProps {
  setCountryName: (value: string) => void
  selectCountryCallback: (value: CountryInfoData) => void
}

const MapChart = ({ setCountryName, selectCountryCallback }: MapChartProps) => {
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    const { NAME, ISO_A3 } = geo.properties
                    selectCountryCallback({ NAME, ISO_A3 })
                  }}
                  onMouseEnter={() => {
                    const { NAME } = geo.properties
                    setCountryName(NAME)
                  }}
                  onMouseLeave={() => {
                    setCountryName("")
                  }}
                  style={{
                    default: {
                      fill: "#A4ABBD",
                      outline: "none"
                    },
                    hover: {
                      fill: "#90cdf4",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#90cdf4",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  )
}

export default memo(MapChart)
