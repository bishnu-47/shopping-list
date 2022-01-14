import mongoose from "mongoose";

const Schema = mongoose.Schema;

// create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    requried: true,
  },
  password: {
    type: String,
    requried: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
