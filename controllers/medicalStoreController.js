const WarehouseForm = require("../models/WarehouseForm");
const MedicalStoreForm = require("../models/MedicalStoreForm");
const Order = require("../models/Order");

exports.dispatch = async (req, res) => {
	try {
		const medicalStoreID = req.user;
		let alert = false;
		const { quantity, inTime, orderID, identity, IMC, prescription } = req.body;

		const order = await Order.findById(orderID);
		if (!order) {
			return res.status(404).json({
				status: "fail",
				msg: "Order with this Order ID not found"
			});
		}
		if (order.completed) {
			return res.status(400).json({
				status: "fail",
				msg: "Order is already completed"
			});
		}

		// Setting Alert based on last warehouse

		const length = order.warehousesFormID.length;
		const warehouseFormID = order.warehousesFormID[length - 1];
		const warehouseForm = await WarehouseForm.findById(warehouseFormID);
		if (warehouseForm.quantity !== quantity || warehouseForm.alert) {
			alert = true;
		}

		const medicalStoreFormID = await MedicalStoreForm.create({
			quantity,
			inTime,
			alert,
			medicalStoreID,
			prescription,
			identity,
			IMC
		});
		order.medicalStoreFormID = medicalStoreFormID;
		order.completed = true;
		order.alert = alert;
		const updatedOrder = await order.save();

		res.status(201).json({
			status: "success",
			data: {
				updatedOrder
			}
		});
	} catch (err) {
		console.log(err.message);
		res.status(400).json({
			status: "fail",
			msg: err.message
		});
	}
};

exports.getMedicalStoreFormByID = async (req, res) => {
	try {
		const form = await MedicalStoreForm.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: {
				form
			}
		});
	} catch (err) {
		console.log(err.message);
		res.status(400).json({
			status: "fail",
			msg: err.message
		});
	}
};
