require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const connectDB = require("./config/db");
const { signup, login, confirmEmail } = require("./controllers/authController");

const app = express();
app.use(express.json());
connectDB();

app.use("/api/auth/signup", signup);
app.use("/api/auth/login", login);
app.use("/api/confirmEmail/:token", confirmEmail);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
