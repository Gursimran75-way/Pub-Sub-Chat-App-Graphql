// *The error-handler.middleware.ts file defines a middleware function in Express to handle errors in the application.
//  *In any route or middleware, if you want to pass an error to the errorHandler, use next(error). This will only be triggered when `next(error)` is called
// *After all routes are defined, place the errorHandler middleware at the end of your Express app to catch any unhandled errors.
// *If we are using the expressAsyncHandler then whenever the error occur in async code then it will automatically call the next(error) middleware


import {type ErrorRequestHandler } from "express";
import { type ErrorResponse } from "../helper/response.hepler";

// Define the error handler middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Define the response structure for errors
  const response: ErrorResponse = {
    success: false, // Indicates the operation was not successful
    error_code: (err?.status ?? 500) as number, // Set the error code from `err.status`, or default to 500
    message: (err?.message ?? "Something went wrong!") as string, // Set the error message from `err.message`, or a generic message
    data: err?.data ?? {}, // Include any extra error data, or default to an empty object
  };

  // Send the response with the appropriate status code
  res.status(response.error_code).send(response);

  // Call the next middleware (optional)
  next();
};

export default errorHandler;






// *examples* //////////////////////////////////
// app.get("/api/error", (req: Request, res: Response, next: NextFunction) => {
//   const error = new Error("Something went wrong in /api/error!");
//   error.status = 500;
//   next(error); // Pass error to the errorHandler
// });
// response will be like={
//   "success": false,
//   "error_code": 500,
//   "message": "Something went wrong in /api/error!",
//   "data": {}
// }




//  Another route that throws a validation error
// app.get("/api/validation-error", (req: Request, res: Response, next: NextFunction) => {
//   const error = new Error("Validation failed!");
//   error.status = 400;
//   error.data = { field: "email" }; // Add additional error data
//   next(error); // Pass error to the errorHandler
// });
// response will be like={
//     "success": false,
//     "error_code": 500,
//     "message": "Something went wrong in /api/error!",
//     "data": {}
// }
