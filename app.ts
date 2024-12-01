require('dotenv').config();
import express, { NextFunction, Request, Response } from "express"; // Importing Express framework and TypeScript types for request, response, and next function handling 
export const app = express();

import cors from "cors"; // Importing CORS middleware for handling Cross-Origin Resource Sharing
import cookieParser from "cookie-parser"; // Importing cookie-parser for handling cookies in requests

// Configuring body-parser middleware to parse incoming JSON requests with a size limit of 50MB
app.use(express.json({ limit: "50mb" }));

// Using cookie-parser to parse cookies attached to client requests
app.use(cookieParser());

// Configuring CORS to allow requests from the specified origin defined in environment variables
app.use(cors({
    origin: process.env.ORIGIN // Origin URL set in the environment variable for security and flexibility
}));


// TESTING API Endpoint: Defines a GET route for "/test" to verify if the API is functioning properly
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ // Sends a JSON response with HTTP status 200 (OK)
        success: true,      // Indicates the request was successful
        message: "API is working" // Provides a message indicating the API is operational
    });
});

// Handle unknown or undefined routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    // Create an error object for the unmatched route with a custom error message
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404; // Set the HTTP status code to 404 (Not Found)
    
    // Pass the error to the next middleware for centralized error handling
    next(err);
});