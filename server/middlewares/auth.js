import { sql } from "drizzle-orm";
import db from "../db/index";
import jwt from "jsonwebtoken";
import { users } from "../db/schema";
import ErrorHandler from "../utils/errorHandler";


// ckecking for user authentication
export const isAuthenticatedUser = async (req, res, next) => {
	const { token } = req.cookies;
    if(!token) {
        return next(new ErrorHandler("login required to access this resource", 401));
        
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.select().from(users).where(sql`${users.id} = ${decoded.id}`);
    req.user = user[0];
    
    next()
};

