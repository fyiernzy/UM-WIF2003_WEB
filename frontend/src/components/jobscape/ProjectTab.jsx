import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { Badge } from "react-bootstrap";
import "../../components-css/jobscape/ProjectTab.css";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/customAxios";
import {
  favoriteProject,
  removeFavoriteProject,
  API_URL,
} from "../../api/projectApi";
import { useUserContext } from "../../context/UserContext";

const ProjectTab = ({
  projectId,
  projectName,
  companyName,
  projectCategory,
  filters,
  timePosted,
  favorited,
}) => {
  let navigate = useNavigate();
  const [saved, setSaved] = useState(favorited);
  const [hovered, setHovered] = useState(false);

  const { user } = useUserContext();
  const userId = user._id;

  // Save if not fav, unsave if fav
  const handleSaveClick = async (event) => {
    event.stopPropagation(); // Prevent event from bubbling up to parent (ProjectTab)
    try {
      if (saved) {
        await removeFavoriteProject(userId, projectId);
      } else {
        await favoriteProject(userId, projectId);
      }
      setSaved(!saved);
    } catch (error) {
      console.error("Error fav/remove fav project: ", error);
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    navigate(`/SeekJobPage/job-details/${projectId}`);
  };

  return (
    <div
      className="ProjectTab"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="LeftContent">
        <div>
          <p className="ProjectTitle">{projectName}</p>
          <p className="CompanyInfo">
            By <span className="CompanyName">{companyName}</span> in {"  "}
            <span className="Category">{projectCategory}</span>
          </p>
          <div className="Filters">
            {Array.isArray(filters) &&
              filters.map((filter, index) => (
                <Badge key={index} className="FilterBadge">
                  {filter}
                </Badge>
              ))}
          </div>
        </div>
      </div>
      {/* Right side content */}
      <div className="RightContent">
        <p className="TimePosted">{timePosted}</p>
        <FontAwesomeIcon
          icon={faBookmark}
          className={`SaveIcon ${saved ? "saved" : ""}`}
          onClick={handleSaveClick}
        />
      </div>
    </div>
  );
};

export default ProjectTab;
