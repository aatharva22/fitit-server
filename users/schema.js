import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ["user", "admin"], default: "user" },
  name: String,
  age: Number,
  height: Number,       
  weight: Number,   
  gender: String,
}, { collection: "users" });

export default UserSchema;
