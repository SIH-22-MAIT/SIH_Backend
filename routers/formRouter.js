const express = require("express");
const Router = express.Router();
const {
	dispatch: manufacturerFormDispatch
} = require("../controllers/manufacturerController");
const { dispatch: warehouseFormDispatch } = require("../controllers/warehouseController");
const {
	dispatch: medicalStoreDispatch
} = require("../controllers/medicalStoreController");

const authConroller = require("../controllers/authController");

Router.use(authConroller.protect);
Router.post("/manufacturer", manufacturerFormDispatch);
Router.post("/warehouse", warehouseFormDispatch);
Router.post("/medicalStore", medicalStoreDispatch);

module.exports = Router;
