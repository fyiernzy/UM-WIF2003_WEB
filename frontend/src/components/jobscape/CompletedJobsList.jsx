import "../../components-css/jobscape/CompletedJobsList.css";
import JobsListItem from "./JobsListItem";
import { useEffect, useState } from "react";
import { getCompletedProjects } from "../../api/projectApi";

export default function CompletedJobsList({ userId }) {
  const [completedProjects, setCompletedProject] = useState([]);
  useEffect(() => {
    const fetchCompletedProjects = async () => {
      try {
        const response = await getCompletedProjects(userId);
        // console.log("Fetched taken projects: ", response.completedProjects);
        setCompletedProject(response.completedProjects);
      } catch (error) {
        console.error("Error: " + error.message);
      }
    };
    fetchCompletedProjects();
  }, []);

  useEffect(() => {
    console.log("Current completed projects: ", completedProjects);
  }, [completedProjects]);
  return (
    <>
      <div className="completed-jobs-container">
        <div className="jobs-list">
          {completedProjects.length > 0 ? (
            completedProjects.map((project, index) => {
              return (
                <JobsListItem
                  className="jobs-item"
                  key={index}
                  {...project}
                  completed={true}
                />
              );
            })
          ) : (
            <div className="no-projects">
              <p>No projects completed.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
