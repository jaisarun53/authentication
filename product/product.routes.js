import express from "express";
import Product from "./product.model.js";
import { addProductValidationSchema } from "./product.validation.js";
import jwt from "jsonwebtoken";

import User from "../user/user.model.js";
import mongoose from "mongoose";
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
// get product details
router.get(
  "/product/details/:id",
  async (req, res, next) => {
    //  extract authorization from req.headers

    const autharization = req?.headers?.authorization;
    const splittedValue = autharization?.split(" ");

    // extract token from authorization
    const token = splittedValue?.length === 2 ? splittedValue[1] : undefined;

    // if not token, throw error
    if (!token) {
      return res.status(401).send({ message: "unathorized" });
    }
    // verify token using jwt and extract payload
    let payload;
    try {
      payload = jwt.verify(token, "9847892163arun");
    } catch (error) {
      // if not valid token, throw error
      return res.status(401).send({ message: "unathorized" });
    }

    // find user in our system using payload
    const user = await User.findOne({ email: payload.email });
    // if not user, throw error
    if (!user) {
      return res.status(401).send({ message: "unathorized" });
    }
    // call next function
    next();
  },
  (req, res, next) => {
    // extract id from req.paarams
    const id = req.params.id;
    // check mongoid validation
    const isValidMongoId = mongoose.isValidObjectId(id);
    // if not throw error
    if (!isValidMongoId) {
      return res.status(404).send({ message: "invalid mongo Id" });
    }
    // call nect function
    next();
  },
  async (req, res) => {
    // extract product id
    const productId = req.params.id;
    // find product
    const product = await Product.findOne({ _id: productId });
    // if not throw error
    if (!product) {
      return res.status(404).send({ message: "product does not exist" });
    }
    // send response
    return res
      .status(200)
      .send({ message: "success", productDetails: product });
  }
);
// delete product by id
router.delete(
  "/delete/product/:id",
  // authorization
  async (req, res, next) => {
    //  extract authorization from req.headers

    const autharization = req.headers.authorization;
    const splittedValue = autharization?.split(" ");

    // extract token from authorization
    const token = splittedValue?.length === 2 ? splittedValue[1] : undefined;
    // if not token, throw error
    if (!token) {
      return res.status(401).send({ message: "unathorized" });
    }
    // verify token using jwt and extract payload
    let payload;
    try {
      payload = jwt.verify(token, "9847892163arun");
    } catch (error) {
      // if not valid token, throw error
      return res.status(401).send({ message: "unathorized" });
    }

    // find user in our system using payload
    const user = await User.findOne({ email: payload.email });
    // if not user, throw error
    if (!user) {
      return res.status(401).send({ message: "unathorized" });
    }
    // call next function
    next();
  },
  // validate mongoid
  async (req, res, next) => {
    // extract id from req.params
    const id = req.params.id;
    // validate mongoid
    const isValidMongoId = mongoose.isValidObjectId(id);
    // if not throw errors
    if (!isValidMongoId) {
      return res.status(404).send({ message: "invalid mongo id" });
    }
    //  call next function
    next();
  },
  async (req, res) => {
    // extract product id from req.params.id
    const productId = req.params.id;
    // find product
    const product = await Product.findOne({ _id: productId });
    // if not throw error
    if (!product) {
      return res.status(404).send({ message: "product does not exist" });
    }
    // delete product
    await Product.deleteOne({ _Id: productId });
    // send response
    return res.status(200).send({ message: "product deleted successfully" });
  }
);
export default router;
