import { useEffect } from "react"
import { useQuery } from "react-query"

import { CountryInfoData } from "../types"
import { fetchCountryInfo } from "../requests"
import styled from "styled-components"

interface CountryInfoProps {
  countryInfo: CountryInfoData
}

const CountryInfo = ({ countryInfo }: CountryInfoProps) => {
  const { data, refetch } = useQuery(
    ["countryInfo", countryInfo.ISO_A3],
    () => fetchCountryInfo(countryInfo.ISO_A3),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: false,
    }
  )

  useEffect(() => {
    console.log(countryInfo)
    if (countryInfo.ISO_A3) {
      refetch().catch(console.error)
    }
  }, [countryInfo])

  return (
    <InfoBox>
      {countryInfo.NAME}
      {data && <h3>{data.cases}</h3>}
    </InfoBox>
  )
}

const InfoBox = styled.div`
  color: whitesmoke;
`

export default CountryInfo
