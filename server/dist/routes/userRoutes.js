"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userContoller_1 = require("./../controllers/userContoller");
const auth_1 = require("./../middlewares/auth");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.route("/register").post(userContoller_1.verifyAndRegisterUser);
router.route("/login").post(userContoller_1.loginUser);
router.route("/send-email").post(userContoller_1.sendRegistrationEmail);
router.route("/user/me").get(auth_1.isAuthenticatedUser, userContoller_1.getProfileForLoginUser);
router.route("/logout").get(userContoller_1.logoutUser);
router.route("/users/dummy").get(userContoller_1.getAllDummyUsers);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map