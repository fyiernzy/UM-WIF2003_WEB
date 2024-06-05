import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SmallTitle from "../../components/jobscape/SmallTitle";
import InProgressProjectTab from "../../components/jobscape/InProgressProjectTab";
import CompletedProjectTab from "../../components/jobscape/CompletedProjectTab";
import ProjectPostedTab from "../../components/jobscape/ProjectPostedTab";
import axios from "../../utils/customAxios";
import "../../components-css/jobscape/Notification.css";
import "../../pages-css/Jobscape/ReviewProjectPage.css";
import { useUserContext } from "../../context/UserContext";

const ReviewProjectPage = () => {
  const navigate = useNavigate();
  const { user } = useUserContext(); // Get the user from context
  const [ProjectPosted, setProjectPosted] = useState([]);
  const [inProgressProjects, setInProgressProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [isProjectPostedFetched, setIsProjectPostedFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("ReviewProjectPage user context: " + user);
        const userId = user?._id;
        const postedResponse = await axios.get(
          `http://localhost:5050/recruite/posted?userId=${userId}`
        );
        setProjectPosted(postedResponse.data);
        setIsProjectPostedFetched(true);

        const inProgressResponse = await axios.get(
          `http://localhost:5050/recruite/in-progress?userId=${userId}`
        );
        setInProgressProjects(inProgressResponse.data);
        console.log(inProgressResponse.data);

        const completedResponse = await axios.get(
          `http://localhost:5050/recruite/completed?userId=${userId}`
        );
        setCompletedProjects(completedResponse.data);
        console.log(completedResponse.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, [user]);

  const moveToInProgress = (project) => {
    setProjectPosted((prev) => prev.filter((p) => p._id !== project._id));
    setInProgressProjects((prev) => [...prev, project]);
  };

  const deleteProject = (projectId) => {
    setProjectPosted((prev) => prev.filter((p) => p._id !== projectId));
  };

  return (
    <div className="ReviewProjectPage">
      <div className="ReviewBackBtn">
        <Button className="BackBtn" onClick={() => navigate("/SeekTalentPage")}>
          <p>
            <i className="bi-chevron-left" />
            Back
          </p>
        </Button>
      </div>

      <div className="Reviewheader">
        <SmallTitle
          className="ReviewTitle"
          title="Review Your Recent Project"
          fontWeight="700"
          fontSize="36px"
        />
      </div>

      <div className="ProjectPosted">
        <SmallTitle title="Project Posted" fontWeight="400" fontSize="28px" />
        <div className="ProjectPostedList">
          {isProjectPostedFetched && ProjectPosted.length === 0 ? (
            <p
              style={{ fontWeight: "500", fontSize: "24px", color: "red" }}
              className="nothing"
            >
              No projects posted
            </p>
          ) : (
            ProjectPosted.map((project) => (
              <ProjectPostedTab
                key={project._id}
                projectId={project._id}
                projectTitle={project.projectTitle}
                due={new Date(project.deadline).toLocaleDateString("en-GB")}
                budget={project.projectBudget}
                postedDate={project.createdAt}
                onMoveToInProgress={moveToInProgress}
                onDeleteProject={deleteProject} 
              />
            ))
          )}
        </div>
      </div>

      <div className="InProgress">
        <SmallTitle title="In Progress" fontWeight="400" fontSize="28px" />
        <div className="InProgressList">
          {inProgressProjects.length === 0 ? (
            <p
              style={{ fontWeight: "500", fontSize: "24px", color: "red" }}
              className="nothing"
            >
              No projects in progress
            </p>
          ) : (
            inProgressProjects.map((project) => (
              <InProgressProjectTab
                key={project._id}
                projectId={project._id}
                projectTitle={project.projectTitle}
                due={new Date(project.deadline).toLocaleDateString("en-GB")}
                budget={project.projectBudget}
                collaborator={project.serviceProvider.username}
                collaboratorId={project.serviceProvider._id}
              />
            ))
          )}
        </div>
      </div>

      <div>
        <SmallTitle title="Completed" fontWeight="400" fontSize="28px" />
        <div className="CompletedProjectList">
          {completedProjects.length === 0 ? (
            <p
              style={{ fontWeight: "500", fontSize: "24px", color: "red" }}
              className="nothing"
            >
              No projects completed
            </p>
          ) : (
            completedProjects.map((project) => (
              <CompletedProjectTab
                key={project._id}
                projectId={project._id}
                projectTitle={project.projectTitle}
                due={new Date(project.deadline).toLocaleDateString("en-GB")}
                budget={project.projectBudget}
                collaborator={project.serviceProvider.username}
                collaboratorId={project.serviceProvider._id}
                setShowNotification={setShowNotification}
              />
            ))
          )}
        </div>
      </div>

      {showNotification && (
        <div className="overlay">
          <div className="post-project-notification">
            <p>Your review has been successfully submitted!</p>
            <button onClick={() => setShowNotification(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewProjectPage;
