import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // This creates a 15-minute window.
    max: 10,//A client/IP can make at most 10 requests during that window.
    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    },
});