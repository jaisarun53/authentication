import express from "express";
const router = express.Router();
import { addUserValidationSchema } from "./user.validation.js";
import User from "./user.model.js";
import bcrypt from "bcrypt";
// register user
router.post(
  "/user/register",
  async (req, res, next) => {
    // extract new data from req.body
    const newData = req.body;
    // validate data
    try {
      req.body = await addUserValidationSchema.validate(req.body);
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    // extract new user from req.body
    const newUser = req.body;
    // find user by email
    const user = await User.findOne({ email: newUser.email });
    // if user exist throw error
    if (user) {
      return res.status(409).send({ message: "user already exist" });
    }
    // hash password
    const plainPassword = newUser.password;
    const saltRound = 10;

    const hashedPassword = await bcrypt.hash(plainPassword, saltRound);
    newUser.password = hashedPassword;
    // create user
    await User.create(newUser);
    // send response
    return res.status(200).send({ message: "user registered successfully" });
  }
);
export default router;
