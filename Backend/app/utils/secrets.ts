import jwt from "jsonwebtoken";
import { IUser } from "../User/user.dto";



export const generateAccessToken = (user: IUser) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET , {
    expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
  });
};

export const generateRefreshToken = (user: IUser) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
  });
};
