// *Passport.js is an authentication middleware for Node.js that supports different authentication strategies like JWT, OAuth, Google, Facebook, Local (username/password),

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import createError from "http-errors";
import * as userService from "../../user/user.service";
import { type Request } from "express";
import { type IUser } from "../../user/user.dto";

const isValidPassword = async function (value: string, password: string) {
  const compare = await bcrypt.compare(value, password);
  return compare;
};

export const initPassport = (): void => {
  passport.use(
    new Strategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (decode: Request["user"], done) => {
        try {
          if (!decode) {
            // return done(createError(401, 'Invalid token: No user found in token'), false);
            return done(null, false, { message: "Invalid token: No user found in token" });
          }
          const user = decode;
          done(null, user);//this will set req.user
        } catch (error) {
          // done(createError(401, "Either token expires or invalid token"), false);
          return done(null, false, { message: "Either token expired or invalid token" });
        }
      }
    )
  );

  // user login
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await userService.getUserByEmail(email);
          if (user == null) {
            done(createError(401, "User not found!"), false);
            return;
          }

          if (!user.active) {
            done(createError(401, "User is inactive"), false);
            return;
          }

          // if (user.blocked) {
          //   done(createError(401, "User is blocked, Contact to admin"), false);
          //   return;
          // }
          const validate = await isValidPassword(password, user.password);
          if (!validate) {
            done(createError(401, "Invalid email or password"), false);
            return;
          }
          const { password: _p, ...result } = user;
          done(null, result, { message: "Logged in Successfully" });
        } catch (error: any) {
          done(createError(500, error.message));
        }
      }
    )
  );
};

export const createUserAccessTokens = (user: Omit<IUser, "password" | "refreshToken">) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const access_token = jwt.sign(user, jwtSecret , {
    expiresIn: "1m",
  });
  const refresh_token = jwt.sign({_id: user._id}, jwtSecret , {
    expiresIn: "10m",
  });
  return { accessToken: access_token, refreshToken: refresh_token };
};

export const decodeToken = (token: string) => {
  // const jwtSecret = process.env.JWT_SECRET ?? "";
  const decode = jwt.decode(token);
  return decode as IUser;
};
