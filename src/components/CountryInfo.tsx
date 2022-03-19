import axios from "axios"
import { useQuery } from "react-query"
import { useEffect } from "react"

const fetchCountryInfo = async (countryName: string): Promise<number> => {
  const response = await axios.get(
    `https://disease.sh/v3/covid-19/countries/${countryName}?strict=true`
  )
  console.log("click")
  return response.data.cases
}

const CountryInfo = ({ countryName }: { countryName: string }) => {
  const { data, refetch } = useQuery(
    ["countryInfo", countryName],
    () => fetchCountryInfo(countryName),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: false,
    }
  )

  useEffect(() => {
    if (countryName) {
      refetch().catch(console.error)
    }
  }, [countryName])

  return (
    <div>
      {countryName}
      {data && <h3>{data}</h3>}
    </div>
  )
}

export default CountryInfo
