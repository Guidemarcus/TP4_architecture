"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bill = new Schema({
  id: { type: Number, unique: true },
  products: Array,
  totalPrice: Number
}, { versionKey: false });

const Product = new Schema({
  id: { type: Number, unique: true },
  name: String,
  price: Number
}, { versionKey: false });

mongoose.model("Bill", Order);
mongoose.model("Product", Product);

mongoose.Promise = global.Promise;

// TODO: Modifier le connect string par le votre!
mongoose.connect("mongodb://<Guidemarcus>:<31udiant>@ds123444.mlab.com:23444/architecture_tp4", { useMongoClient: true });
