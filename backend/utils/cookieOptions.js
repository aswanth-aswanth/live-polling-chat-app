import { configDotenv } from 'dotenv';
configDotenv();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'None',
  maxAge: 604800000,
};

export default cookieOptions;
