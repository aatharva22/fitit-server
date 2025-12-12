import mongoose from "mongoose";
import SavedSchema from "./schema.js";

const SavedModel = mongoose.model("savedExercises", SavedSchema);

export const saveExercise = (record) => SavedModel.create(record);

export const getSavedByUser = (userId) =>
  SavedModel.find({ userId });

export const deleteSavedExercise = (userId, exerciseId) =>
  SavedModel.deleteOne({ userId, exerciseId });

export const findSavedExercise = (userId, exerciseId) =>
  SavedModel.findOne({ userId, exerciseId });
