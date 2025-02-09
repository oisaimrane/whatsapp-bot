/* Copyright (C) 2020 Yusuf Usta.

Licensed under the GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const { Sequelize } = require("sequelize");
const fs = require("fs");

if (fs.existsSync("config.env")) {
  require("dotenv").config({ path: "./config.env" });
}

// Function to convert environment variables to boolean
function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}

// Define database URL (Render-compatible)
DATABASE_URL = process.env.DATABASE_URL || "./whatsasena.db";

DEBUG = process.env.DEBUG ? convertToBool(process.env.DEBUG) : false;

module.exports = {
  VERSION: "v1.2.8",
  SESSION: process.env.ASENA_SESSION || "",
  EXT: process.env.EXT || undefined,
  LANG: (process.env.LANGUAGE || "EN").toUpperCase(),
  HANDLERS: process.env.HANDLERS || "^[.]",
  SEND_READ: convertToBool(process.env.SEND_READ || "false"),
  BRANCH: "master",

  // Render does not need Heroku settings, so removed it

  DATABASE_URL: DATABASE_URL,
  DATABASE:
    DATABASE_URL === "./whatsasena.db"
      ? new Sequelize({
          dialect: "sqlite",
          storage: DATABASE_URL,
          logging: DEBUG,
        })
      : new Sequelize(DATABASE_URL, {
          dialect: "postgres",
          logging: DEBUG,
          dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false },
          },
        }),

  NO_ONLINE: convertToBool(process.env.NO_ONLINE || "true"),
  CLR_SESSION: convertToBool(process.env.CLR_SESSION || "false"),
  SUDO: process.env.SUDO || false,
  DEBUG: DEBUG,
  REMOVEBG: process.env.REMOVEBG_KEY || "false",
  WARN_COUNT: process.env.WARN_COUNT || 3,
  WARN_MSG: process.env.WARN_MSG || "Ok bie",
  ANTIJID: process.env.ANTIJID || "",
  STICKER_PACKNAME: process.env.STICKER_PACKNAME || "🥰,lyfe00011",
  BRAINSHOP: process.env.BRAINSHOP || "159501,6pq8dPiYt7PdqHz3",
  DIS_BOT: process.env.DISABLE_BOT || "null",
  FIND_API_KEY: process.env.FIND_API_KEY || "null",
};
