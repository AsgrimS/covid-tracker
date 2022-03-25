import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import {
  Box,
  Flex,
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
    <Flex
      flexDir="column"
      bgColor="#364765"
      borderRadius="15px"
      p="1rem"
      height="full"
    >
      <Text fontSize="2xl">{countryData.NAME}</Text>
      {isLoading && (
        <Box textAlign="center" my="auto">
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
      <Button
        marginTop="auto"
        colorScheme="blue"
        onClick={() => {
          setShow(false)
        }}
      >
        Close
      </Button>
    </Flex>
  )
}

const CountryStat = styled(Stat)`
  margin-right: 1rem;
  min-width: 30%;
`

export default CountryInfo
