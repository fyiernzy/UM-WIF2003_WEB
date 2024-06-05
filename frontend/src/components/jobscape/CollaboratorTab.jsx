import React, { useState } from "react";
import { Badge, Button, Modal } from "react-bootstrap";
import Rating from "react-rating-stars-component";
import "../../components-css/jobscape/CollaboratorTab.css";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from 'react-router-dom';
import default_avatar from "../../assets/icons/profile/avatar-default-symbolic-svgrepo-com.svg";


const CollaboratorTab = ({
  freelancerID,
  profilePic,
  username,
  ratingStar,
  skill,
  location,
}) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const navigateToFreelancerProfilePage = () => {
    navigate(`/Profile/${freelancerID}`);
  }

  return (
    <div className="CollaboratorTab">
      <div className="LeftContent">
        <img src={profilePic ? `data:${profilePic};base64,${profilePic}` : default_avatar} alt="Profile Picture" className="ProfilePic" />
        <div>
          <p className="CollaboratorName">{username}</p>
          <Rating
            classNames="ratingStar"
            value={ratingStar}
            edit={false}
            size={20}
            activeColor="#ffd700"
          />
          <div className="Filters">
            {Array.isArray(skill) &&
              skill.map((skills, index) => (
                <Badge key={index} className="FilterBadge">
                  {skills}
                </Badge>
              ))}
            <Badge className="FilterBadge LocationBadge">{location}</Badge>
          </div>
        </div>
      </div>
      <Button className="details-button" onClick={handleShowModal}>
        View Details
      </Button>
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title
            style={{ color: "#2D4877", textAlign: "center", width: "100%" }}
          >
            {username}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ModalContent" style={{ position: "relative" }}>
            <div style={{ display: "flex" }}>
              <img
                src={profilePic ? `data:${profilePic};base64,${profilePic}` : default_avatar}
                alt="Profile Picture"
                className="ProfilePic"
              />
              <div>
                <Rating
                  value={ratingStar}
                  edit={false}
                  size={30}
                  activeColor="#ffd700"
                />
                <div className="Filters">
                  {Array.isArray(skill) &&
                    skill.map((skills, index) => (
                      <Badge key={index} className="FilterBadge">
                        {skills}
                      </Badge>
                    ))}
                  <Badge className="FilterBadge LocationBadge">
                    {location}
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              className="details-button"
              onClick={navigateToFreelancerProfilePage}
              style={{ position: "absolute", right: 0, top: "20%" }}
            >
              View Profile
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CollaboratorTab;
