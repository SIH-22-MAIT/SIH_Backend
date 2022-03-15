require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const connectDB = require("./config/db");
const authRouter = require("./routers/authRouter");
const formRouter = require("./routers/formRouter");
const { cloudinaryConfig } = require("./utils/Upload");

const app = express();
app.use(express.json());
connectDB();
cloudinaryConfig();

app.use("/api/auth", authRouter);
app.use("/api/form", formRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
