import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  videoUrl: { type: String }, // optional
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, 
}, { collection: "exercises" });

export default ExerciseSchema;
