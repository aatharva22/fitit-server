import mongoose from "mongoose";

const SavedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  exerciseId: { type: String, ref: "exercises", required: true },
}, { collection: "savedExercises" });

export default SavedSchema;
