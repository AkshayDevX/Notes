import jwt from "jsonwebtoken";

// Create and send token, save it in the cookie.
function sendToken(user, statusCode, res) {
  // Create Jwt token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_EXPIRES_TIME) * 24 * 60 * 60 * 1000,
  });

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
}

export default sendToken;
