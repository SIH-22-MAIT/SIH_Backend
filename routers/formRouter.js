const express = require("express");
const Router = express.Router();
const {
	dispatch: manufacturerFormDispatch
} = require("../controllers/manufacturerController");
const { dispatch: warehouseFormDispatch } = require("../controllers/warehouseController");
const {
	dispatch: medicalStoreDispatch
} = require("../controllers/medicalStoreController");

const authController = require("../controllers/authController");

Router.use(authController.protect);

Router.post(
	"/manufacturer",
	authController.roles("manufacturer"),
	manufacturerFormDispatch
);
Router.post("/warehouse", authController.roles("warehouse"), warehouseFormDispatch);
Router.post("/medicalStore", authController.roles("medicalStore"), medicalStoreDispatch);

module.exports = Router;
