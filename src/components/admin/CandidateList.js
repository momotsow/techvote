import React, { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

function CandidateList() {
  const { candidates } = useContext(AdminContext);

  return (
    <div className="candidate-list">
      <h3>Candidates</h3>
      <table>
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Gauteng</th>
            <th>Limpopo</th>
            <th>KZN</th>
            <th>E. Cape</th>
            <th>N. Cape</th>
            <th>North West</th>
            <th>MP</th>
            <th>Free State</th>
            <th>W. Cape</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.name}>
              <td>
                <img src={candidate.logo} alt={`${candidate.name} logo`} className="candidate-logo" />
                {candidate.name}
              </td>
              <td>{candidate.votes.gauteng}</td>
              <td>{candidate.votes.limpopo}</td>
              <td>{candidate.votes.kzn}</td>
              <td>{candidate.votes.easternCape}</td>
              <td>{candidate.votes.northernCape}</td>
              <td>{candidate.votes.northWest}</td>
              <td>{candidate.votes.mpumalanga}</td>
              <td>{candidate.votes.freeState}</td>
              <td>{candidate.votes.westernCape}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CandidateList;
