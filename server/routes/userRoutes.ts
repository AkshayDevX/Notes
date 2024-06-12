import { getAllDummyUsers, getProfileForLoginUser, loginUser, logoutUser, sendRegistrationEmail, verifyAndRegisterUser } from "./../controllers/userContoller";
import {isAuthenticatedUser} from "./../middlewares/auth";
import express from "express";

const router = express.Router();

router.route("/register").post(verifyAndRegisterUser);
router.route("/login").post(loginUser);
router.route("/send-email").post(sendRegistrationEmail);
router.route("/user/me").get(isAuthenticatedUser, getProfileForLoginUser);
router.route("/logout").get(logoutUser);
router.route("/users/dummy").get(getAllDummyUsers);

export default router;