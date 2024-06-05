import "../../components-css/jobscape/InProgressJobsList.css";
import JobsListItem from "./JobsListItem";
import { useEffect, useState } from "react";
import { getTakenProjects } from "../../api/projectApi";

export default function InProgressJobsList({ userId }) {
  const [takenProjects, setTakenProjects] = useState([]);
  console.log("userId sent to inprogressjobslist: " + userId);
  useEffect(() => {
    const fetchTakenProjects = async () => {
      try {
        const response = await getTakenProjects(userId);
        // console.log("Fetched taken projects: ", response.takenProjects);
        setTakenProjects(response.takenProjects);
      } catch (error) {
        console.error("Error: " + error.message);
      }
    };
    fetchTakenProjects();
  }, []);

  useEffect(() => {
    console.log("Current taken projects: ", takenProjects);
  }, [takenProjects]);

  return (
    <>
      <div className="in-progress-jobs-container">
        <div className="jobs-list">
          {takenProjects.length > 0 ? (
            takenProjects.map((project, index) => {
              return (
                <JobsListItem className="jobs-item" key={index} {...project} />
              );
            })
          ) : (
            <div className="no-projects">
              <p>No projects taken.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
