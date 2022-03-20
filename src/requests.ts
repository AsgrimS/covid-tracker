import axios from "axios"

import { CountryCovidData } from "./types"

export const fetchCountryInfo = async (
  countryName: string
): Promise<CountryCovidData> => {
  const response = await axios.get(
    `https://disease.sh/v3/covid-19/countries/${countryName}?strict=true`
  )
  return response.data
}
