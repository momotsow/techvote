import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import Sidebar from './Sidebar';
import '../App.css';

function VotingPage() {
  const { user } = useAuth();
  const { candidates, recordVotes } = useAdmin(); 
  const [votes, setVotes] = useState({
    provincial: '',
    regional: '',
    national: '',
  });
  const navigate = useNavigate();

  const categories = {
    provincial: [],
    regional: [],
    national: [],
  };

  candidates.forEach((candidate) => {
    Object.keys(categories).forEach((category) => {
      if (candidate.placement.includes(category.charAt(0).toUpperCase() + category.slice(1))) {
        categories[category].push(candidate);
      } else {
        categories[category].push({ name: 'Not Available', logo: '', isPlaceholder: true });
      }
    });
  });

  useEffect(() => {
    if (!user) { 
      // need to re-add this before deploy
      // alert('You must be logged in to vote.');
      // navigate('/login');
    } else if (localStorage.getItem('hasVoted')) {
      alert('You have already voted.');
      navigate('/profile');
    }
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

    // Record votes back to the admin panel
    recordVotes(votes);

    //Get data from db/backend
    localStorage.setItem('votes', JSON.stringify(votes));
    localStorage.setItem('hasVoted', 'true');
    console.log('Votes submitted:', votes);

    const confirmationCode = Math.random().toString(36).substr(2, 9).toUpperCase();
    navigate('/thank-you', { state: { confirmationCode } });
  };

  return (
    <div className="voting-page container inside">
    <Sidebar />

      <form className="voting" onSubmit={handleSubmit}>
        <h2>Voting Page</h2>

        <div className="categories">
          {Object.keys(categories).map((category) => (
            <div key={category} className="category">
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)} Votes</h3>
              {categories[category].map((candidate, index) => (
                <div key={`${category}-${index}`} className="label-container">
                  <input
                    type="radio"
                    id={`${category}-${index}`}
                    name={category}
                    value={candidate.name}
                    checked={votes[category] === candidate.name}
                    onChange={() => handleVoteChange(category, candidate.name)}
                    disabled={candidate.isPlaceholder}
                  />
                  <label
                    htmlFor={`${category}-${index}`}
                    className={`candidate-label ${candidate.isPlaceholder ? 'not-available' : ''}`}
                  >
                    {candidate.isPlaceholder ? (
                      <span>Not Available</span>
                    ) : (
                      <>
                        {candidate.logo && <img src={candidate.logo} alt={`${candidate.name} logo`} />}
                        {candidate.name}
                      </>
                    )}
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
