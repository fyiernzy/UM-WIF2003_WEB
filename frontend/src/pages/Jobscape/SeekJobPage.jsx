import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "../../App.css";
import axios from "../../utils/customAxios";
import SmallTitle from "../../components/jobscape/SmallTitle";
import SearchBar from "../../components/jobscape/SearchBar";
import SearchButton from "../../components/jobscape/SearchButton";
import FilterTab from "../../components/jobscape/FilterTab";
import SearchResultTab from "../../components/jobscape/SearchResultTab";
import ProjectTab from "../../components/jobscape/ProjectTab";
import PageNumberNav from "../../components/jobscape/PageNumberNav";
import searchbtn from "../../assets/icons/icon_search.svg";
import { getFavoriteProjects } from "../../api/projectApi";
import { useUserContext } from "../../context/UserContext";
import "../../pages-css/Jobscape/SeekJobPage.css";

const SeekJobPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [favoritedProjects, setFavoritedProjects] = useState([]);

  const { user } = useUserContext();
  console.log("userContext in seekjobpage: " + user._id);
  const userId = user._id;
  const navigate = useNavigate();
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [projectTabs, setProjectTabs] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchFavoritedProjects = async () => {
      try {
        const response = await getFavoriteProjects(userId);
        console.log(
          "response from fetching fav projects: " + response.favoriteProjects
        );
        setFavoritedProjects(response.favoriteProjects);
      } catch (error) {
        console.error("Error fetching favorited projects:", error.message);
      }
    };
    // Asynchronous function to fetch all projects from backend
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5050/projects");
        const fetchedProjects = response.data.data.map((project) => {
          let companyName = project.postedBy.username;
          console.log("Company Name: " + JSON.stringify(project));
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
        // console.log("project tabs: " + JSON.stringify(projectTabs));
      } catch (error) {
        console.error("Error: " + error.message);
      }
    };
    fetchProjects();
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
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    console.log("event target" + event.target.value);
  };

  // Send GET request to backend with search query
  const handleClick = async () => {
    console.log("Search value: " + searchValue);
    try {
      const response = await axios.get("http://localhost:5050/projects", {
        params: {
          q: searchValue,
        },
      });
      // console.log("Axios response.data: " + JSON.stringify(response.data.data));
      const fetchedProjects = response.data.data.map((project) => {
        let companyName = project.postedBy.username;
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
      console.log("project tabs: " + JSON.stringify(projectTabs));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFilterChange = (name, checked) => {
    // Will add to selectedFilters if checked
    if (checked) {
      setSelectedFilters((prevFilters) => [...prevFilters, name]);
    } else {
      // Remove from selectedFilters if unchecked
      setSelectedFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== name)
      );
    }
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const projectPerPage = 7;

  const filterTabs = [
    {
      filterTitle: "PROJECT CATEGORY",
      filterTypes: [
        "Tech & IT",
        "Creative & Design",
        "Content Writing",
        "Education & Training",
        "Marketing",
        "Finance",
        "Healthcare",
        "Engineering",
      ],
    },
    {
      filterTitle: "PROJECT DURATION",
      filterTypes: ["Short Term", "Long Term", "OnGoing"],
    },

    {
      filterTitle: "LOCATION",
      filterTypes: [
        "Kuala Lumpur",
        "Selangor",
        "Negeri Sembilan",
        "Melaka",
        "Johore",
        "Kelantan",
        "Terengganu",
        "Perak",
        "Pahang",
        "Remote",
      ],
    },
    // Add more FilterTab objects as needed
  ];

  const filteredProjects = projectTabs.filter((project) => {
    return selectedFilters.every((selectedFilter) => {
      return project.filters.includes(selectedFilter);
    });
  });

  const totalProjects = filteredProjects.length;

  const slicedProjects = filteredProjects.slice(
    (currentPage - 1) * projectPerPage,
    currentPage * projectPerPage
  );

  return (
    <>
      <div className="seekjob-top-container">
        <Button className="seekjob-back-btn" onClick={() => navigate(-1)}>
          <p>
            <i className="bi bi-chevron-left"></i>Back
          </p>
        </Button>
        <Link to="/Favorite">
          <Button className="to-job-list-btn">
            My saved projects <i className="bi bi-chevron-double-right" />
          </Button>
        </Link>
      </div>

      <div style={{ margin: "20px 0 10px" }}>
        <SmallTitle
          title="Find Your Dream Project"
          fontWeight="700"
          fontSize="36px"
        />
      </div>
      <div style={{ margin: "0 5px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SearchBar
            placeholder="Search"
            value={searchValue}
            handleChange={handleSearchChange}
          />
          <SearchButton
            handleClick={handleClick}
            bgColor={"#2D4877"}
            src={searchbtn}
          />
        </div>
        <div className="FilterAndResult" style={{ display: "flex" }}>
          <div
            className="FilterSideBar"
            style={{ width: "20%", margin: "5% 5% 5% 10%" }}
          >
            <p
              style={{ fontSize: "16px", fontWeight: "700", paddingLeft: "4%" }}
            >
              FILTER
            </p>
            {/* Render FilterTab components */}
            {filterTabs.map((filterTab, index) => (
              <FilterTab
                key={index}
                {...filterTab}
                onFilterChange={handleFilterChange}
              />
            ))}
          </div>
          <div
            className="ProjectResult"
            style={{
              width: "80%",
              marginTop: "3%",
              marginRight: "10%",
            }}
          >
            <SearchResultTab
              total={totalProjects}
              ProjectOrCollab="PROJECTS"
              newOrRate="NEWEST"
            />
            {slicedProjects.map((projectTab, index) => (
              <ProjectTab
                key={index}
                {...projectTab}
                favorited={favoritedProjects.includes(projectTab.projectId)}
              />
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
};

export default SeekJobPage;
