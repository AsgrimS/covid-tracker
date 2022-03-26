import axios from "axios"

import { CountryCovidData, CountryHistoricalData } from "./types"

export const fetchCountryInfo = async (countryISO3: string): Promise<CountryCovidData> => {
  const response = await axios.get(`https://disease.sh/v3/covid-19/countries/${countryISO3}?strict=true`)
  return response.data
}

export const fetchHistoricalCountryData = async (
  countryISO3: string,
  lastDays: string | number = "all"
): Promise<CountryHistoricalData> => {
  const response = await axios.get(`https://disease.sh/v3/covid-19/historical/${countryISO3}?lastdays=${lastDays}`)
  return response.data
}
