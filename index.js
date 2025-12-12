import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

import userRoutes from "./users/routes.js";
import exerciseRoutes from "./exercises/routes.js";
import savedRoutes from "./saved/routes.js";

const app = express();


const PORT = process.env.PORT || 4000;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://fitIt:fitItpassword@fitit.qg6zysh.mongodb.net/fitit?appName=fitIt";

const CLIENT_URL =
  process.env.CLIENT_URL || "http://localhost:3000";



const allowedOrigins = [
  "http://localhost:3000",
  "https://fitit-client.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);





app.use(
  session({
    name: "fitit.sid",
    secret: process.env.SESSION_SECRET || "fitit-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.SERVER_ENV === "production", // HTTPS on Render
      sameSite: process.env.SERVER_ENV === "production" ? "none" : "lax",
    },
  })
);
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));


userRoutes(app);
exerciseRoutes(app);
savedRoutes(app);


app.listen(PORT, () => {
  console.log(`FitIt server running on port ${PORT}`);
});
