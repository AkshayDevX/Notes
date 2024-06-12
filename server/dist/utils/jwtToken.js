"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Create and send token, save it in the cookie.
function sendToken(user, statusCode, res) {
    // Create Jwt token
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: parseInt(process.env.JWT_EXPIRES_TIME) * 24 * 60 * 60 * 1000,
    });
    // Options for cookie
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        user,
    });
}
exports.default = sendToken;
//# sourceMappingURL=jwtToken.js.map