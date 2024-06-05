import "../../components-css/jobscape/InProgressJobsList.css";
import JobsListItem from "./JobsListItem";
import { useEffect, useState } from "react";
import { getApplyingProjects } from "../../api/projectApi";

export default function ApplyingJobsList({ userId }) {
  const [applyingProjects, setApplyingProjects] = useState([]);

  useEffect(() => {
    const fetchApplyingProjects = async () => {
      try {
        const response = await getApplyingProjects(userId);
        // console.log("Fetched taken projects: ", response.applyingProjects);
        setApplyingProjects(response.applyingProjects);
      } catch (error) {
        console.error("Error: " + error.message);
      }
    };
    fetchApplyingProjects();
  }, []);

  useEffect(() => {
    console.log("Current applying projects: ", applyingProjects);
  }, [applyingProjects]);

  return (
    <>
      <div className="in-progress-jobs-container">
        <div className="jobs-list">
          {applyingProjects.length > 0 ? (
            applyingProjects.map((project, index) => {
              return (
                <JobsListItem className="jobs-item" key={index} {...project} />
              );
            })
          ) : (
            <div className="no-projects">
              <p>No projects applied.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
