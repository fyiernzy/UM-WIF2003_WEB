import "../../components-css/jobscape/UploadWorkModal.css";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import uploadWorkImg from "../../assets/images/uploadwork.svg";
import { useRef, useState } from "react";

export default function UploadWorkModal(props) {
  UploadWorkModal.propTypes = {
    onFileChange: PropTypes.func,
  };

  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => {
    wrapperRef.current.classList.add("dragover");
  };

  const onDragLeave = () => {
    wrapperRef.current.classList.remove("dragover");
  };
  const onDrop = () => {
    wrapperRef.current.classList.remove("dragover");
  };

  const onSubmit = () => {
    setFileList([]);
    props.onSubmitClick(fileList);
  };

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };
  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  const convertToKb = (fileSize) => {
    return Math.round(fileSize / 1024);
  };
  return (
    <Modal
      {...props}
      centered
      size="lg"
      backdrop="static"
      className="upload-work-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Upload Work</Modal.Title>
      </Modal.Header>
      <Modal.Body className="border-0 upload-container">
        <div>
          <div
            className="drop-file-input"
            ref={wrapperRef}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <div className="drop-file-bg">
              <img src={uploadWorkImg} alt="" />
              <p>Drag & Drop files here</p>
            </div>
            <input
              type="file"
              value=""
              onChange={onFileDrop}
              multiple
              name="files"
            />
          </div>
          {fileList.length > 0 ? (
            <div className="drop-file-preview">
              <div className="drop-file-preview-title">Ready to upload</div>
              <div className="drop-file-preview-list">
                {fileList.map((item, index) => {
                  return (
                    <div key={index} className="drop-file-preview-item">
                      <p>{item.name}</p>
                      <p>{convertToKb(item.size)}KB</p>
                      <i className="bi bi-x" onClick={() => fileRemove(item)} />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onSubmit} className="submit-btn">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
