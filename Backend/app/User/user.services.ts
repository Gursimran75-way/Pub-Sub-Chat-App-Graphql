import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/secrets";
import User from "./user.model";
import bcrypt from "bcryptjs";

export const signUp = async (args: any) => {
  try {
    const { name, email, password } = args.input;

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email is already in use");
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user instance
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to the database
    const savedUser = await user.save();

    return savedUser;
  } catch (error) {
    console.error("Error during signup:", error);
    throw new Error(`Signup failed ${error}`);
  }
};

export const login = async (args: any, context: any) => {
  try {
    const { email, password } = args.input;
    const { res } = context;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const user = await User.findByIdAndUpdate(
      existingUser._id,
      { isActive: true },
      { new: true }
    );

    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return {
      accessToken,
      refreshToken,
      loggedInUser: user,
    };
  } catch (error) {
    console.error("Error during Login:", error);
    throw new Error(`Login failed ${error}`);
  }
};

export const findUserById = async (_id: string) => {
  try {
    const user = await User.findById({ _id: _id });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(`Error finding user by id: ${error}`);
  }
};

export const getUsersExceptMe = async (context: any) => {
  try {
    if (!context.isLoggedIn) {
      throw new Error("Pls Login First");
    }
    const users = await User.find().sort({ createdAt: -1 }); //descending order

    const usersExceptCurrentUser = users.filter(
      (user) => user._id != context.userId
    );
    return usersExceptCurrentUser;
  } catch (error) {
    throw new Error(`Error fetching users ${error}`);
  }
};
