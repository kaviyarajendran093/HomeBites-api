import express from "express";
import {
  getAllCategory,
  getAllCuisine,
  getCuisineByCategoryId,
} from "../controllers/food-controller.js";

const foodRoute = express.Router();

foodRoute.route("/").get(getAllCategory);

foodRoute.route("/cuisine").get(getAllCuisine);

foodRoute.route("/cuisine/:category_id").get(getCuisineByCategoryId);

export default foodRoute;
