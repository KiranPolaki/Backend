import dotenv from "dotenv";
import connectDB from "./db/index.js";

import express from "express";
const app = express();

dotenv.config({
  path: "./env",
});

connectDB();

// Execute as soon as it is created we can use IIFE
// function connectDB() {}
// connectDB();
/*
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGOBD_URL}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERORR: ", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log("App is litening on port ", process.env.PORT);
    });
  } catch (err) {
    console.error("Error", err);
    throw err;
  }
})();
*/
