import express from "express";
import connectDB from "./db.connect.js";
import userRoutes from "./user/user.route.js";
import productRoutes from "./product/product.routes.js";
import cors from "cors";
const app = express();
// to make app understand json
app.use(express.json());

// enable cors
// cross origin resource sharing
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors());

// database connection
connectDB();
// register routes
app.use(userRoutes);
app.use(productRoutes);
// network and ports
const PORT = 8001;
app.listen(PORT, () => {
  console.log(`the app is listening on port ${PORT}`);
});
