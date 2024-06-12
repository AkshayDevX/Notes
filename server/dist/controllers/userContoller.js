"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDummyUsers = exports.logoutUser = exports.getProfileForLoginUser = exports.loginUser = exports.verifyAndRegisterUser = exports.sendRegistrationEmail = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const catchAsyncErrors_1 = __importDefault(require("../utils/catchAsyncErrors"));
const index_1 = __importDefault(require("../db/index"));
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtToken_1 = __importDefault(require("../utils/jwtToken"));
const comparePassword_1 = __importDefault(require("../utils/comparePassword"));
const cron = __importStar(require("node-cron"));
function generateOtp() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0, v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
// send verifiaction email
exports.sendRegistrationEmail = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorHandler_1.default("Please enter email and password", 400));
    }
    const existingUser = yield index_1.default
        .select()
        .from(schema_1.users)
        .where((0, drizzle_orm_1.sql) `${schema_1.users.email} = ${email}`);
    if (existingUser.length > 0) {
        return next(new errorHandler_1.default("User with this email already exists", 409));
    }
    const token = generateOtp();
    // send otp to user
    yield (0, sendEmail_1.default)({
        from: "info@gmail.com",
        email: email,
        subject: "Email Verification",
        message: `This email is sent by notes to verify your email. Your Link for veification is ${`https://notes-ljgo.onrender.com/verify-email/${token}`}. This link will expire in 5 minutes.`,
    });
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const existingRecord = yield index_1.default
        .select()
        .from(schema_1.dummyUsers)
        .where((0, drizzle_orm_1.sql) `${schema_1.dummyUsers.email} = ${email}`);
    if (existingRecord.length > 0) {
        const user = yield index_1.default
            .update(schema_1.dummyUsers)
            .set({ password: hashedPassword, token: token })
            .where((0, drizzle_orm_1.sql) `${schema_1.dummyUsers.email} = ${email}`)
            .returning();
        const newUser = user[0];
        res.status(200).json({
            success: true,
            message: "Email verification link sent successfully",
            newUser,
        });
    }
    else {
        const user = yield index_1.default
            .insert(schema_1.dummyUsers)
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
}));
// verifying and registering user
exports.verifyAndRegisterUser = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    if (!token) {
        return next(new errorHandler_1.default("Link is expired", 400));
    }
    const dummyUser = yield index_1.default
        .select()
        .from(schema_1.dummyUsers)
        .where((0, drizzle_orm_1.sql) `${schema_1.dummyUsers.token} = ${token}`);
    if (dummyUser.length <= 0) {
        return next(new errorHandler_1.default("Invalid Link or expired Link", 400));
    }
    const { email, password } = dummyUser[0];
    // create user
    const user = yield index_1.default
        .insert(schema_1.users)
        .values({
        email,
        password,
    })
        .returning();
    // delete dummyUser
    yield index_1.default.delete(schema_1.dummyUsers).where((0, drizzle_orm_1.sql) `${schema_1.dummyUsers.email} = ${email}`);
    // send token to user
    (0, jwtToken_1.default)(user[0], 200, res);
}));
// login user
exports.loginUser = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorHandler_1.default("Please enter email and password", 400));
    }
    const user = yield index_1.default
        .select()
        .from(schema_1.users)
        .where((0, drizzle_orm_1.sql) `${schema_1.users.email} = ${email}`);
    if (user.length <= 0) {
        return next(new errorHandler_1.default("Ivalid email or password", 404));
    }
    const userPassword = user[0].password;
    const isPasswordMatched = yield (0, comparePassword_1.default)(password, userPassword);
    if (!isPasswordMatched) {
        return next(new errorHandler_1.default("Invalid email or password", 401));
    }
    (0, jwtToken_1.default)(user[0], 200, res);
}));
// automatic dummy user deletion
const fiveMinutesInMs = 5 * 60 * 1000;
const deleteOldData = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentTime = new Date().getTime();
    const fiveMinutesAgo = currentTime - fiveMinutesInMs;
    yield index_1.default
        .delete(schema_1.dummyUsers)
        .where((0, drizzle_orm_1.sql) `${schema_1.dummyUsers.createdAt} < ${new Date(fiveMinutesAgo)}`);
});
cron.schedule("*/5 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    yield deleteOldData();
}));
// get user profile
exports.getProfileForLoginUser = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.default
        .select({ id: schema_1.users.id, email: schema_1.users.email })
        .from(schema_1.users)
        .where((0, drizzle_orm_1.sql) `${schema_1.users.id} = ${req.user.id}`);
    if (user.length <= 0) {
        return next(new errorHandler_1.default("User not found", 404));
    }
    const userProfile = user[0];
    res.status(200).json({
        success: true,
        userProfile,
    });
}));
// logout user
exports.logoutUser = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged out",
    });
}));
// get all dummy users
exports.getAllDummyUsers = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield index_1.default
        .select({ id: schema_1.dummyUsers.id, email: schema_1.dummyUsers.email, token: schema_1.dummyUsers.token })
        .from(schema_1.dummyUsers);
    res.status(200).json({
        success: true,
        users,
    });
}));
//# sourceMappingURL=userContoller.js.map