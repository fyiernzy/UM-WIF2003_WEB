// ShareModal.js
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaFacebook, FaWhatsapp, FaTelegram, FaEnvelope } from "react-icons/fa";
import { usePostContext } from "../../../../context/PostContext";

const ShareModal = ({ isOpen, onRequestClose }) => {
  const [copySuccess, setCopySuccess] = React.useState("");
  const { post } = usePostContext();
  const link = `http://localhost:3000/Community/posts/${post._id}`;

  const handleCopy = () => {
    setCopySuccess("Link copied!");
    setTimeout(() => setCopySuccess(""), 2000);
  };

  const encodedLink = encodeURIComponent(link);
  const shareOptions = [
    {
      label: "Facebook",
      icon: <FaFacebook size={32} />,
      gradient: "linear-gradient(45deg, #3b5998, #8b9dc3)",
      onClick: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`,
          "_blank"
        );
      },
    },
    {
      label: "WhatsApp",
      icon: <FaWhatsapp size={32} />,
      gradient: "linear-gradient(45deg, #128C7E, #25D366)",
      onClick: () => {
        window.open(
          `https://api.whatsapp.com/send?text=${encodedLink}`,
          "_blank"
        );
      },
    },
    {
      label: "Telegram",
      icon: <FaTelegram size={32} />,
      gradient: "linear-gradient(45deg, #0088cc, #00bfff)",
      onClick: () => {
        window.open(`https://t.me/share/url?url=${encodedLink}`, "_blank");
      },
    },
    {
      label: "Gmail",
      icon: <FaEnvelope size={32} />,
      gradient: "linear-gradient(45deg, #D44638, #FF7043)",
      onClick: () => {
        window.location.href = `mailto:?subject=Check this out&body=${encodedLink}`;
      },
    },
  ];

  return (
    <Modal show={isOpen} onHide={onRequestClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-center w-100">Share</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <div className="d-flex justify-content-around mb-4">
          {shareOptions.map((option, idx) => (
            <Button
              key={idx}
              className="p-3 rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "3rem",
                height: "3rem",
                background: option.gradient,
              }}
              onClick={option.onClick}
            >
              {option.icon}
            </Button>
          ))}
        </div>
        <InputGroup className="mb-4">
          <FormControl
            value={link}
            readOnly
            onClick={(e) => e.target.select()}
          />
          <CopyToClipboard text={link} onCopy={handleCopy}>
            <Button variant="primary">Copy</Button>
          </CopyToClipboard>
        </InputGroup>
        {copySuccess && <p className="text-success">{copySuccess}</p>}
      </Modal.Body>
    </Modal>
  );
};

export default ShareModal;
