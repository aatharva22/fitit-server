import mongoose from "mongoose";
import ExerciseSchema from "./schema.js";

const ExerciseModel = mongoose.model("exercises", ExerciseSchema);

export const createExercise = (exercise) => ExerciseModel.create(exercise);
export const findExerciseById = (id) => ExerciseModel.findById(id);
export const findExercisesByCategory = (category) =>
  ExerciseModel.find({ category });
export const findAllExercises = () => ExerciseModel.find();
export const updateExercise = (id, updated) =>
  ExerciseModel.updateOne({ _id: id }, { $set: updated });
export const deleteExercise = (id) =>
  ExerciseModel.deleteOne({ _id: id });
