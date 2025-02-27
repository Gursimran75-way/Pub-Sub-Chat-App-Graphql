import jwt from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express";
import expressAsyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import process from "process";
import { type IUser } from "../../user/user.dto";

export const roleAuth = (
  roles: IUser["role"][], //defines the roles that are allowed to access the resource. refers to the type of role in the IUser interface
  publicRoutes: string[] = [] // is an array of routes that are public and can be accessed without requiring role-based validation
) =>
  expressAsyncHandler(
    //expressAsyncHandler helps to avoid the need for manual try-catch blocks in every asynchronous route handler. Instead, it automatically catches any errors thrown by asynchronous code and passes them to the next error-handling middleware.expressAsyncHandler automatically forwards the error to the next error-handling middleware by calling next(error).
    async (req: Request, res: Response, next: NextFunction) => {
      if (publicRoutes.includes(req.path)) {
        //if the requested route is listed in the publicRoutes array, the middleware simply allows the request to proceed without checking for authorization. This is useful for public endpoints (e.g., login, registration) that do not require authentication.
        next();
        return;
      }

      // const token = req.headers.authorization?.replace("Bearer ", "");//remove the Bearer
      // if (!token) {
      //   throw createHttpError(401, {
      //     //automatically call next(error) as wrapped inside the expressAsyncHandler
      //     message: `Invalid token`,
      //   });
      // }
      // const decodedUser = jwt.verify(token, process.env.JWT_SECRET!);
      // req.user = decodedUser as IUser;
      
      const user = req.user as IUser;
      if (user.role == null || !["ADMIN", "USER"].includes(user.role)) {
        throw createHttpError(401, { message: "Invalid user role" }); //automatically call next(error) as wrapped inside the expressAsyncHandler
      }
      if (!roles.includes(user.role)) {
        const type =
          user.role.slice(0, 1) + user.role.slice(1).toLocaleLowerCase(); // Formats the role (e.g., 'ADMIN' → 'Admin', 'USER' → 'User') for the error message.

        throw createHttpError(401, {//automatically call next(error) as wrapped inside the expressAsyncHandler
          message: `${type} can not access this resource`,
        });
      }
      next();
    }
  );





  // *examples*
//   const publicRoutes = ['/login', '/register'];

 // Middleware usage for an endpoint that requires 'ADMIN' or 'MODERATOR' role
 
// app.use('/admin', roleAuth(['ADMIN', 'MODERATOR'], publicRoutes), (req, res) => {
//   res.send('Admin or Moderator access granted!');
// });

 // Middleware usage for an endpoint that requires 'ADMIN' role
// app.use('/admin/settings', roleAuth(['ADMIN'], publicRoutes), (req, res) => {
//   res.send('Only Admin can access settings');
// });

 // Default route for unauthorized users
// app.use((req, res) => {
//   res.status(401).send('Unauthorized');
// });
