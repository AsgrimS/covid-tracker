import { memo } from "react"
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps"

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

interface MapChartProps {
  setCountryName: (value: string) => void
  setSelectedCountry: (value: string) => void
}

const MapChart = ({ setCountryName, setSelectedCountry }: MapChartProps) => {
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
                    const { NAME } = geo.properties
                    setSelectedCountry(NAME)
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
                      fill: "#D6D6DA",
                      outline: "none",
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
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
