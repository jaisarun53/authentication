import mongoose from "mongoose";
// set rules
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 30,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 30,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    maxlength: 60,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});
// create rules
const User = mongoose.model("User", userSchema);
export default User;
