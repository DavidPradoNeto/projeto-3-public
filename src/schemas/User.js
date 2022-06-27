import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    nome: String,
    email: String,
    password: String
});

export default mongoose.model("Users", UserSchema);