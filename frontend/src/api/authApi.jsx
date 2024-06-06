import axios from "../utils/customAxios";

export const postRegistration = async (
  email,
  username,
  password,
  userType,
  navigate
) => {
  try {
    console.log(email + " " + password + " " + username);
    const res = await axios.post("http://localhost:5050/auth/signup", {
      email,
      username,
      password,
      userType,
    });
    console.log(res);
    navigate("/Login");
  } catch (err) {
    console.error("postRegistration error: " + err);
  }
};

export const getUser = async (email, password) => {
  try {
    const res = await axios.post(
      "http://localhost:5050/auth/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    console.log(res.headers);
    console.log(document.cookie);
    if (!res.data.user) return console.error("User not found");
    return res.data.user;
  } catch (error) {
    console.error(error);
  }
};
export const checkEmail = async (email) => {
  try {
    const res = await axios.post(
      "http://localhost:5050/auth/checkEmail",
      { email },
      { withCredentials: true }
    );
    console.log("checkEmail - response headers:", res.headers);
    console.log("checkEmail - cookies:", document.cookie);
    
    if (!res.data.exists) return console.error("Email not found");
    return res.data.exists;
  } catch (error) {
    console.error("Error checking email:", error);
  }
};

export const verifyUserToken = async () => {
  try {
    const response = await axios.get("http://localhost:5050/auth/verify", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Token verification failed: " + error);
    return { status: false };
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.get("http://localhost:5050/auth/logout", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Logout failed: " + error);
    return { status: false };
  }
};

export const forgotPassword = async (email) => {
  console.log("in forgot password");
  try {
    console.log("in forgot password2");
    const res = await axios.post(
      "http://localhost:5050/auth/forgotpassword",
      { email },
      { withCredentials: true }
    );
    console.log("in forgot password3");
    return res.data;
  } catch (error) {
    console.error("Error in forgot password:", error);
    throw error;
  }
};

