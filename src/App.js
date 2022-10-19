import { useEffect, useState } from "react";
import CardsElection from "./components/CardsElection";
import Header from "./components/Header";
import InfoElection from "./components/InfoElection";
import SelectInput from "./components/SelectInput";
import { getCandidatesBackend, getCitiesBackend } from "./services/apiService";

export default function App() {
	const [cities, setCities] = useState([]);
	const [candidates, setCandidates] = useState([]);
	const [selectedCity, setSelectedCity] = useState(null);

	useEffect(() => {
		async function fetchDataBackend() {
			const citiesBackend = await getCitiesBackend();
			const candidatesBackend = await getCandidatesBackend();

			setCities(citiesBackend);
			setCandidates(candidatesBackend);
		}
		fetchDataBackend();
	}, []);

	function handleSelectCity(cityId) {
		setSelectedCity(cities.filter((city) => city.id === cityId));
	}

  console.log(selectedCity)

	return (
		<div>
			<Header>React-Elections</Header>
			<main className='flex flex-col'>
				<SelectInput cities={cities} onSelectInput={handleSelectCity} />
				<div className='container mx-auto p-4'>
					<CardsElection>
            {selectedCity && <InfoElection city={selectedCity}></InfoElection>}
					</CardsElection>
				</div>
			</main>
		</div>
	);
}
