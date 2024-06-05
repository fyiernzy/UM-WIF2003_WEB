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

// export const getUser = async (email) => {
//   try {
//     console.log("getUser - email:", email); // Debug statement
//     const res = await axios.post(
//       "http://localhost:5050/auth/login",
//       {
//         email,
//       },
//       { withCredentials: true }
//     );
//     console.log("getUser - response:", res); // Debug statement
//     console.log("getUser - user:", res.data.user); // Debug statement
//     console.log("getUser - headers:", res.headers); // Debug statement
//     console.log("getUser - cookies:", document.cookie); // Debug statement
//     if (!res.data.user) return console.error("User not found");
//     return res.data.user;
//   } catch (error) {
//     console.error(error);
//   }
// };
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
export const checkEmail = async () => {
  try {
    const response = await fetch('http://localhost:5050/api/checkEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();

    console.log("Existing emails in the database:", data.emails); // Debug statement

    if (response.ok) {
      return data.exists;
    } else {
      throw new Error(data.message || 'Failed to check email');
    }
  } catch (error) {
    console.error('Error checking email:', error);
    throw error;
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
