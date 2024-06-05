import React from 'react';
import Modal from 'react-modal';

const TaxModal = ({ isOpen, onRequestClose, message }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center',
      width: '500px',
      fontSize: '17px',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
  };

  const buttonStyles = {
    marginTop: '20px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#2d4777',
    color: '#fff',
    cursor: 'pointer',
  };

  return (
    <div>
      <style>
        {`
          .modal-button {
            background-color: #2d4777;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            padding: 10px 20px;
            margin-top: 20px;
          }
          
          .modal-button:hover {
            background-color: #1e335a;
          }
        `}
      </style>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="No Records Found"
        style={customStyles}
      >
        <h2>{message}</h2>
        <button className="modal-button" onClick={onRequestClose}>Noted</button>
      </Modal>
    </div>
  );
};

export default TaxModal;
