import * as dao from "./dao.js";

export default function ExerciseRoutes(app) {
  
  // Create Exercise (trainer)
  app.post("/api/exercises", async (req, res) => {
    const exercise = await dao.createExercise(req.body);
    res.json(exercise);
  });

  // Get Exercise by ID
  app.get("/api/exercises/:id", async (req, res) => {
    const exercise = await dao.findExerciseById(req.params.id);
    res.json(exercise);
  });

  // Get All Exercises
  app.get("/api/exercises", async (req, res) => {
    const exercises = await dao.findAllExercises();
    res.json(exercises);
  });

  // Update Exercise (trainer)
  app.put("/api/exercises/:id", async (req, res) => {
    const status = await dao.updateExercise(req.params.id, req.body);
    res.json(status);
  });

  // Delete Exercise (trainer)
  app.delete("/api/exercises/:id", async (req, res) => {
    const status = await dao.deleteExercise(req.params.id);
    res.json(status);
  });

}
