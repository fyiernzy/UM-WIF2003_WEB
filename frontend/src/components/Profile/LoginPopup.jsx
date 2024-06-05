import { Modal, Button } from "react-bootstrap";

export default function LoginPopup({ onClose, show }) {
  return (
    <>
      <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Oops!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please log in or sign up into UniJobs first.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
