"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const serverless_1 = require("@neondatabase/serverless");
const neon_http_1 = require("drizzle-orm/neon-http");
const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    if (process.env.NODE_ENV === "development") {
        console.log(err);
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack,
        });
    }
    if (process.env.NODE_ENV === "production") {
        let error = Object.assign({}, err);
        error.message = err.message;
        // Handling wrong JWT error
        if (err.name === "JsonWebTokenError") {
            const message = "JSON Web Token is invalid. Try Again!!!";
            error = new errorHandler_1.default(message, 400);
        }
        // Handling Expired JWT error
        if (err.name === "TokenExpiredError") {
            const message = "JSON Web Token is expired. Try Again!!!";
            error = new errorHandler_1.default(message, 400);
        }
        if (err.message === "Error connecting to database: fetch failed") {
            const sql = (0, serverless_1.neon)(process.env.DRIZZLE_DATABASE_URL);
            (0, neon_http_1.drizzle)(sql);
            console.log("Attempting to reconnect to the database...");
        }
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
exports.default = errorMiddleware;
//# sourceMappingURL=error.js.map