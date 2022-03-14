const WarehouseForm = require("../models/WarehouseForm");
const ManufacturerForm = require("../models/ManufacturerForm");
const Order = require("../models/Order");

exports.dispatch = async (req, res) => {
	try {
		const warehouseID = req.user;
		let alert = false;
		const { quantity, inTime, orderID } = req.body;

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

		// Setting Alert based on previous quantity

		// First Warehouse
		if (order.warehousesFormID.length === 0) {
			const manufacturerForm = await ManufacturerForm.findById(order.manufacturerFormID);
			if (manufacturerForm.quantity !== quantity) {
				alert = true;
			}
		} else {
			const length = order.warehousesFormID.length;
			const warehouseFormID = order.warehousesFormID[length - 1];
			const warehouseForm = await WarehouseForm.findById(warehouseFormID);
			if (warehouseForm.quantity !== quantity || warehouseForm.alert) {
				alert = true;
			}
		}
		const warehouseFormID = await WarehouseForm.create({
			quantity,
			inTime,
			warehouseID,
			alert
		});
		order.warehousesFormID.push(warehouseFormID);
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
