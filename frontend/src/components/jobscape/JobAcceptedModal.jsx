import "../../components-css/jobscape/JobAcceptedModal.css";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function JobAcceptedModal(props) {
  return (
    <Modal {...props} centered backdrop="static" className="applying-modal">
      <Modal.Body className="border-0 accepted-container">
        <h3>You have applied this job!</h3>
        <p style={{ fontWeight: 300 }}>
          Your application has been sent to the requester!
        </p>
        <div>
          <div className="job-title">
            <p>
              Job Title:&nbsp;&nbsp;
              <span className="title-text" style={{ fontWeight: 300 }}>
                {props.projectName}
              </span>
            </p>
          </div>
          <div className="job-deadline">
            <p>
              Job deadline:&nbsp;&nbsp;
              <span className="deadline-text" style={{ fontWeight: 300 }}>
                {props.deadline}
              </span>
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border- accepted-footer">
        <Button className="understood-btn" onClick={props.onHide}>
          Understood
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
