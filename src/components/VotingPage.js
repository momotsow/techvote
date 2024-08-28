import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const categories = {
  provincial: [
    { name: 'Candidate A', logo: require('../imgs/hide.png') },
    { name: 'Candidate B', logo: require('../imgs/hide.png') },
    { name: 'Candidate C', logo: require('../imgs/hide.png') },
  ],
  regional: [
    { name: 'Candidate D', logo: require('../imgs/hide.png') },
    { name: 'Candidate E', logo: require('../imgs/hide.png') },
    { name: 'Candidate F', logo: require('../imgs/hide.png') },
  ],
  national: [
    { name: 'Candidate G', logo: require('../imgs/hide.png') },
    { name: 'Candidate H', logo: require('../imgs/hide.png') },
    { name: 'Candidate I', logo: require('../imgs/hide.png') },
  ],
};

function VotingPage() {
  const { user } = useAuth();
  const [votes, setVotes] = useState({
    provincial: '',
    regional: '',
    national: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // if (!user) {
    //   alert('You must be logged in to vote.');
    //   navigate('/login');
    // } else if (localStorage.getItem('hasVoted')) {
    //   alert('You have already voted.');
    //   navigate('/profile');
    // }
  }, [user, navigate]);

  const handleVoteChange = (category, candidate) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [category]: candidate,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!user) {
    //   alert('You must be logged in to vote.');
    //   navigate('/login');
    //   return;
    // }

    const allVoted = Object.values(votes).every((vote) => vote !== '');
    if (!allVoted) {
      alert('You must vote in all categories.');
      return;
    }

    localStorage.setItem('votes', JSON.stringify(votes));
    localStorage.setItem('hasVoted', 'true');
    console.log('Votes submitted:', votes);

    const confirmationCode = Math.random().toString(36).substr(2, 9).toUpperCase();
    navigate('/thank-you', { state: { confirmationCode } });
  };

  return (
    <div className="voting-page container">
      <form className="voting" onSubmit={handleSubmit}>
      <h2>Voting Page</h2>

        <div className="categories">

          {Object.keys(categories).map((category) => (
            <div key={category} className="category">
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)} Votes</h3>
              {categories[category].map((candidate) => (
                <div key={candidate.name} className="label-container">
                  <input
                    type="radio"
                    id={`${category}-${candidate.name}`}
                    name={category}
                    value={candidate.name}
                    checked={votes[category] === candidate.name}
                    onChange={() => handleVoteChange(category, candidate.name)}
                  />
                  <label
                    htmlFor={`${category}-${candidate.name}`}
                    className={votes[category] === candidate.name ? 'highlight' : ''}
                  >
                    <img src={candidate.logo} alt={`${candidate.name} logo`} />
                    {candidate.name}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button type="submit">Submit Votes</button>
      </form>
    </div>
  );
}

export default VotingPage;
