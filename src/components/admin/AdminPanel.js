import React, { useState } from 'react';
import CandidateModal from './CandidateModal';

const AdminPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Add Candidate</button>
      {isModalOpen && (
        <CandidateModal onClose={closeModal} />
      )}
    </div>
  );
};

export default AdminPanel;
