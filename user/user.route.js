import express from "express";
const router = express.Router();
import { loginUserValidationSchema } from "./user.validation.js";
import { addUserValidationSchema } from "./user.validation.js";
import jwt from "jsonwebtoken";
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
// login user

router.post(
  "/user/login",
  async (req, res, next) => {
    // extract new data from req.body
    const newData = req.body;
    // validate data
    try {
      const validatedData = await loginUserValidationSchema.validate(newData);
      req.body = validatedData;
      // call next function
      next();
    } catch (error) {
      // if validation fails, throw error
      return res.status(404).send({ message: error.message });
    }
  },
  async (req, res) => {
    // extract login credentials from req.body
    const loginCredentials = req.body;
    // find user by email
    const user = await User.findOne({ email: loginCredentials.email });
    // if not user,throw error
    if (!user) {
      return res.status(404).send({ message: "Invalid credentials" });
    }
    // check for password match
    const plainPassword = loginCredentials.password;
    const hashedPassword = user.password;
    const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);
    // if password does not match, throw error
    if (!isPasswordMatch) {
      return res.status(404).send({ message: "Invalid credentials" });
    }
    // to remkove password from res
    user.password = undefined;

    // generate token
    // syntax
    // token jwt.sign(payload,signature)

    const token = jwt.sign({ email: user.email }, "9847892163arun");
    // send response
    return res.status(200).send({
      message: "Login successfull",
      userDetail: user,
      token: token,
    });
  }
);
export default router;
