import { useEffect, useState } from "react";
import CardCandidate from "./components/CardCandidate";
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
	const [candidatesFiltered, setCandidatesFiltered] = useState([]);

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
						src: `/images/${candidate.username}.png`
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

	useEffect(() => {
		const candidatesReduced = candidates.reduce((acc, curValue, index) => {
			const candidate = candidatesByCity.find(
				(candidate) => candidate.candidateId === curValue.id
			);

			return !candidate ? acc : sortVotes([...acc, { ...candidate, ...curValue }]);



		}, []);

		setCandidatesFiltered(candidatesReduced);
	}, [selectedCity, candidates, candidatesByCity]);

	function handleSelectCity(cityId) {
		setSelectedCity(cities.filter((city) => city.id === cityId));
		setCandidatesByCity(
			sortVotes(election.filter((elect, index) => elect.cityId === cityId))
		);
	}

	console.log(selectedCity)
	return (
		<div>
			<Header>React-Elections</Header>
			<main className='flex flex-col'>
				<SelectInput cities={cities} onSelectInput={handleSelectCity} />
				<div className='container mx-auto p-4'>
					<CardsElection>
						{selectedCity && candidatesByCity && (
							<InfoElection
								city={selectedCity}
								candidateLength={candidatesByCity.length}
							></InfoElection>
						)}

						<section className="flex flex-wrap flex-row gap-1 justify-center">
						{candidatesFiltered &&
							candidatesFiltered.map((candidate, index) => {
								if(index === 0) {
									candidate = {...candidate, elected: true}
								}

								return (
									<CardCandidate
										key={candidate.id}
										src={candidate.src}
										votes={candidate.votes}
										totalVotes={selectedCity[0].presence}
										name={candidate.name}
										elected={candidate.elected}
									/>
								);
							})}
						</section>
					</CardsElection>
				</div>
			</main>
		</div>
	);
}
