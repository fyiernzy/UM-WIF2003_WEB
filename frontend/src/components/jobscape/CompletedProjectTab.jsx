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
  const [isProjectAccepted, setIsProjectAccepted] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showLocalNotification, setShowLocalNotification] = useState(false);
  const navigate = useNavigate();

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
    console.log("Accept button clicked");
    axios
      .post(`http://localhost:5050/recruite/${projectId}/accept-file`, {
        userId: collaboratorId,
      })
      .then((response) => {
        console.log("Accept response: ", response);
        setFileAccepted(true);
        localStorage.setItem(`project_${projectId}_accepted`, true); // Store accepted state in localStorage
        setIsProjectAccepted(true);
        setNotificationMessage("File accepted successfully.");
        setShowLocalNotification(true);
      })
      .catch((error) => {
        console.error("Error accepting the file:", error);
      });
  };

  // Check if the project has been accepted before
  useEffect(() => {
    const isAccepted = localStorage.getItem(`project_${projectId}_accepted`);
    if (isAccepted) {
      setFileAccepted(true);
      setIsProjectAccepted(true);
    }
  }, [projectId]);

  const handleReject = () => {
    console.log(
      "Reject button clicked, this is the collaborator id: " + collaboratorId
    );
    axios
      .post(`http://localhost:5050/recruite/${projectId}/reject-file`, {
        userId: collaboratorId,
      })
      .then((response) => {
        console.log("Reject response: ", response);
        setFileRejected(true);
        setFileAccepted(false);
        localStorage.removeItem(`project_${projectId}_accepted`);
        setFileRejected(true);
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
        const response = await fetch(
          `http://localhost:5050/projects/${projectId}`
        );
        const data = await response.json();
        const { projectTitle, projectBudget } = data;

        localStorage.setItem("projectTitle", projectTitle);
        localStorage.setItem("projectBudget", projectBudget);

        navigate("/ewallet", {
          state: { projectTitle, projectBudget },
        });
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    }
  };

  const handleCloseProjectDetails = () => {
    setShowProjectDetails(false);
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
      setShowLocalNotification(true);
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
          <div
            className="RateBtn"
            onClick={(e) => {
              setShowReviewForm(true);
              e.stopPropagation();
            }}
          >
            Rate
          </div>
          <button className="PayBtn" onClick={handlePayBtnClick}>
            Pay
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
      {showLocalNotification && (
        <PopNotification
          message={notificationMessage}
          onClose={() => setShowLocalNotification(false)}
        />
      )}
    </>
  );
};

export default CompletedProjectTab;
