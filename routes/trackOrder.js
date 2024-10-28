import express from "express";
import {
  addDeliveryInfo,
  validateDeliveryInfo,
  updateOrder,
  updateInvoice,
  removeDeliveryInfo,
  getUserOrderDetails,
} from "../controllers/trackOrder-controller.js";

const trackOrderRoute = express.Router();

trackOrderRoute.route("/").post(validateDeliveryInfo, addDeliveryInfo);

trackOrderRoute.route("/order/:order_id").patch(updateOrder);

trackOrderRoute.route("/invoice/:order_id").patch(updateInvoice);

trackOrderRoute.route("/:delivery_id").delete(removeDeliveryInfo);

trackOrderRoute.route("/:user_id/:order_id").get(getUserOrderDetails);

export default trackOrderRoute;
