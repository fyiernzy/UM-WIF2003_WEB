import "../../pages-css/Payment/Payment.css";
import React, { useEffect, useState } from "react";
import BackButton from '../../components/payment/BackButton';
import ServiceSummary from '../../components/payment/serviceSummary';
import Reminder from '../../components/payment/Reminder';
import ChoosePaymentMethod from "../../components/payment/ChoosePaymentMethod";
import { useUserContext } from "../../context/UserContext";
import axios from '../../utils/customAxios';

function Ewallet() {
  const {user} = useUserContext();
  console.log("Your jobs page userContext: " + JSON.stringify(user));

  const [projectTitle, setProjectTitle] = useState('');
  const [projectBudget, setProjectBudget] = useState('');
  const [taskData, setTaskData] = useState({});

  // read linked ewallet
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);

  // get the linked payment method
  useEffect(() => {
    if (user._id) {
      fetchPaymentMethod(user._id);
    }
  }, [user]);

  
  const fetchPaymentMethod = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5050/payment/selectedWallets?userId=${userId}`);
      if (response.status === 200) {
        setServices(response.data);
        console.log("Selected e wallets:", response.data);
      } else {
        throw new Error('Failed to fetch payment method.');
      }
    } catch (error) {
      console.error("Error fetching payment method:", error);
    }
  };
  
  const handleServiceClick = (services) => {
    setSelectedService(services);
    localStorage.setItem('paymentMethod' , services);
  };

  //  write choose what ewallet to pay 
  const [selectedWallet, setSelectedWallet] = useState('');
  const handleWalletChange = (event) => {
    setSelectedWallet(event.target.value);
    localStorage.setItem('paymentMethod' , event.target.value);
  };

  const handleSubmit = () => {
    if (!selectedWallet) {
        alert('Please select an e-wallet.');
    } else if (!user) {
        alert('Please ensure user is logged in.');
    } else {
        axios.post('http://localhost:5050/payment/submit', {
            selectedWallet,
            userId: user._id
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200) {
                console.log('Data saved successfully.');
                window.location.href = "/redirect";
            } else {
                throw new Error('Failed to save data.');
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
};

  return (
    <>
    <BackButton/>
    <div className="split-container">
        <div className="LeftContainer">
          <p className="PaymentBigtitle">Payment</p>
          <hr className="line"></hr>
          <p className="titleLinked">Linked payment method:</p>

          {/* {services.map((service, index) => (
            <div
              key={index}
              onClick={() => {
                handleServiceClick(service);
                window.location.href = "/redirect";
              } }
              className={`automatedContainer ${selectedService && selectedService.name === service.name ? 'selected' : ''}`}
            >
              <p className="BankName"></p>
              <p>{service.selectedWallet}</p>
            </div>
          ))} */}

<div>
      {services.map((service, index) => (
        <div
          key={index}
          onClick={() => {
            handleServiceClick(service);
            window.location.href = "/redirect";
          }}
          className={`automatedContainer ${selectedService === service ? 'selected' : ''}`}
        >
          <p className="BankName">{service}</p>
        </div>
      ))}
    </div>

          <ChoosePaymentMethod/>
          <div>
            <p className="titleLinked">Choose Preferred E-Wallet</p>
            <select
              className="ewallet"
              value={selectedWallet}
              onChange={handleWalletChange}
            >
              <option value="">Select E-Wallet</option>
              <option value="Touch N Go">Touch N Go</option>
              <option value="Boost">Boost</option>
              <option value="Grab Pay">GrabPay</option>
              <option value="MAE">MAE</option>
              <option value="BigPay">BigPay</option>
              <option value="AliPay">AliPay</option>
              <option value="ShopeePay">ShopeePay</option>
            </select>
            {selectedWallet && (
              <p className="selectedEwallet">You selected: {selectedWallet}</p>
            )}
          </div>
          <button
            className="buttonPay"
            onClick={handleSubmit}>
            Pay Now
          </button>
          <Reminder/>
        </div>
        <ServiceSummary 
        projectTitle={projectTitle} 
        projectBudget={projectBudget} 
        taskData={taskData} 
      />
      </div></>
  );
}
export default Ewallet;