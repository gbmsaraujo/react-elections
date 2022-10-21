import React from "react";

export default function CardCandidate({
	src,
	name,
	votes,
	totalVotes,
	elected = false
}) {
	const percent = ((Number(votes) / Number(totalVotes)) * 100).toFixed(2);

	const classText = elected ? "text-green-500" : "text-yellow-500";

	return (
		<section className='border w-60 p-4 drop-shadow-md'>
			<div className='flex justify-between items-center'>
				<img className='rounded-full w-20' src={src} alt='candidate' />
				<div>
					<p className={`${classText} font-bold`}>{percent} %</p>
					<p>{votes} votes</p>

				</div>
			</div>

			<div className="flex flex-col gap-2 mt-4 items-center">
			  <h2 className="text-gray-500 font-bold text-lg">{name}</h2>
        {elected ? (
  						<h3 className={`${classText} font-bold`}>Eleito</h3>
  					) : (
  						<h3 className={`${classText} font-bold`}>
  							{" "}
  							Não Eleito{" "}
  						</h3>
  					)}
			</div>
		</section>
	);
}
