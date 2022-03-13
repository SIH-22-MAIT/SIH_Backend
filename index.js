require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const connectDB = require("./config/db");
const authRouter = require("./routers/authRouter");

const app = express();
app.use(express.json());
connectDB();

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
