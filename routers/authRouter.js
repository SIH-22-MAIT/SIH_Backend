const express = require("express");
const Router = express.Router();
const {
  signup,
  login,
  confirmEmail
} = require("../controllers/authController");

Router.post("/signup", signup);
Router.post("/login", login);
Router.get("/confirmEmail/:token", confirmEmail);

module.exports = Router;
