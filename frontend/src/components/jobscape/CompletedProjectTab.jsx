import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SmallTitle from "../../components/jobscape/SmallTitle";
import ReviewForm from "../../components/jobscape/ReviewForm";
import ProjectDetailsModal from "./ProjectDetailsModal";
import PopNotification from "../../components/jobscape/PopNotification";
import "../../components-css/jobscape/Notification.css";
import axios from "axios";
import "../../components-css/jobscape/CompletedProjectTab.css";

const CompletedProjectTab = ({
  projectId,
  projectTitle,
  due,
  budget,
  collaborator,
  setShowNotification,
  collaboratorId,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [projectDetails, setProjectDetails] = useState(null);
  const [fileAccepted, setFileAccepted] = useState(false);
  const [fileRejected, setFileRejected] = useState(false);
  const [isProjectAccepted, setIsProjectAccepted] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showLocalNotification, setShowLocalNotification] = useState(false);
  const [hasSubmittedReview, setHasSubmittedReview] = useState(false);
  const [showReviewNotification, setShowReviewNotification] = useState(false);
  const [buttonText, setButtonText] = useState('Pay');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonColor, setButtonColor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAccepted = localStorage.getItem(`project_${projectId}_accepted`);
    const isReviewed = localStorage.getItem(`project_${projectId}_reviewed`);
    if (isAccepted) {
      setFileAccepted(true);
      setIsProjectAccepted(true);
    }
    if (isReviewed) {
      setHasSubmittedReview(true);
    }
  }, [projectId]);

  const handleProjectClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:5050/projects/${projectId}`
      );
      const data = await response.json();
      setProjectDetails(data);
      setShowProjectDetails(true);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const handleAccept = () => {
    axios
      .post(`http://localhost:5050/recruite/${projectId}/accept-file`, {
        userId: collaboratorId,
      })
      .then((response) => {
        setFileAccepted(true);
        localStorage.setItem(`project_${projectId}_accepted`, true);
        setIsProjectAccepted(true);
        setNotificationMessage("File accepted successfully.");
        setShowLocalNotification(true);
      })
      .catch((error) => {
        console.error("Error accepting the file:", error);
      });
  };

  const handleReject = () => {
    axios
      .post(`http://localhost:5050/recruite/${projectId}/reject-file`, {
        userId: collaboratorId,
      })
      .then((response) => {
        setFileRejected(true);
        setFileAccepted(false);
        localStorage.removeItem(`project_${projectId}_accepted`);
        setNotificationMessage("File rejected successfully.");
        setShowLocalNotification(true);
        setProjectDetails((prevProjectDetails) => ({
          ...prevProjectDetails,
          uploadedFiles: [],
        }));
      })
      .catch((error) => {
        console.error("Error rejecting the file:", error);
      });
  };


  const handlePayBtnClick = async () => {
    if (isProjectAccepted) {
      try {
        // Update the payment status in the database
        const updateResponse = await fetch(`http://localhost:5050/payment/updatePaymentStatus/${projectId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentStatus: true }),
        });
  
        if (!updateResponse.ok) {
          throw new Error(`Error updating payment status: ${updateResponse.statusText}`);
        }
  
        // Fetch project data
        const projectResponse = await fetch(`http://localhost:5050/projects/${projectId}`);
        const data = await projectResponse.json();
        const { projectTitle, projectBudget } = data;
  
        // Update local storage
        localStorage.setItem("projectTitle", projectTitle);
        localStorage.setItem("projectBudget", projectBudget);
        localStorage.setItem(`paymentStatus_${projectId}`, "Paid");
  
        // Update button appearance
        setButtonText("Paid");
        setButtonDisabled(true);
        setButtonColor("#d3d3d3");
  
        // Navigate to the ewallet page
        navigate("/ewallet", {
          state: { projectTitle, projectBudget },
        });
      } catch (error) {
        console.error("Error during payment process:", error);
      }
    }
  };

  useEffect(() => {
    // Check if payment is already done for this project
    const paymentStatus = localStorage.getItem(`paymentStatus_${projectId}`);
    if (paymentStatus === 'Paid') {
      setButtonText("Paid");
      setButtonDisabled(true); 
      setButtonColor("#d3d3d3");
    }
  }, []);
  

  const handleCloseProjectDetails = () => {
    setShowProjectDetails(false);
  };

  const handleRateClick = (e) => {
    e.stopPropagation();
    if (hasSubmittedReview) {
      setShowReviewNotification(true);
      setTimeout(() => {
        setShowReviewNotification(false);
      }, 3000); // Hide notification after 3 seconds
    } else {
      setShowReviewForm(true);
    }
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      const response = await fetch(
        `http://localhost:5050/recruite/${projectId}/saveReview`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reviewData),
        }
      );
      localStorage.setItem(`project_${projectId}_reviewed`, true);
      setHasSubmittedReview(true);
      setShowNotification(true);
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  return (
    <>
      <div className="CompletedProjectTab" onClick={handleProjectClick}>
        <div className="projectDetails">
          <SmallTitle title={projectTitle} fontWeight={700} fontSize="21px" />
          <div className="content">
            <div className="DetailsType">
              <p>Due</p>
              <p>Budget</p>
              <p>Collaborator</p>
            </div>
            <div className="Details">
              <p>{due}</p>
              <p>RM{budget}</p>
              <div>{collaborator}</div>
            </div>
          </div>
        </div>
        <div className="TabBtn">
          <div className="RateBtn" onClick={handleRateClick}>
            Rate
          </div>
          <button className="PayBtn" onClick={handlePayBtnClick} disabled={buttonDisabled} style={{backgroundColor: buttonColor}} >
            {buttonText}
          </button>
        </div>
      </div>
      {showReviewForm && (
        <ReviewForm
          onClose={() => setShowReviewForm(false)}
          onReviewSubmit={(reviewData) => {
            handleSubmitReview(reviewData);
            setShowNotification(true);
          }}
        />
      )}
      {showProjectDetails && (
        <ProjectDetailsModal
          project={projectDetails}
          onClose={handleCloseProjectDetails}
          onAccept={handleAccept}
          onReject={handleReject}
          fileAccepted={fileAccepted}
          fileRejected={fileRejected}
        />
      )}
      {showReviewNotification && (
        <div className="RateNotification">You have rated the project!</div>
      )}
    </>
  );
};

export default CompletedProjectTab;
