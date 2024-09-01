import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
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

  // Categorize candidates into provincial, regional, and national
  const categories = {
    provincial: [],
    regional: [],
    national: [],
  };

  // Fill the categories with the corresponding candidates
  candidates.forEach((candidate) => {
    const categoryKeys = Object.keys(categories);
    categoryKeys.forEach((category) => {
      if (candidate.placement.includes(category.charAt(0).toUpperCase() + category.slice(1))) {
        categories[category].push(candidate);
      }
    });
  });

  // Handle user authentication and voting status
  useEffect(() => {
    if (!user) {
      // Uncomment these lines before deploying
      // alert('You must be logged in to vote.');
      // navigate('/login');
    } else if (localStorage.getItem('hasVoted')) {
      alert('You have already voted.');
      navigate('/profile');
    }
  }, [user, navigate]);

  // Update votes when the user selects a candidate
  const handleVoteChange = (category, candidate) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [category]: candidate,
    }));
  };

  // Handle vote submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const allVoted = Object.values(votes).every((vote) => vote !== '');
    if (!allVoted) {
      alert('You must vote in all categories.');
      return;
    }

    // Record votes back to the admin panel
    recordVotes(votes);

    // Store votes in local storage
    localStorage.setItem('votes', JSON.stringify(votes));
    localStorage.setItem('hasVoted', 'true');
    console.log('Votes submitted:', votes);

    // Generate a confirmation code
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
              {categories[category].length > 0 ? (
                categories[category].map((candidate, index) => (
                  <div key={`${category}-${index}`} className="label-container">
                    <input
                      type="radio"
                      id={`${category}-${index}`}
                      name={category}
                      value={candidate.name}
                      checked={votes[category] === candidate.name}
                      onChange={() => handleVoteChange(category, candidate.name)}
                    />
                    <label
                      htmlFor={`${category}-${index}`}
                      className="candidate-label"
                    >
                      {candidate.logo && <img src={candidate.logo} alt={`${candidate.name} logo`} />}
                      {candidate.name}
                    </label>
                  </div>
                ))
              ) : (
                <p>No candidates available for this category.</p>
              )}
            </div>
          ))}
        </div>

        <button type="submit">Submit Votes</button>
      </form>
    </div>
  );
}

export default VotingPage;
