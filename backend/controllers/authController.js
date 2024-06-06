import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import {
  createSecretToken,
  setTokenCookie,
} from "../middlewares/tokenMiddleware.js";
import {
  handleBadRequest,
  handleInternalServerError,
} from "../helpers/errorHelpers.js";
import crypto from 'crypto';
import { sendEmail, mailTemplate } from "../utils/emailUtils.js";

export const signUp = async (req, res) => {
  try {
    const { email, username, password, userType } = req.body;
    //Check if user email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return handleBadRequest(res, "User already exists");
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email,
      password: hashedPassword,
      username: username,
      role: userType,
    });

    // Create a token with JWT based on _id
    const token = createSecretToken(user._id);
    setTokenCookie(res, token);
    console.log(res);
    res
      .status(StatusCodes.CREATED)
      .json({ message: "User signed up successfully", success: true, user });
  } catch (error) {
    return handleInternalServerError(res, error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return handleBadRequest(res, "Incorrect password or email");
    }

    // Compare input password with the encrypted password
    console.log("User found:", user);
    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return handleBadRequest(res, "Incorrect password");
    }

    console.log("Password comparison succeeded");
    // Create a JWT token for current user session
    const token = createSecretToken(user._id);
    setTokenCookie(res, token);

    return res.status(StatusCodes.OK).json({
      message: "User logged in successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    console.log("Error during login:", error);
    return handleInternalServerError(res, error);
  }
};

export const googleRegister = async (req, res) => {
  try {
    const { email, username, profilePic, userType } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return handleBadRequest(res, "User already exists");
    }

    const user = await User.create({
      email,
      username,
      role: userType,
      profilePic: { data: profilePic, contentType: 'image/png' }
    });

    const token = createSecretToken(user._id);
    setTokenCookie(res, token);

    return res.status(StatusCodes.CREATED).json({
      message: "User registered successfully",
      success: true,
      user
    });
  } catch (error) {
    return handleInternalServerError(res, error);
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return handleBadRequest(res, "User not registered");
    }

    const token = createSecretToken(user._id);
    setTokenCookie(res, token);

    return res.status(StatusCodes.OK).json({
      message: "User logged in successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    return handleInternalServerError(res, error);
  }
};


export const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found",
        user: null,
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "User found",
      user,
    });
  } catch (error) {
    console.error("Error checking email: ", error);
    return handleInternalServerError(res, error);
  }
};

export const forgotPass = async (req, res) => {
  console.log("Controller received forgot password request");
  try {
    const { email } = req.body;
    console.log("Received forgot password request for email:", email);
    
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "You are not registered!",
      });
    }else{
      console.log("User found for email:", email);
    }

    // Generate a unique token
    const token = crypto.randomBytes(20).toString("hex");
    console.log("Generated token for email:", email, "Token:", token);

    // Save the token to the user document in the database
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();
    console.log("Saved reset password token to user document for email:", email);

    // Send the reset password email
    const resetPasswordLink = `http://localhost:5050/reset-password?token=${token}`;
    const emailContent = mailTemplate(
      "We have received a request to reset your password. Please reset your password using the link below.",
      resetPasswordLink,
      "Reset Password"
    );
    await sendEmail({ email: user.email, subject: "Forgot Password Link", message: emailContent });

    console.log("Sent reset password email to:", email);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "A password reset link has been sent to your email.",
    });
  } catch (error) {
    console.error("Error in forgot password:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An error occurred while processing your request: " + error.message,
      email: req.body.email,
    });
  }
};

export const newPass =  async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ status: true, message: "Logged out successfully" });
};
