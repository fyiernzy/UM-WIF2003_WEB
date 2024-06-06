import "../../pages-css/Jobscape/JobDetailsPage.css";
import { Button, Container, Row, Col, Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import JobAcceptedModal from "../../components/jobscape/JobAcceptedModal";
import UploadWorkModal from "../../components/jobscape/UploadWorkModal";
import {
  setTakenProject,
  uploadCompletedWorks,
  setApplyingProject,
  favoriteProject,
  removeFavoriteProject,
  removeApplyingProjects,
} from "../../api/projectApi";
import { API_URL } from "../../api/projectApi";
import axios from "../../utils/customAxios";
import moment from "moment";
import { useUserContext } from "../../context/UserContext";
import CancelApplicationModal from "../../components/jobscape/CancelApplicationModal";

export default function JobDetailsPage(props) {
  const { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [jobApplied, setjobApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState("notApplied");
  const [showAcceptedModal, setShowAcceptedModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [projectDetails, setProjectDetails] = useState({
    filters: [],
    requiredSkills: [],
    uploadedFiles: [],
  });

  const { user } = useUserContext();
  console.log("user context id in job details page: " + user._id);
  const userId = user._id;

  const navigate = useNavigate();

  const toggleBookmark = async (event) => {
    event.stopPropagation(); // Prevent event from bubbling up to parent (ProjectTab)
    try {
      if (saved) {
        await removeFavoriteProject(userId, projectId);
      } else {
        await favoriteProject(userId, projectId);
      }
      setSaved(!saved);
    } catch (error) {
      console.error("Error fav/remove fav project: ", error);
    }
  };

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };
  const handleApplyingButtonClick = () => {
    setShowCancelModal(true);
  };
  const handleCancelApplicationClick = async () => {
    setShowCancelModal(false);
    try {
      await removeApplyingProjects(userId, projectId);
      console.log("Application canceled!");
    } catch (error) {
      console.error("Error remove applying project: ", error);
    }
  };
  const handleSubmitClick = async (files) => {
    setShowUploadModal(false);
    console.log(files);
    try {
      if (files.length > 0) {
        await uploadCompletedWorks(files, projectId, userId);
        await fetchProjectDetails();
      }
    } catch (error) {
      console.error("Error upload works, frontend: ", error);
    }
  };
  const handleAcceptClick = async () => {
    setShowAcceptedModal(true);
    try {
      if (applicationStatus == "notApplied") {
        await setApplyingProject(userId, projectId);
      }
      setApplicationStatus("applying");
    } catch (error) {
      console.error("Error add applying project: ", error);
    }
  };
  const onFileChange = (files) => {
    // console.log(files);
  };
  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/${projectId}`);

      const project = response.data;
      console.log("response.data: " + JSON.stringify(response.data));
      const fetchedProject = {
        projectName: project.projectTitle,
        projectDesc: project.projectDescription,
        duration: project.projectDuration,
        contactInfo: project.contactInformation,
        additionalInfo: project.additionalNotes,
        deadline: moment(project.deadline).format("DD-MM-YYYY"),
        requiredSkills: project.requiredSkills,
        companyName: project.postedBy.username,
        category: project.projectCategory,
        filters: project.filter,
        budget: project.projectBudget,
        fileAccepted: project.fileAccepted,
        timePosted: calculateTimePosted(project.createdAt),
        uploadedFiles: project.uploadedFiles,
      };
      console.log("Fetched project details: " + JSON.stringify(fetchedProject));
      setProjectDetails(fetchedProject);
      setLoading(false);
    } catch (error) {
      console.log("Error occured: " + error.message);
      setLoading(false);
    }
  };
  // UseEffect to get current project's details
  useEffect(() => {
    fetchProjectDetails();
  }, []);

  // UseEffect to check if project is already taken by current user.
  useEffect(() => {
    const checkUserTakenProjects = async () => {
      console.log("checkUserTaken Projects UseEffect has been executed");
      try {
        const user = await axios.get(`http://localhost:5050/users/${userId}`);
        console.log(
          "Fetched user.data.data._id in jobdetailspage: " + user.data.data._id
        );
        const tknProjects = user.data.data.takenProjects;
        const applyingProjects = user.data.data.applyingProjects;
        const favoritedProjects = user.data.data.favoriteProjects;
        console.log("Fetch user from frontend, tknProjects: ", tknProjects);
        console.log(
          "Fetch user from frontend, applyingProjects : ",
          applyingProjects
        );
        setSaved(favoritedProjects.includes(projectId));
        if (
          Array.isArray(applyingProjects) &&
          applyingProjects.includes(projectId)
        ) {
          setApplicationStatus("applying");
        }
        if (Array.isArray(tknProjects) && tknProjects.includes(projectId)) {
          setApplicationStatus("applied");
        }
        if (projectDetails.uploadedFiles.length > 0) {
          setApplicationStatus("pendingApproval");
        }
      } catch (error) {
        console.error("Error fetching user projects: ", error);
      }
    };
    checkUserTakenProjects();
  }, [projectDetails.uploadedFiles]);

  const renderApplyButton = () => {
    switch (applicationStatus) {
      case "notApplied":
        return (
          <Button className="accept" onClick={handleAcceptClick}>
            Apply Job
          </Button>
        );
      case "applying":
        return (
          <Button className="applying-text" onClick={handleApplyingButtonClick}>
            Applying
          </Button>
        );
      case "applied":
        return (
          <Button className="accept" onClick={handleUploadClick}>
            Upload Work
          </Button>
        );
      case "pendingApproval":
        return (
          <Button
            className="accept"
            disabled={true}
            title="Please wait for file approval."
          >
            Pending
          </Button>
        );
      default:
        return null;
    }
  };
  const calculateTimePosted = (createdAt) => {
    const currentTime = new Date();
    const createdTime = new Date(createdAt);
    const diffInMs = currentTime - createdTime;
    const diffInSeconds = Math.floor(diffInMs / 1000); // Difference in seconds
    const diffInMinutes = Math.floor(diffInSeconds / 60); // Difference in minutes
    const diffInHours = Math.floor(diffInMinutes / 60); // Difference in hours

    if (diffInHours <= 1) {
      return "Less than an hour ago";
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24); // Difference in days
      return `${diffInDays} days ago`;
    }
  };
  function getOriginalFileName(fileName) {
    // Split the file name at the first hyphen
    const parts = fileName.split("-", 2);

    // Return the second part, which is the original file name
    return parts[1];
  }
  if (loading) {
    return <div>Loading...</div>; // Render loading indicator
  }
  return (
    <Container className="job-details-page-container">
      <Button className="back-btn" onClick={() => navigate(-1)}>
        <p>
          <i className="bi bi-chevron-left"></i>Back
        </p>
      </Button>
      <div className="job-details-body">
        <div className="job-title-block">
          <div className="title-texts">
            <div className="title-left">
              <h3>{projectDetails.projectName}</h3>
              <p className="CompanyInfo">
                By{" "}
                <span className="CompanyName">
                  {projectDetails.companyName}
                </span>{" "}
                in {"  "}
                <span className="Category">{projectDetails.category}</span>
              </p>
            </div>
            <div className="title-right">
              {applicationStatus == "applied" ||
              applicationStatus == "applied" ||
              applicationStatus == "pendingApproval" ? (
                <>
                  <h5>
                    Completion deadline: <br />
                    <span className="big-deadline">
                      {projectDetails.deadline}
                    </span>
                  </h5>
                </>
              ) : (
                <>
                  <div className="bookmark" onClick={toggleBookmark}>
                    {saved ? (
                      <i className="bi bi-bookmark-fill"></i>
                    ) : (
                      <i className="bi bi-bookmark"></i>
                    )}
                  </div>
                  <p>posted {projectDetails.timePosted}</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="Filters">
          {Array.isArray(projectDetails.filters) &&
            projectDetails.filters.map((filter, index) => (
              <Badge key={index} className="FilterBadge">
                {filter}
              </Badge>
            ))}
        </div>
        <h5>Job Description:</h5>
        <div className="job-desc">
          <p>{projectDetails.projectDesc}</p>
        </div>
        <p>
          Project Duration:{" "}
          <span className="duration">{projectDetails.duration}</span>
        </p>
        <p>
          Deadline for completion:{" "}
          <span className="deadline">{projectDetails.deadline}</span>
        </p>
        <p>
          Project Budget:{" "}
          <span className="budget">RM{projectDetails.budget}</span>
        </p>
        <p>Required Skills:</p>
        <ul className="skill-list">
          {Array.isArray(projectDetails.requiredSkills) &&
            projectDetails.requiredSkills.map((skill, index) => {
              return <li key={index}>{skill}</li>;
            })}
        </ul>
        <p>
          Contact Information: <br />
          <span className="contact">{projectDetails.contactInfo}</span>
        </p>
        <p>
          Additional Information: <br />
          {projectDetails.additionalInfo == null ? (
            <span>-</span>
          ) : (
            <span className="additional">{projectDetails.additionalInfo}</span>
          )}
        </p>
        {applicationStatus === "applied" ||
        applicationStatus === "pendingApproval" ? (
          <div>
            <h5>Uploaded Files:</h5>
            {projectDetails.uploadedFiles.length > 0 ? (
              <ul className="uploaded-files-list">
                {projectDetails.uploadedFiles.map((file, index) => (
                  <li
                    key={index}
                    className="uploaded-files"
                    title="Click to download"
                  >
                    <a
                      href={`${API_URL}/uploads/${file.fileName}`}
                      download
                      className="downloadable"
                    >
                      {getOriginalFileName(file.fileName)}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No files uploaded yet.</p>
            )}
          </div>
        ) : null}
        {user.role == "freelancer" ? (
          <Container className="button-group">
            <Row className="button-row">
              <Col></Col>
              <Col>
                {renderApplyButton()}

                <Button className="chat">
                  <i className="bi bi-chat-dots" /> Chat with Requester
                </Button>
              </Col>
              <Col className="to-job-list">
                <Link to="/YourJobs">
                  <Button className="to-job-list-btn">
                    Go to Job List <i className="bi bi-chevron-double-right" />
                  </Button>
                </Link>
              </Col>
            </Row>
          </Container>
        ) : (
          <></>
        )}
      </div>
      <JobAcceptedModal
        show={showAcceptedModal}
        projectName={projectDetails.projectName}
        deadline={projectDetails.deadline}
        onHide={() => setShowAcceptedModal(false)}
      />
      <UploadWorkModal
        show={showUploadModal}
        onHide={() => setShowUploadModal(false)}
        onFileChange={onFileChange}
        onSubmitClick={handleSubmitClick}
      />
      <CancelApplicationModal
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        onCancelClick={handleCancelApplicationClick}
      />
    </Container>
  );
}
