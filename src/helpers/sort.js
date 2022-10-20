export function sortVotes(elections = []) {
  const sort = elections.sort((electionA, electionB) => {
    return electionB.votes - electionA.votes

  });

  return sort;
}
