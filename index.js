import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";

import userRoutes from "./users/routes.js";
import exerciseRoutes from "./exercises/routes.js";
import savedRoutes from "./saved/routes.js";

const app = express();

/* ------------------ ENV ------------------ */
const PORT = process.env.PORT || 4000;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://fitIt:fitItpassword@fitit.qg6zysh.mongodb.net/fitit?appName=fitIt";

const CLIENT_URL =
  process.env.CLIENT_URL || "http://localhost:3000";

/* ------------------ CORS ------------------ */
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

/* ------------------ BODY PARSERS ------------------ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ------------------ SESSION ------------------ */
app.use(
  session({
    name: "fitit.sid",
    secret: process.env.SESSION_SECRET || "fitit-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS on Render
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

/* ------------------ DATABASE ------------------ */
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

/* ------------------ ROUTES ------------------ */
userRoutes(app);
exerciseRoutes(app);
savedRoutes(app);

/* ------------------ START SERVER ------------------ */
app.listen(PORT, () => {
  console.log(`FitIt server running on port ${PORT}`);
});
