const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Product = require("./schema");
const cors = require("cors");

const app = express();
require("dotenv").config();

const port = process.env.PORT;
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function start() {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		app.post("/product", (req, res) => {
			if (!!req.body.name && !!req.body.amount) {
				const product = new Product({ name: req.body.name, amount: req.body.amount });
				product.save();
				res.setHeader("Access-Control-Allow-Origin", "*");
				res.send().status(200);
			} else {
				res.send().status(400);
			}
		});

		app.get("/product", async (req, res) => {
			const products = await Product.find({});
			res.json(products).status(200);
		});

		app.listen(port, () => {
			console.log("We are live on " + port);
		});
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
}

start();
