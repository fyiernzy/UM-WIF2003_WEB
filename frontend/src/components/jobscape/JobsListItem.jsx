import { useState, useEffect } from "react";
import "../../components-css/jobscape/JobsListItem.css";
import { Container, Col, Row, Button } from "react-bootstrap";
import userImg from "../../assets/icons/jobscape/user.svg";
import CompletedReviewModal from "./CompletedReviewModal";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "../../utils/customAxios";

export default function JobsListItem({
  completed,
  _id,
  postedBy,
  projectTitle,
  projectBudget,
  deadline,
  review,
}) {
  JobsListItem.defaultProps = {
    completed: false,
    satisfaction: 1,
    projectrating: 1,
    projectfeedback: "No feedback",
    personrating: 1,
    personfeedback: "No feedback",
    imgurl: userImg,
    reviewname: "None",
  };
  const [showReview, setShowReview] = useState(false);
  const [collaboratorName, setCollaboratorName] = useState("");
  const navigate = useNavigate();
  const handleButtonClick = () => {
    if (completed) {
      setShowReview(true);
    } else {
      navigate(`/SeekJobPage/job-details/${_id}`);
    }
  };
  useEffect(() => {
    const fetchCollaboratorDetails = async () => {
      const response = await axios.get(
        `http://localhost:5050/users/${postedBy}`
      );
      setCollaboratorName(response.data.data.username);
    };
    fetchCollaboratorDetails();
  }, []);
  const btnClassName = completed ? "job-more-btn completed" : "job-more-btn";
  return (
    <>
      <div className="jobs-list-item">
        <div className="job-texts">
          <h5 className="job-title">{projectTitle}</h5>
          <Container className="job-details-text">
            <Row>
              <Col>
                <p className="detail-type">Due:</p>
                <p className="detail-type">Budget:</p>
                <p className="detail-type">Collaborator:</p>
              </Col>
              <Col>
                <p>{moment(deadline).format("DD-MM-YYYY")}</p>
                <p>RM{projectBudget}</p>
                <p className="company-name">{collaboratorName}</p>
              </Col>
            </Row>
          </Container>
        </div>
        <Button className={btnClassName} onClick={handleButtonClick}>
          {completed ? "Review" : "More"}
        </Button>
        <CompletedReviewModal
          show={showReview}
          onHide={() => setShowReview(false)}
          review={review}
          name={collaboratorName}
        />
      </div>
    </>
  );
}
