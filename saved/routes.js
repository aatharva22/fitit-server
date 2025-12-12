import * as dao from "./dao.js";

export default function SavedRoutes(app) {
  
  // Save exercise
 app.post("/api/saved", async (req, res) => {
  try {
    const { userId, exerciseId } = req.body;

    // 1️⃣ Check if already saved
    const existing = await dao.findSavedExercise(userId, exerciseId);
    if (existing) {
      return res
        .status(409)
        .json({ message: "Exercise already saved" });
    }

    // 2️⃣ Save if not exists
    const saved = await dao.saveExercise({ userId, exerciseId });
    res.json(saved);

  } catch (err) {
    console.error("Error saving exercise", err);
    res.status(500).send("Error saving exercise");
  }
});


  // Get saved exercises for user
  app.get("/api/saved/user/:userId", async (req, res) => {
    const saved = await dao.getSavedByUser(req.params.userId);
    res.json(saved);
  });

  // Remove saved exercise
  app.delete("/api/saved", async (req, res) => {
    const { userId, exerciseId } = req.body;
    const status = await dao.deleteSavedExercise(userId, exerciseId);
    res.json(status);
  });

}
