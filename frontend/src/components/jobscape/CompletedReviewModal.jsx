import { useEffect, useState } from "react";
import "../../components-css/jobscape/CompletedReviewModal.css";
import { Modal, Button } from "react-bootstrap";
import Rating from "react-rating-stars-component";

export default function CompletedReviewModal(props) {
  const [reviewValues, setReviewValues] = useState(null);

  useEffect(() => {
    if (Array.isArray(props.review) && props.review.length > 0) {
      setReviewValues(props.review[0]);
    }
  }, [props.review]);
  const satisfactionRating = reviewValues
    ? reviewValues.satisfactionRating
    : "No rating available";
  const projectRating = reviewValues
    ? reviewValues.projectRating
    : "No rating available";
  const projectFeedback = reviewValues
    ? reviewValues.projectFeedback
    : "No rating available";
  const collaboratorRating = reviewValues
    ? reviewValues.collaboratorRating
    : "No rating available";
  const collaboratorFeedback = reviewValues
    ? reviewValues.collaboratorFeedback
    : "No rating available";
  console.log(satisfactionRating);
  const setSatisfactionText = () => {
    switch (satisfactionRating) {
      case 1:
        return (
          <span className="satisfaction-text" style={{ color: "#E82A2A" }}>
            disappointed
          </span>
        );
        break;
      case 2:
        return (
          <span className="satisfaction-text" style={{ color: "#EFE60E" }}>
            not satisfied
          </span>
        );
        break;
      case 3:
        return (
          <span className="satisfaction-text" style={{ color: "#B7E82A" }}>
            satisfied
          </span>
        );
        break;
      case 4:
        return (
          <span className="satisfaction-text" style={{ color: "#17FF66" }}>
            quite satisfied
          </span>
        );
        break;
      case 5:
        return (
          <span className="satisfaction-text" style={{ color: "#17FF66" }}>
            very satisfied
          </span>
        );
    }
  };
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton className="border-0" />
      <Modal.Body className="border-0 review-container">
        {reviewValues == null ? (
          <h3>Your collaborator, {props.name} has not given a review yet.</h3>
        ) : (
          <>
            <Modal.Title>Here's the review!</Modal.Title>
            <p>
              Your requester is {setSatisfactionText()} with your deliverable!
            </p>
            <div className="emoji-row">
              <Rating
                value={satisfactionRating}
                edit={false}
                size={40}
                activeColor="#ffd700"
              />
            </div>
            <p>Your project ratings:</p>
            <Rating
              value={projectRating}
              edit={false}
              size={40}
              activeColor="#ffd700"
            />
            <p>Project Feedback</p>
            <div className="project-feedback">
              <p>{projectFeedback}</p>
            </div>
            <p>Your Ratings:</p>
            <Rating
              value={collaboratorRating}
              edit={false}
              size={40}
              activeColor="#ffd700"
            />
            <div className="person-feedback">
              <p>{collaboratorFeedback}</p>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer className="border-0 review-footer">
        <div className="feedback-from">
          <p>Feedback from:</p>
          <p>{props.name}</p>
        </div>
        <Button onClick={props.onHide} className="modal-close">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
