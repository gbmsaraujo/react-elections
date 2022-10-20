import { get } from "./httpService";

const URL_CITIES = "/cities";
const URL_CANDIDATES = "/candidates";
const URL_ELECTION = "/election";

export async function getCitiesBackend() {
	const cities = await get(URL_CITIES);
	return cities;
}

export async function getCandidatesBackend() {
	const candidates = await get(URL_CANDIDATES);
	return candidates;
}

export async function getElectionBackend() {
	const election = await get(URL_ELECTION);
	return election;
}
