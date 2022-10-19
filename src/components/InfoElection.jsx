import React from "react";

export default function InfoElection({ city }) {
	if(city) {
    const {name, votingPopulation, absence, presence} = city[0]
    return (
      <section>
        <div className="w-full">
          <h2 className="text-center font-bold">Eleição em: {name} </h2>
        </div>

        <div className='flex justify-between my-4'>
          <strong>Total de Eleitores: {votingPopulation} </strong>
          <strong>Abstenção:{absence}</strong>
          <strong>Comparecimento:{presence}</strong>
        </div>

        <div className="w-full">
          <p className="text-center"> 0 Candidates </p>
        </div>

      </section>
    );
  }
}
