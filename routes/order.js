import express from "express";
import {
  getChefByCuisine,
  getChefByCuisineAndCategory,
  getfoodByChef,
  getfoodByChefAndCategory,
} from "../controllers/order-controller.js";

const orderRoute = express.Router();

orderRoute.route("/list/:chefid").get(getfoodByChef);

orderRoute.route("/:cuisine_id").get(getChefByCuisine);

orderRoute.route("/:cuisine_id/:category_id").get(getChefByCuisineAndCategory);

orderRoute.route("/list/:chef_id/:category_id").get(getfoodByChefAndCategory);

export default orderRoute;
