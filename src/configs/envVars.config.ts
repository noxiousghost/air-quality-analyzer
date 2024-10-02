import * as dotenv from 'dotenv';
dotenv.config();

export const envVars = {
  PORT: process.env.PORT,
  ENV: process.env.ENV,
  DB_URI: process.env.DB_URI,
  Access_Control_Allow_Origin_URL: process.env.Access_Control_Allow_Origin_URL,
} as const; // as const ensures the values are readonly and the types are inferred correctly.
