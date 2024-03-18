import express from "express";
import Product from "./product.model.js";
import { addProductValidationSchema } from "./product.validation.js";
import jwt from "jsonwebtoken";

import User from "../user/user.model.js";
const router = express.Router();
// add product
router.post(
  "/add/product",
  async (req, res, next) => {
    // extract auyharization from req.headers
    const authorization = req.headers.authorization;
    // extract token from authorisation
    const splittedValue = authorization?.split(" ");
    const token = splittedValue?.length === 2 ? splittedValue[1] : undefined;
    console.log(token);
    if (!token) {
      return res.status(401).send({ message: "unathorised" });
    }
    let payload;
    try {
      payload = jwt.verify(token, "9847892163arun");
    } catch (error) {
      return res.status(401).send({ message: "unathorised" });
    }
    // find user using email from payload
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return res.status(401).send({ message: "unathorised" });
    }
    next();
  },
  async (req, res, next) => {
    // validate req.body
    const data = req.body;
    try {
      const validatedData = await addProductValidationSchema.validate(data);
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    // extract data
    const newProduct = req.body;
    // create product
    await Product.create(newProduct);
    // send response
    return res.status(200).send({ message: "product added successfully" });
  }
);
export default router;
