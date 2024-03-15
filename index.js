import express from "express";
import connectDB from "./db.connect.js";
import userRoutes from "./user/user.route.js";
const app = express();
// to make app understand json
app.use(express.json());

// database connection
connectDB();
// register routes
app.use(userRoutes);
// network and ports
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`the app is listening on port ${PORT}`);
});
