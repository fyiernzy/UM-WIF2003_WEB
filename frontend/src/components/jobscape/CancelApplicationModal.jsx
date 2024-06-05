import "../../components-css/jobscape/JobAcceptedModal.css";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function CancelApplicationModal(props) {
  return (
    <>
      <Modal {...props} centered backdrop="static" className="applying-modal">
        <Modal.Body className="border-0 accepted-container">
          <h3>Do you want to cancel your application?</h3>
        </Modal.Body>
        <Modal.Footer className="border- accepted-footer">
          <Button className="understood-btn" onClick={props.onHide}>
            No
          </Button>
          <Button className="understood-btn" onClick={props.onCancelClick}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
