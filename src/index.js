import dotenv from "dotenv";
import connectDB from "./db/index.js";

// import express from "express";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("mongo db connection failed!!", err);
  });

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
