import { config } from 'dotenv';
import * as process from 'process';

config();

export const Configs = {
  BCRYPT_SALT: process.env.BCRYPT_SALT,

  JWT_SECRET: process.env.JWT_SECRET,

  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
};
