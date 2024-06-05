import React, { useState, useEffect } from "react";
import { Button, Badge } from "react-bootstrap";
import "../../components-css/jobscape/ProjectPostedUser.css";
import Rating from "react-rating-stars-component";

const ProjectPostedUser = ({
  applicant,
  onConfirm,
  onRemove,
  showDetails,
  navigateToFreelancerProfilePage,
}) => {
  const { profilePic, username, rating, skill, state } = applicant;
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (profilePic) {
      // Convert base64 string to image URL
      const imageUrl = `data:image/jpeg;base64,${profilePic}`;
      setImageUrl(imageUrl);
    }
  }, [profilePic]);

  const handleConfirm = () => {
    onConfirm(applicant._id);
  };

  const handleRemove = () => {
    onRemove(applicant._id);
  };

  return (
    <div className="ProjectPostedUser">
      <div className="LeftContent">
        <img
          src={imageUrl}
          alt={`${username}'s profile`}
          className="ProfilePic"
        />
        <div className="UserDetails">
          <p className="Username">{username}</p>
          <Rating
            className="ratingStar"
            value={rating}
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
            <Badge className="FilterBadge LocationBadge">{state}</Badge>
          </div>
        </div>
        <div className="ButtonContainer">
          <Button
            onClick={() => showDetails(applicant)}
            className="details-button"
          >
            View Details
          </Button>
        </div>
      </div>
      <div className="RightContent">
        <div className="ActionButtons">
          <Button onClick={handleConfirm} className="ConfirmBtn">
            Confirm
          </Button>
          <Button onClick={handleRemove} className="RemoveBtn">
            Remove
          </Button>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default ProjectPostedUser;
