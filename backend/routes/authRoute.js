import express from "express";
import { asyncHandler } from "../middlewares/asyncMiddleware.js";
import {
  validateSignUp,
  validateLogin,
  userVerification,
} from "../middlewares/authMiddleware.js";
import {
  handleBadRequest,
  handleInternalServerError,
} from "../helpers/errorHelpers.js";
import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import { signUp, login, logout, googleRegister, googleLogin } from '../controllers/authController.js';

const router = express.Router();

router.post("/signup", validateSignUp, asyncHandler(signUp));
router.post("/login", validateLogin, asyncHandler(login));
router.post('/google-register', googleRegister);
router.post('/google-login', googleLogin);
router.get("/debug", async (req, res) => {
  try {
    const allUsers = await User.find();

    if (!allUsers) {
      handleInternalServerError(res, error);
    }
    return res.status(StatusCodes.OK).json(allUsers);
  } catch (error) {
    handleInternalServerError(res, error);
  }
});

router.get("/verify", userVerification);
router.get("/logout", logout);
export default router;
