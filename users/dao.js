import mongoose from "mongoose";
import UserSchema from "./schema.js";

const UserModel = mongoose.model("users", UserSchema);

export const createUser = (user) => {UserModel.create(user);
    const allUsers = UserModel.find();
    console.log("User created:", user);

}
export const findUserByEmail = (email) => UserModel.findOne({ email });
export const findUserById = (id) => UserModel.findById(id);
export const updateUser = (id, user) => UserModel.updateOne({ _id: id }, { $set: user });
export const deleteUser = (id) => UserModel.deleteOne({ _id: id });
export const findAllUsers = () => UserModel.find();