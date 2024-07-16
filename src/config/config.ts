
import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "7f65afbcf5bdc3e63199873c825d0ec320becac940b500733c6e77b8d482339b";
export const PORT = process.env.PORT || 3300;
export const MONGO_DB_HOST =  process.env.MONGO_DB_HOST;
export const MONGO_DB_name = process.env.MONGO_DB_name;