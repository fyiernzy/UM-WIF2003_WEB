import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import JobscapeHeader from "../../components/jobscape/JobscapeHeader";
import SearchBar from "../../components/jobscape/SearchBar";
import CategoryBar from "../../components/jobscape/CategoryBar";
import SearchButton from "../../components/jobscape/SearchButton";
import CategoryTab from "../../components/jobscape/CategoryTab";
import PositionTab from "../../components/jobscape/PositionTab";
import WorkTab from "../../components/jobscape/WorkTab";
import SmallTitle from "../../components/jobscape/SmallTitle";
import StatusTab from "../../components/jobscape/StatusTab";
import BackgroundImage from "../../assets/images/jobscapeBG.svg";
import searchbtn from "../../assets/icons/icon_search.svg";
import PositionRecruit from "../../assets/icons/jobscape/recruiter.svg";
import PositionFreelance from "../../assets/icons/jobscape/freelancer.svg";
import WorkRecruit from "../../assets/icons/jobscape/recruit1.svg";
import WorkFreelance from "../../assets/icons/jobscape/freelance1.svg";
import WorkMutual from "../../assets/icons/jobscape/mutual.svg";
import { useUserContext } from "../../context/UserContext";

const JobscapeMainPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const { user } = useUserContext();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  const positionTabs = [
    {
      bgImg: PositionRecruit,
      color: "#FDFAF3",
      hoverColor: "#2D4877",
      paddingLeft: "10%",
      paddingRight: "5%",
      textAlign: "left",
      positionType: "I AM A RECRUITER!",
      content:
        "Are you a skilled and passionate freelancer looking for exciting opportunities to showcase your talent? We are actively seeking talented individuals to join our freelance network and collaborate on a variety of projects across different industries.",
      buttonType: "Recruiting",
      seekPage: "/SeekTalentPage",
      style: { width: "50%", margin: 0, padding: 0 },
    },
    {
      bgImg: PositionFreelance,
      color: "#2D4877",
      hoverColor: "#FDFAF3",
      paddingLeft: "5%",
      paddingRight: "10%",
      textAlign: "right",
      positionType: "I AM A FREELANCER!",
      content:
        "Are you a freelancer looking for exciting opportunities to showcase your skills and connect with clients? Look no further! Our platform is a hub for talented freelancers like you to find projects, collaborate with clients, and grow your freelance business.",
      buttonType: "Seeking",
      seekPage: "/SeekJobPage",
      style: { width: "50%", margin: 0, padding: 0 },
    },
  ];

  const workTabs = [
    {
      workImg: WorkRecruit,
      workType: "Recruiter",
      content:
        "Employers post job opportunities or projects, specifying their requirements and preferences.",
    },
    {
      workImg: WorkFreelance,
      workType: "Freelancer",
      content:
        "Browse available projects, submit proposals to employers based on their skills and expertise.",
    },
    {
      workImg: WorkMutual,
      workType: "Mutual Satisfaction",
      content:
        "Freelancers collaborate with employers to complete projects, ensuring mutual satisfaction and success.",
    },
  ];

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleClick = () => {
    // Handle click action here
  };
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "68vh",
          backgroundImage: `url(${BackgroundImage})`,
        }}
      >
        <JobscapeHeader text1="Jobs" text2="Talents!" />
        <div
          className="search-bar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SearchBar
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <SearchButton
            handleClick={handleClick}
            bgColor={"#80D1D5"}
            src={searchbtn}
          />
        </div>
        {/* Floating button for Your Jobs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {user && user.role == "freelancer" ? (
            <Link to="/YourJobs">
              <Button
                className="floating-your-jobs-btn"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#2D4877",
                  border: "none",
                }}
              >
                Your Jobs <i className="bi bi-exclamation-circle-fill" />
              </Button>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>

      <SmallTitle title="Popular Categories" fontWeight="700" fontSize="24px" />
      <CategoryTab />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}
      >
        {positionTabs.map((tab, index) => (
          <PositionTab key={index} {...tab} />
        ))}
      </div>

      <SmallTitle title="How It Works?" fontWeight="bold" fontSize="24px" />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 18% 3%",
        }}
      >
        {workTabs.map((tab, index) => (
          <WorkTab key={index} {...tab} />
        ))}
      </div>
      <StatusTab
        numArray={[330, 473, 562, 298]}
        typeArray={["Projects", "Recruiters", "Freelancers", "Satisfaction"]}
      />
    </>
  );
};

export default JobscapeMainPage;
