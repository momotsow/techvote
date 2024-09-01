import React, { useState, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

function CandidateForm() {
  const { addCandidate } = useContext(AdminContext);
  const [name, setName] = useState('');
  const [logo, setLogo] = useState(null);

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCandidate = {
      name,
      logo: URL.createObjectURL(logo),
      votes: { national: 0, provincial: 0, regional: 0 },
      totalVotes: 0,
    };
    addCandidate(newCandidate);
    setName('');
    setLogo(null);
  };

  return (
    <div className="candidate-form">
      <h3>Add Candidate</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Candidate Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input type="file" onChange={handleLogoChange} required />
        <button type="submit">Add Candidate</button>
      </form>
    </div>
  );
}

export default CandidateForm;
