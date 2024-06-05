// ImageModal.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

const ImageModal = ({
  show,
  images,
  currentIndex,
  onClose,
  setCurrentIndex,
}) => {
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const variants = {
    enter: {
      opacity: 0,
      x: 10,
    },
    center: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -10,
    },
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Image Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="tw-flex">
        <div className="tw-w-1/2 tw-relative tw-flex tw-items-center tw-justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt="gallery"
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
              className="tw-w-full tw-h-full tw-object-cover"
            />
          </AnimatePresence>
          <Button
            className="tw-absolute tw-top-1/2 tw-left-0 tw-transform tw--translate-y-1/2"
            onClick={handlePrevious}
          >
            &larr;
          </Button>
          <Button
            className="tw-absolute tw-top-1/2 tw-right-0 tw-transform tw--translate-y-1/2"
            onClick={handleNext}
          >
            &rarr;
          </Button>
        </div>
        <div className="tw-w-1/2 tw-pl-4">
          <h4>Image Title</h4>
          <p>Image description or content goes here.</p>
          <div>
            <h5>Comments</h5>
            <div className="tw-border tw-border-gray-200 tw-rounded tw-p-2 tw-mb-2">
              Great work!
            </div>
            <div className="tw-border tw-border-gray-200 tw-rounded tw-p-2 tw-mb-2">
              Nice image!
            </div>
            {/* Add more comments here */}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="tw-w-full tw-flex tw-justify-center">
          {images.map((_, index) => (
            <div
              key={index}
              className={`tw-w-4 tw-h-4 tw-mx-1 tw-rounded-full ${
                currentIndex === index ? "tw-bg-blue-500" : "tw-bg-gray-300"
              }`}
            />
          ))}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal;
