import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import {
  Box,
  Button,
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
  countryData: CountryInfoData
  setShow: (value: boolean) => void
}

const CountryInfo = ({ countryData, setShow }: CountryInfoProps) => {
  const [ActiveCasesRatioText, setActiveCasesRatioText] = useState("")

  const { data, refetch, isLoading, isSuccess, isError } = useQuery(
    ["countryInfo", countryData.ISO_A3],
    () => fetchCountryInfo(countryData.ISO_A3),
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
    if (!countryData.NAME) return
    refetch()
      .then(({ isSuccess, data }) => {
        if (!isSuccess) return
        setActiveCasesRatioText(
          getActiveCasesRatioText(data.active, data.population)
        )
      })
      .catch(console.error)
  }, [countryData.NAME])

  return (
    <InfoBox>
      <Text fontSize="2xl">{countryData.NAME}</Text>
      <DataContainer>
        {isLoading && (
          <Box textAlign="center">
            <Spinner size="xl" />
          </Box>
        )}
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
        colorScheme="blue"
        onClick={() => {
          setShow(false)
        }}
      >
        Close
      </Button>
    </InfoBox>
  )
}

const InfoBox = styled(Box)`
  background-color: #364765;
  border-radius: 15px;
  padding: 1rem;
`

const DataContainer = styled(Box)`
  padding: 1rem 0;
`

const CountryStat = styled(Stat)`
  margin-right: 1rem;
`

export default CountryInfo
