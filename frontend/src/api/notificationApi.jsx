import axios from "../utils/customAxios";
export const API_URL = "http://localhost:5050/notification";

export const getNotifications = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting notifications: " + error);
    throw error;
  }
};

export const setReadNotification = async (notifId) => {
  try {
    const response = await axios.put(`${API_URL}/read/${notifId}`);
    return response.data;
  } catch (error) {
    console.error("Error reading notifications: " + error);
    throw error;
  }
};
