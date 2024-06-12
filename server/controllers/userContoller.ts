import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../utils/catchAsyncErrors";
import db from "../db/index";
import { dummyUsers, users } from "../db/schema";
import { sql } from "drizzle-orm";
import sendEmail from "../utils/sendEmail";
import bcrypt from "bcryptjs";
import sendToken from "../utils/jwtToken";
import comparePasswords from "../utils/comparePassword";
import * as cron from "node-cron";

function generateOtp() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// send verifiaction email
export const sendRegistrationEmail = catchAsyncErrors(
  async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }

    const existingUser = await db
      .select()
      .from(users)
      .where(sql`${users.email} = ${email}`);

    if (existingUser.length > 0) {
      return next(new ErrorHandler("User with this email already exists", 409));
    }

    const token = generateOtp();

    // send otp to user
    await sendEmail({
      from: "info@gmail.com",
      email: email,
      subject: "Email Verification",
      message: `This email is sent by notes to verify your email. Your Link for veification is ${`http://localhost:5173/verify-email/${token}`}. This link will expire in 5 minutes.`,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingRecord = await db
      .select()
      .from(dummyUsers)
      .where(sql`${dummyUsers.email} = ${email}`);

    if (existingRecord.length > 0) {
      const user = await db
        .update(dummyUsers)
        .set({ password: hashedPassword, token: token })
        .where(sql`${dummyUsers.email} = ${email}`)
        .returning();

      const newUser = user[0];
      res.status(200).json({
        success: true,
        message: "Email verification link sent successfully",
        newUser,
      });
    } else {
      const user = await db
        .insert(dummyUsers)
        .values({
          email,
          password: hashedPassword,
          token: token,
        })
        .returning();
      const newUser = user[0];
      res.status(200).json({
        success: true,
        message: "Email verification link sent successfully",
        newUser,
      });
    }
  }
);

// verifying and registering user
export const verifyAndRegisterUser = catchAsyncErrors(
  async (req, res, next) => {
    const { token } = req.body;
    if (!token) {
      return next(new ErrorHandler("Link is expired", 400));
    }

    const dummyUser = await db
      .select()
      .from(dummyUsers)
      .where(sql`${dummyUsers.token} = ${token}`);

    if (dummyUser.length <= 0) {
      return next(new ErrorHandler("Invalid Link or expired Link", 400));
    }

    const { email, password } = dummyUser[0];

    // create user
    const user = await db
      .insert(users)
      .values({
        email,
        password,
      })
      .returning();

    // delete dummyUser
    await db.delete(dummyUsers).where(sql`${dummyUsers.email} = ${email}`);

    // send token to user
    sendToken(user[0], 200, res);
  }
);

// login user
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await db
    .select()
    .from(users)
    .where(sql`${users.email} = ${email}`);

  if (user.length <= 0) {
    return next(new ErrorHandler("Ivalid email or password", 404));
  }

  const userPassword = user[0].password;

  const isPasswordMatched = await comparePasswords(password, userPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user[0], 200, res);
});

// automatic dummy user deletion
const fiveMinutesInMs = 5 * 60 * 1000;
const deleteOldData = async () => {
  const currentTime = new Date().getTime();
  const fiveMinutesAgo = currentTime - fiveMinutesInMs;

  await db
    .delete(dummyUsers)
    .where(sql`${dummyUsers.createdAt} < ${new Date(fiveMinutesAgo)}`);
};

cron.schedule("*/5 * * * *", async () => {
  await deleteOldData();
});

// get user profile
export const getProfileForLoginUser = catchAsyncErrors(
  async (req: any, res, next) => {
    const user = await db
      .select({ id: users.id, email: users.email })
      .from(users)
      .where(sql`${users.id} = ${req.user.id}`);


    if (user.length <= 0) {
      return next(new ErrorHandler("User not found", 404));
    }

    const userProfile = user[0];

    res.status(200).json({
      success: true,
      userProfile,
    });
  }
);

// logout user
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// get all dummy users
export const getAllDummyUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await db
    .select({ id: dummyUsers.id, email: dummyUsers.email, token: dummyUsers.token })
    .from(dummyUsers);

  res.status(200).json({
    success: true,
    users,
  });
});
