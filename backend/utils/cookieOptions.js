import { configDotenv } from 'dotenv';
configDotenv();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 3600000,
};

export default cookieOptions;
