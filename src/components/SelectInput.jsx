import React from "react";

export default function SelectInput({ cities, onSelectInput = null }) {

  function handleSelectInput(e) {
    if(onSelectInput){
      onSelectInput(e.target.value)
    }
  }

	if (cities) {
		return (
			<div className='self-center my-3'>
				<select onChange={handleSelectInput}>
					<option disabled selected> Selecione </option>
					{cities.map(({ id, name }) => (
						<option value={id} key={id}>{name}</option>
					))}
				</select>
			</div>
		);
	}
}
