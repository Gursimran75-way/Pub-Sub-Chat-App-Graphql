// *The catchError middleware is designed to catch and handle validation errors that occur when using express-validator to validate incoming request data in Express routes

import { type Response, type Request, type NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";

export const catchError = expressAsyncHandler(
  //expressAsyncHandler helps to avoid the need for manual try-catch blocks in every asynchronous route handler. Instead, it automatically catches any errors thrown by asynchronous code and passes them to the next error-handling middleware.expressAsyncHandler automatically forwards the error to the next error-handling middleware by calling next(error).

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req); //to gather any validation errors from the request. This function checks whether the data in the request (like in the req.body, req.query, or req.params) meets the validation rules defined for it.returns an object that has the method isEmpty(), which returns true if there are no errors, or false if there are validation errors.
    const isError = errors.isEmpty(); //is used to check if there are any validation errors.
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!isError) {
      const data = { errors: errors.array() }; //The data field in the error contains an array of validation errors returned by express-validator that provides information about what went wrong (e.g., which fields failed validation).
      throw createHttpError(400, {
        //reates a new error with the HTTP status code 400 (Bad Request), indicating that the client has sent incorrect or invalid data.and as we are using the expressAsyncHandler so it automatically calls the next(error) middleware 
        message: "Validation error!",
        data,
      });
    } else {
      next();
    }
  }
);

// *Example////////////////////////////////////////////////////////////////
// import { check } from "express-validator";
// import { catchError } from "./catch-error.middleware";

// // Example route that expects a valid name and email
// app.post(
//   "/user",
//   [
//     check("name").notEmpty().withMessage("Name is required"),
//     check("email").isEmail().withMessage("Valid email is required"),
//   ],
//   catchError,  // The catchError middleware checks if validation errors occurred. If errors are present, it throws a 400 Bad Request error with the validation errors.
//   (req: Request, res: Response) => {
//     // If validation passed, continue with the logic
//     res.send({ message: "User created successfully!" });
//   }
// );
