import "../../pages-css/General/FavoritePage.css";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProjectTab from "../../components/jobscape/ProjectTab";
import { useUserContext } from "../../context/UserContext";
import axios from "../../utils/customAxios";
import PageNumberNav from "../../components/jobscape/PageNumberNav";
import { getFavoriteProjectsDetails } from "../../api/projectApi";

export default function FavoritePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [projectTabs, setProjectTabs] = useState([]);
  const navigate = useNavigate();
  const { user } = useUserContext();
  console.log("userContext in seekjobpage: " + user._id);
  const userId = user._id;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    const fetchFavoritedProjects = async () => {
      try {
        const response = await getFavoriteProjectsDetails(userId);
        console.log(
          "response from fetching fav projects: " +
            JSON.stringify(response.favoriteProjects)
        );
        const fetchedProjects = response.favoriteProjects.map((project) => {
          let companyName = project.postedBy.username;
          console.log("Company Name: " + project.postedBy.username);
          return {
            projectId: project._id,
            projectName: project.projectTitle,
            companyName: companyName,
            projectCategory: project.projectCategory,
            filters: project.filter,
            timePosted: calculateTimePosted(project.createdAt),
          };
        });
        setProjectTabs(fetchedProjects);
      } catch (error) {
        console.error("Error fetching favorited projects:", error.message);
      }
    };
    fetchFavoritedProjects();
  }, [userId]);
  const calculateTimePosted = (createdAt) => {
    const currentTime = new Date();
    const createdTime = new Date(createdAt);
    const diffInMs = currentTime - createdTime;
    const diffInSeconds = Math.floor(diffInMs / 1000); // Difference in seconds
    const diffInMinutes = Math.floor(diffInSeconds / 60); // Difference in minutes
    const diffInHours = Math.floor(diffInMinutes / 60); // Difference in hours

    if (diffInHours < 1) {
      return "Less than an hour ago";
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24); // Difference in days
      return `${diffInDays} days ago`;
    }
  };
  const projectPerPage = 7;

  const totalProjects = projectTabs.length;

  const slicedProjects = projectTabs.slice(
    (currentPage - 1) * projectPerPage,
    currentPage * projectPerPage
  );
  return (
    <>
      <div className="favorite-container">
        <Button className="back-btn" onClick={() => navigate(-1)}>
          <p>
            <i className="bi bi-chevron-left" />
            Back
          </p>
        </Button>
        <div className="favorite-header" style={{ textAlign: "center" }}>
          <h3 className="favorite-title">Saved projects</h3>
        </div>
        <div className="favorite-jobs-container">
          <div className="favorite-jobs-list">
            {slicedProjects.map((projectTab, index) => (
              <ProjectTab key={index} {...projectTab} favorited={true} />
            ))}
          </div>
        </div>
        <PageNumberNav
          currentPage={currentPage}
          totalPages={Math.ceil(totalProjects / projectPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
