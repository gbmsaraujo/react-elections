import { get } from "./httpService"

const URL_CITIES = '/cities'
const URL_CANDIDATES = '/candidates'

export async function getCitiesBackend () {
  const cities = await get(URL_CITIES)
  return cities
}

export async function getCandidatesBackend () {
  const candidates = await get(URL_CANDIDATES)
  return candidates
}

