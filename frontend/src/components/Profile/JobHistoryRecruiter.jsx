import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "../../components-css/Profile/JobHistoryCSS.css";
import { useNavigate } from "react-router-dom";
import { getCompletedProjects } from "../../api/projectApi";
import noJob from "../../assets/profile/no_job.svg";
import axios from "../../utils/customAxios";


const JobHistoryRecruiter = ({ userId }) => {
  const [postedProjects, setProjectPosted] = useState([]);
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postedResponse = await axios.get(
          `http://localhost:5050/recruite/posted?userId=${userId}`
        );
        setProjectPosted(postedResponse.data);

      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, [userId]);
  
  const handleClick = (projectId) => {
    navigate(`/SeekJobPage/job-details/${projectId}`);
  };

  if (error) {
    return <p>{error}</p>; 
  }

  if (postedProjects.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img style={{ width: '150px', height: '100px' }} src={noJob} alt="No Job" />
      </div>
    );
  }

  return (
    <>
      {postedProjects.map((jobInfo, index) => (
        <div key={index} className="job-history-card">
          <Row className="header">
            <Col xs={7} className="info-column">
              <h3 className="fs-5"><strong>{jobInfo.projectTitle}</strong></h3>
              <p>Posted by {jobInfo.postedDate}</p>
            </Col>
            <Col xs={3} className="status-column fs-6">
              <p>{jobInfo.completed ? "Completed" : "Ongoing"}</p>
            </Col>
          </Row>
          <Row className="JobHistoryContent">
            <Col>
              <p>
                <strong>Deadline for completion:</strong> {new Date(jobInfo.deadline).toLocaleDateString()}
              </p>
        
            </Col>
          </Row>
          
        </div>
      ))}
    </>
  );
};

export default JobHistoryRecruiter;
