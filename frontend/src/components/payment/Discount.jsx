import React , { useState } from "react";
import "../../pages-css/Payment/Payment.css";

const Discount = ({ onSelectCard }) => {

    const cards = [
        { id: 1, title: 'New User Special ( -RM 20 Discount)'},
        { id: 2, title: 'New Opening Special ( -RM 10 Discount)'},
        { id: 3, title: 'Original Price'}
      ];
    
      const [selectedCard, setSelectedCard] = useState(null);
      const [isModalOpen, setIsModalOpen] = useState(false);
    
      const handleCardSelect = (card) => {
          setSelectedCard(card);
          setIsModalOpen(false);
          onSelectCard(card);
      };
  
  return (
    <div style={containerStyle}>
        <div style={horizontalBoxStyle}>
          <div style={cardDetailsStyle}>
            {!selectedCard && <p style={{ paddingLeft: '15px' }}>Apply Voucher For Discount</p>}
            {selectedCard && (
              <>
                <h3 style={{ paddingLeft: '15px' }}>{selectedCard.title}</h3>
              </>
            )}
          </div>
          <button onClick={() => setIsModalOpen(true)} style={dropdownButtonStyle}>
            <i className="bi-chevron-down" style={{ color: 'black' }} />
          </button>
        </div>
          {isModalOpen && (
            <div style={modalStyle}>
              <div>
                {cards.map((card) => (
                  <div
                    key={card.id}
                    style={modalCardStyle}
                    onClick={() => handleCardSelect(card)}
                  >
                    <h4>{card.title}</h4>
                  </div>
                ))}
              </div>
              {/* <button onClick={() => setIsModalOpen(false)} style={cancelButtonStyle}>Cancel</button> */}
            </div>
          )}
      </div>

  );
};

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '35px',
    marginBottom: '18px'
  };
  
  const horizontalBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '500px',
    marginBottom: '20px',
    backgroundColor: 'white',
    borderRadius: '15px',
  
  };
  
  const cardDetailsStyle = {
    marginRight: '20px'
  };
  
  const dropdownButtonStyle = {
    backgroundColor: '#80d1d5',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer'
  };
  
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(203 213 225)',
    border: '1px solid #ccc',
    borderRadius: '15px',
    padding: '20px',
    zIndex: 1000,
    width: '500px',
    height: '260px',
    
  };
  
  const modalCardStyle = {
    flex: 1,
    backgroundColor: 'white',
    padding: '20px',
    margin: '0 10px',
    borderRadius: '10px',
    cursor: 'pointer',
    marginBottom: '20px'
  };
  
  const cancelButtonStyle = {
    backgroundColor: '#2d4777',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '24vh',
    marginTop: '10px',
  };

export default Discount;
