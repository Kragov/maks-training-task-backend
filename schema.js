const { Schema, model } = require("mongoose");

const schema = new Schema({
	name: { type: String, required: true },
	amount: { type: String, required: true },
});

module.exports = model("Product", schema, "products");
