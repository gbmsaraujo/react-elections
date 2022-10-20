import { useEffect, useState } from "react";
import CardsElection from "./components/CardsElection";
import Header from "./components/Header";
import InfoElection from "./components/InfoElection";
import SelectInput from "./components/SelectInput";
import { sortVotes } from "./helpers/sort";
import {
	getCandidatesBackend,
	getCitiesBackend,
	getElectionBackend
} from "./services/apiService";

export default function App() {
	const [cities, setCities] = useState([]);
	const [candidates, setCandidates] = useState([]);
	const [selectedCity, setSelectedCity] = useState(null);
	const [election, setElection] = useState([]);
	const [candidatesByCity, setCandidatesByCity] = useState([]);

	useEffect(() => {
		async function fetchDataBackend() {
			const citiesBackend = await getCitiesBackend();
			const candidatesBackend = await getCandidatesBackend();
			const electionBackend = await getElectionBackend();

			setCities(citiesBackend);
			setCandidates(
				candidatesBackend.map((candidate) => {
					return {
						...candidate,
						src: `./assets/img/${candidate.username}.png`
					};
				})
			);
			setElection(
				electionBackend.map((election) => {
					return election;
				})
			);
		}
		fetchDataBackend();
	}, []);

	/* useEffect(()=>{
		const filterElection = election.filter((elect)=> elect.cityId === selectedCity.  )
	},[selectedCity]) */

	function handleSelectCity(cityId) {
		setSelectedCity(cities.filter((city) => city.id === cityId));
		setCandidatesByCity(
			sortVotes(election.filter((elect) => elect.cityId === cityId))
		);
	}

	function reduceCandidatesAndElection() {
		if (candidates && election) {
			const electionReduced = election.reduce((acc, curValue) => {
				candidates.map((candidate) => {
					if (candidate.id === curValue.candidateId) {
						console.log(candidate.name)
					}

					return acc
				});

			}, []);

			console.log(electionReduced)
		}
	}

	reduceCandidatesAndElection();

	return (
		<div>
			<Header>React-Elections</Header>
			<main className='flex flex-col'>
				<SelectInput cities={cities} onSelectInput={handleSelectCity} />
				<div className='container mx-auto p-4'>
					<CardsElection>
						{selectedCity && (
							<InfoElection city={selectedCity}></InfoElection>
						)}
					</CardsElection>
				</div>
			</main>
		</div>
	);
}
