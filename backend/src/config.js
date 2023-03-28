import dotenv from "dotenv";

dotenv.config();

export const PORT = +process.env.PORT || 8_080;

export const jwtSecret = process.env.JWT_SECRET;

export const URI = process.env.URI;

export const DB = process.env.DB;

export const USERSCOLLECTION = process.env.USERSCOLLECTION;

export const EVENTSCOLLECTION = process.env.EVENTSCOLLECTION;

export const PARTICIPANTSCOLLECTION = process.env.PARTICIPANTSCOLLECTION;
