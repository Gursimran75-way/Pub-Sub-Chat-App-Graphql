import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.dto';

// Define the User Schema
const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      lowercase: true, // Store in lowercase
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create and export the User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
