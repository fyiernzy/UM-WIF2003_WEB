import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { usePostContext } from "../../../../context/PostContext";

const ImageModal = ({
  show,
  images,
  currentIndex,
  onClose,
  setCurrentIndex,
}) => {
  const { post } = usePostContext();
  const { author, title, content, createdAt, likes, comments } = post;
  const { length: numberOfLikes } = likes;
  const { length: numberOfComments } = comments;

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
              className="tw-w-[300px] tw-h-[400px] tw-object-cover"
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
          <div className="tw-flex tw-items-center tw-gap-2">
            <h4 className="tw-font-bold tw-text-lg">{author.username}</h4>
            <p className="tw-text-sm tw-text-gray-500">
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>

          <h2 className="tw-text-lg tw-font-bold">{title}</h2>
          <p className="tw-mt-2">{content}</p>
          <div className="tw-flex tw-flex-col">
            <div className="tw-flex tw-gap-3 tw-mt-4">
              <span>Comments: {numberOfComments}</span>
              <span>Likes: {numberOfLikes}</span>
            </div>

            <hr className="tw-border-2 tw-border-slate-500 tw-my-5"></hr>
            <div>
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div
                    key={index}
                    className="tw-border tw-border-gray-200 tw-rounded tw-p-2 tw-mb-2"
                  >
                    {comment}
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </div>
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
