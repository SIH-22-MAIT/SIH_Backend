const ManufacturerForm = require("../models/ManufacturerForm");
const Order = require("../models/Order");

exports.dispatch = async (req, res) => {
	try {
		const manufacturerId = req.user;
		const { drugName, quantity, prescription } = req.body;
		const manufacturerFormID = await ManufacturerForm.create({
			drugName,
			quantity,
			prescription,
			manufacturerId
		});

		const order = await Order.create({ manufacturerFormID });
		res.status(201).json({
			status: "success",
			data: {
				order
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
