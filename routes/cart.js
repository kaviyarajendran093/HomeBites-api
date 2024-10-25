import express from "express";
import {
  validateOrder,
  addOrder,
  validateInvoice,
  addInvoice,
  removeOrder,
} from "../controllers/cart-controller.js";

const cartRoute = express.Router();

cartRoute.route("/").post(validateOrder, addOrder);

cartRoute.route("/invoice").post(validateInvoice, addInvoice);

cartRoute.route("/:order_id").delete(removeOrder);

export default cartRoute;
