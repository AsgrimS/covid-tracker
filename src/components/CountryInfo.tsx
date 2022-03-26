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
  Text,
  Divider,
  HStack
} from "@chakra-ui/react"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts"
import styled from "styled-components"

import { CountryHistoricalData, CountryInfoData } from "../types"
import { fetchCountryInfo, fetchHistoricalCountryData } from "../requests"

interface CountryInfoProps {
  countryData: CountryInfoData
  setShow: (value: boolean) => void
}

interface ChartDataEntry {
  year: number
  cases: number
  deaths: number
}

const CountryInfo = ({ countryData, setShow }: CountryInfoProps) => {
  const [activeCasesRatioText, setActiveCasesRatioText] = useState("")
  const [deathCasesRatioText, setDeathCasesRatioText] = useState("")
  const [recoveredCasesRatio, setRecoveredCasesRatio] = useState("")
  const [chartData, setChartData] = useState<ChartDataEntry[]>()
  const [showCases, setShowCases] = useState(true)

  const countryInfoQuery = useQuery(["countryInfo", countryData.ISO_A3], () => fetchCountryInfo(countryData.ISO_A3), {
    enabled: false,
    retry: 1
  })

  const historicalCountryData = useQuery(
    ["historicalCountryData", countryData.ISO_A3],
    () => fetchHistoricalCountryData(countryData.ISO_A3),
    {
      enabled: false,
      retry: 1
    }
  )

  const toggleShowCases = () => setShowCases(!showCases)

  const prepareChartData = (countryHistoricalData: CountryHistoricalData): ChartDataEntry[] => {
    const { cases, deaths } = countryHistoricalData.timeline
    const dataList: ChartDataEntry[] = []

    for (const date of Object.keys(cases)) {
      dataList.push({ year: new Date(date).getFullYear(), cases: cases[date], deaths: deaths[date] })
    }

    return dataList
  }

  const getABRatioText = (a: number, b: number): string => {
    const ratio = ((a * 100) / b).toFixed(2)
    if (parseFloat(ratio) >= 0.1) return `${ratio}%`
    else return `< 0.1%`
  }

  useEffect(() => {
    if (!countryData.NAME) return

    countryInfoQuery
      .refetch()
      .then(({ isSuccess, data }) => {
        if (!isSuccess) return
        setActiveCasesRatioText(getABRatioText(data.active, data.population))
        setDeathCasesRatioText(getABRatioText(data.deaths, data.cases))
        setRecoveredCasesRatio(getABRatioText(data.recovered, data.cases))
      })
      .catch(console.error)

    historicalCountryData
      .refetch()
      .then(({ isSuccess, data }) => {
        if (!isSuccess) return
        setChartData(prepareChartData(data))
      })
      .catch(console.error)
  }, [countryData.NAME])

  return (
    <Flex flexDir="column" bgColor="#364765" borderRadius="15px" p="1rem" height="full">
      <Text fontSize="2xl">{countryData.NAME}</Text>
      {countryInfoQuery.isLoading && (
        <Box textAlign="center" my="auto">
          <Spinner size="xl" />
        </Box>
      )}
      {countryInfoQuery.isError && <Text>No data for selected region.</Text>}
      {countryInfoQuery.isSuccess && (
        <>
          <StatGroup>
            <CountryStat>
              <StatLabel>Total cases</StatLabel>
              <StatNumber>{countryInfoQuery.data.cases}</StatNumber>
            </CountryStat>
            <CountryStat>
              <StatLabel>Population</StatLabel>
              <StatNumber>{countryInfoQuery.data.population}</StatNumber>
            </CountryStat>
            <CountryStat>
              <StatLabel>Active cases</StatLabel>
              <StatNumber>{countryInfoQuery.data.active}</StatNumber>
              <StatHelpText>{activeCasesRatioText} of population</StatHelpText>
            </CountryStat>
            <CountryStat>
              <StatLabel>Recovered</StatLabel>
              <StatNumber>{countryInfoQuery.data.recovered}</StatNumber>
              <StatHelpText>{recoveredCasesRatio} of total cases</StatHelpText>
            </CountryStat>
            <CountryStat>
              <StatLabel>Deaths</StatLabel>
              <StatNumber>{countryInfoQuery.data.deaths}</StatNumber>
              <StatHelpText>{deathCasesRatioText} of total cases</StatHelpText>
            </CountryStat>
          </StatGroup>
          <Divider />
          {historicalCountryData.isLoading && (
            <Box textAlign="center" my="auto">
              <Spinner size="xl" />
            </Box>
          )}
          {historicalCountryData.isError && <Text>Could not load historical data.</Text>}
          {historicalCountryData.isSuccess && (
            <>
              <HStack justifyContent="center" mt="0.5rem">
                <Button
                  size="sm"
                  disabled={showCases}
                  variant={showCases ? "solid" : "outline"}
                  colorScheme="blue"
                  onClick={toggleShowCases}
                >
                  Cases
                </Button>
                <Button
                  size="sm"
                  disabled={!showCases}
                  variant={!showCases ? "solid" : "outline"}
                  colorScheme="blue"
                  onClick={toggleShowCases}
                >
                  Deaths
                </Button>
              </HStack>
              <ChartContainer height={200}>
                <LineChart data={chartData}>
                  <XAxis dataKey="year" stroke="#ffffffeb" />
                  <YAxis stroke="#ffffffeb" allowDuplicatedCategory={false} />
                  {showCases ? (
                    <Line type="monotone" dataKey="cases" stroke="#4ba0f4" dot={false} />
                  ) : (
                    <Line type="monotone" dataKey="deaths" stroke="#de5448" dot={false} />
                  )}
                </LineChart>
              </ChartContainer>
            </>
          )}
        </>
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

const ChartContainer = styled(ResponsiveContainer)`
  margin-top: auto;
`

export default CountryInfo
