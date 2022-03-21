import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import {
  Button,
  Container,
  Spinner,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text
} from "@chakra-ui/react"
import styled from "styled-components"

import { CountryInfoData } from "../types"
import { fetchCountryInfo } from "../requests"

interface CountryInfoProps {
  countryInfo: CountryInfoData
  setShowInfo: (value: boolean) => void
  show: boolean
}

const CountryInfo = ({ countryInfo, setShowInfo, show }: CountryInfoProps) => {
  const [ActiveCasesRatioText, setActiveCasesRatioText] = useState("")

  const { data, refetch, isLoading, isSuccess, isError } = useQuery(
    ["countryInfo", countryInfo.ISO_A3],
    () => fetchCountryInfo(countryInfo.ISO_A3),
    {
      enabled: false,
      retry: 1
    }
  )

  const getActiveCasesRatioText = (
    activeCases: number,
    population: number
  ): string => {
    const ratio = ((activeCases * 100) / population).toFixed(2)
    if (parseFloat(ratio) >= 0.1) return `${ratio}%`
    else return `< 0.1%`
  }

  useEffect(() => {
    if (!countryInfo.NAME) return
    refetch()
      .then(({ isSuccess, data }) => {
        if (!isSuccess) return
        setActiveCasesRatioText(
          getActiveCasesRatioText(data.active, data.population)
        )
      })
      .catch(console.error)
  }, [countryInfo.NAME])

  if (!show) return <></>

  return (
    <InfoBox>
      <Text fontSize="2xl">{countryInfo.NAME}</Text>
      <DataContainer>
        {isLoading && <Spinner />}
        {isError && <Text>{"Country doesn't have any cases."}</Text>}
        {isSuccess && (
          <StatGroup>
            <CountryStat>
              <StatLabel>Active cases</StatLabel>
              <StatNumber>{data.active}</StatNumber>
              <StatHelpText>{ActiveCasesRatioText}</StatHelpText>
            </CountryStat>
            <CountryStat>
              <StatLabel>Total cases</StatLabel>
              <StatNumber>{data.cases}</StatNumber>
            </CountryStat>
            <CountryStat>
              <StatLabel>Population</StatLabel>
              <StatNumber>{data.population}</StatNumber>
            </CountryStat>
            <CountryStat>
              <StatLabel>Deaths</StatLabel>
              <StatNumber>{data.deaths}</StatNumber>
            </CountryStat>
          </StatGroup>
        )}
      </DataContainer>
      <Button
        colorScheme="blackAlpha"
        onClick={() => {
          setShowInfo(false)
        }}
      >
        Close
      </Button>
    </InfoBox>
  )
}

const InfoBox = styled(Container)`
  background-color: #4e536c;
  border-radius: 15px;
  padding: 1rem;
  margin: 1rem 0;

  color: whitesmoke;
  //position: fixed;
  //left: calc(50% - 15rem);
  //display: none;
`

const DataContainer = styled(Container)`
  padding: 1rem 0;
`

const CountryStat = styled(Stat)`
  margin-right: 1rem;
`

export default CountryInfo
