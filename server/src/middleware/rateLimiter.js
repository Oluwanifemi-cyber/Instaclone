import {rateLimit} from "express-rate-limit";

export const rateLimiter = rateLimit({
        windowMs: 2 * 60 * 1000, // 2 minutes
        max: 10, // 10 attempts within 2 minutes window
        message: "Too many requests attempts, please try again later",
    });