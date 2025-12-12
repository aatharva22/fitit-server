import * as dao from "../users/dao.js";
import bcrypt from "bcryptjs";

export default function UserRoutes(app) {


  app.post("/api/users/signup", async (req, res) => {
    try {
      console.log(req.body);
      const { username, email, password } = req.body;

      const existing = await dao.findUserByEmail(email);
      if (existing) {
        return res.status(400).send("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await dao.createUser({
        username,
        email,
        password: hashedPassword,
      });

      req.session.currentUser = newUser;
      res.json(newUser);

    } catch (error) {
      console.log(error);
      res.status(500).send("Error signing up");
    }
  });



  app.post("/api/users/signin", async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await dao.findUserByEmail(email);
      if (!user) return res.status(404).send("User not found");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(400).send("Invalid password");

      req.session.currentUser = user;

req.session.save(() => {
  res.json(user);
});

    } catch (error) {
      console.log(error);
      res.status(500).send("Error signing in");
    }
  });



  app.get("/api/users/profile", (req, res) => {
    try {
      const currentUser = req.session.currentUser;
      console.log("Current User:", currentUser);
      if (!currentUser) return res.status(401).send("Not logged in");
      res.json(currentUser);
      console.log("SESSION:", req.session);

    } catch (error) {
      console.log(error);
      res.status(500).send("Error fetching profile");
    }
  });



  app.post("/api/users/signout", (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  });



 app.put("/api/admin/users/:id", async (req, res) => {
    if (req.session.currentUser?.role !== "admin") {
      return res.status(403).send("Admins only");
    }

    await dao.updateUser(req.params.id, req.body);
    res.sendStatus(200);
  });


//find all users
app.get("/api/admin/users", async (req, res) => {
    if (req.session.currentUser?.role !== "admin") {
      return res.status(403).send("Admins only");
    }

    const users = await dao.findAllUsers();
    res.json(users);
  });
//create user
  app.post("/api/admin/users", async (req, res) => {
    // if (req.session.currentUser?.role !== "admin") {
    //   return res.status(413).send("Admins only");
    // }

    const { username, email, password, role } = req.body;

    const existing = await dao.findUserByEmail(email);
    if (existing) {
      return res.status(400).send("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await dao.createUser({
      username,
      email,
      password: hashed,
      role: role || "user",
    });

    res.json(user);
  });

  app.delete("/api/admin/users/:id", async (req, res) => {
    if (req.session.currentUser?.role !== "admin") {
      return res.status(403).send("Admins only");
    }

    await dao.deleteUser(req.params.id);
    res.sendStatus(200);
  });

  app.put("/api/users/profile", async (req, res) => {
  const currentUser = req.session.currentUser;

  if (!currentUser) {
    return res.status(401).send("Not logged in");
  }

  const updates = req.body;

  await dao.updateUser(currentUser._id, updates);

  const updatedUser = await dao.findUserById(currentUser._id);
  req.session.currentUser = updatedUser;

  res.json(updatedUser);
});

}