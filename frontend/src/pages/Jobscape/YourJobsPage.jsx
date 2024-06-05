import "../../pages-css/Jobscape/YourJobsPage.css";
import { Container, Col, Row, Button } from "react-bootstrap";
import InProgressJobs from "../../components/jobscape/JobsListItem";
import InProgressJobsList from "../../components/jobscape/InProgressJobsList";
import CompletedJobsList from "../../components/jobscape/CompletedJobsList";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { text } from "@fortawesome/fontawesome-svg-core";
import NotificationMenu from "../../components/jobscape/NotificationMenu";
import ApplyingJobsList from "../../components/jobscape/ApplyingJobsList";
import { useUserContext } from "../../context/UserContext";
import useAuth from "../../hooks/useAuth";
import NotificationBell from "../../components/jobscape/NotificationBell";

export default function YourJobsPage() {
  const navigate = useNavigate();
  const [bellFill, setBellFill] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      text: "Your Web Development job by DELL Technologies is due next month!",
    },
    { text: "Your Wedding Photo job by Weddings is due next month!" },
    { text: "You have received review from DELL Technologies!" },
  ]);
  const toggleNotif = () => {
    setIsNotifOpen(!isNotifOpen);
  };
  const handleMouseEnter = () => {
    setBellFill(true);
  };
  const handleMouseLeave = () => {
    setBellFill(false);
  };
  const onRemoveNotifItem = (indexToRemove) => {
    setNotifications((prevNotifications) => {
      return prevNotifications.filter((_, index) => index !== indexToRemove);
    });
  };
  const { user } = useUserContext();
  console.log("Your jobs page userContext: " + JSON.stringify(user));
  // console.log("useAuth returns: " + useAuth());
  return (
    <>
      <Container className="your-jobs-container">
        <Button className="back-btn" onClick={() => navigate(-1)}>
          <p>
            <i className="bi bi-chevron-left" />
            Back
          </p>
        </Button>
        <div className="your-jobs-header">
          <div style={{ textAlign: "center" }}>
            <h1 className="your-jobs-title">Your Jobs</h1>
          </div>
          <NotificationBell />
        </div>
        <h3 className="completed-jobs-title">Applying Jobs</h3>
        <ApplyingJobsList userId={user._id} />
        <h3 className="completed-jobs-title">Taken Jobs</h3>
        <InProgressJobsList userId={user._id} />
        <h3 className="completed-jobs-title">Completed Jobs</h3>
        <CompletedJobsList userId={user._id} />
      </Container>
    </>
  );
}
