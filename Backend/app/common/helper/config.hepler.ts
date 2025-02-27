import dotenv from "dotenv";
import process from "process";
import path from "path";

export const loadConfig = () => {
  const env = process.env.NODE_ENV ?? "development";//If NODE_ENV is not set or is set to "development", the .env.development file is loaded.If NODE_ENV is set to "production", the .env.production file is loaded.
  const filepath = path.join(process.cwd(), `.env.${env}`);//This creates the path to the environment file
  dotenv.config({ path: filepath });//This loads the environment variables from the specified file (.env.development, .env.production, etc.) into process.env.
};
