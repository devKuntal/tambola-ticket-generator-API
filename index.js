// import modules
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import "express-async-errors";
import morgan from "morgan";
// import middleware
import notFoundMiddleware from "./middleware/notFound.js";
import errorHandlerMiddleware from "./middleware/errorHandler.js";
import authenticateUser from "./middleware/auth.js";
//import routes
import authRoutes from "./routes/authRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
//import database setup
import connectDB from "./db/connect.js";
// import security package
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

//initialize app and config
const app = express();
dotenv.config();

//setup morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
// json cookie and security
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// Home routes
app.get("/", (req, res) => {
  res.send("It worked...Generate your ticket from POSTMAN");
});
app.use("/auth", authRoutes);
app.use("/tickets", authenticateUser, ticketRoutes);

// Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//define port
const port = process.env.PORT || 5000;

// connect to the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
