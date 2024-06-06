// Will include backend api functions for "project/" in this file
// For better code separation

import axios from "../utils/customAxios";
export const API_URL = "http://localhost:5050/projects";

export const getProjectDetails = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting project details: " + error);
    throw error;
  }
};

export const favoriteProject = async (userId, projectId) => {
  try {
    const response = await axios.post(`${API_URL}/favorite-project`, {
      userId,
      projectId,
    });
    return response.data;
  } catch (error) {
    console.error("Error favorite project: " + error);
    throw error;
  }
};

export const removeFavoriteProject = async (userId, projectId) => {
  try {
    const response = await axios.post(`${API_URL}/remove-favorite-project`, {
      userId,
      projectId,
    });
    return response.data;
  } catch (error) {
    console.error("Error remove favorite project: " + error);
    throw error;
  }
};

export const getFavoriteProjects = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/favorite-project/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting favorite projects: " + error);
    throw error;
  }
};
export const getFavoriteProjectsDetails = async (userId) => {
  try {
    const response = await axios.get(
      `${API_URL}/favorite-project-details/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting favorite projects: " + error);
    throw error;
  }
};
export const setApplyingProject = async (userId, projectId) => {
  try {
    const response = await axios.post(`${API_URL}/applying-project`, {
      userId,
      projectId,
    });
    return response.data;
  } catch (error) {
    console.error("Error set applying project, projectAPI: " + error);
  }
};
export const getApplyingProjects = async (userId) => {
  try {
    console.log("I'm in projectApi getApplyingProjects");
    const response = await axios.get(`${API_URL}/applying-project/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error get applying project: " + error);
  }
};

export const removeApplyingProjects = async (userId, projectId) => {
  try {
    const response = await axios.put(`${API_URL}/applying-project/remove`, {
      userId,
      projectId,
    });
    return response.data;
  } catch (error) {
    console.error("Error remove applying project: " + error);
  }
};
export const setTakenProject = async (userId, projectId) => {
  try {
    const response = await axios.post(`${API_URL}/taken-project`, {
      userId,
      projectId,
    });
    return response.data;
  } catch (error) {
    console.error("Error set taken project: " + error);
  }
};
export const getTakenProjects = async (userId) => {
  try {
    console.log("I'm in projectApi getTakenProjects");
    const response = await axios.get(`${API_URL}/taken-project/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error get taken project: " + error);
  }
};
export const setCompletedProject = async (userId, projectId) => {
  try {
    const response = await axios.post(`${API_URL}/completed-project`, {
      userId,
      projectId,
    });
    return response.data;
  } catch (error) {
    console.error("Error set completed project: " + error);
  }
};
export const getCompletedProjects = async (userId) => {
  try {
    console.log("I'm in projectApi getCompletedProjects");
    const response = await axios.get(`${API_URL}/completed-project/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error get completed project: " + error);
  }
};

// (files) is an array of uploaded files
// For .post(), first parameter is the URL, 2nd parameter is request body,
// 3rd parameter is the options or headers
export const uploadCompletedWorks = async (files, projectId, userId) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    console.log("Is object? " + files[i].name);
    formData.append("files", files[i], files[i].name);
  }
  formData.append("projectId", projectId);
  formData.append("userId", userId);
  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }
  try {
    const response = await axios.post(`${API_URL}/upload-works`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(
      "File uploaded successfully from frontend api: " + response.data
    );
  } catch (error) {
    console.log("Error in uploadCompletedWorks, frontend api: " + error);
  }
};

export const downloadFile = async (files) => {
  try {
    await Promise.all(
      files.map(async (file) => {
        const response = await axios.get(`${API_URL}/download`, {
          params: { fileName: file.fileName },
          responseType: "blob",
        });
        // Create a link element, set the href to the blob URL, and trigger a click to download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file.fileName); // Set the desired file name
        document.body.appendChild(link);
        link.click();

        // Clean up
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
    );
  } catch (error) {
    console.log("Error in downloadFile, projectApi: " + error);
  }
};
