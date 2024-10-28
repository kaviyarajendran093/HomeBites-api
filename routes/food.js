import express from "express";
import {
  getAllCategory,
  getAllCuisine,
  getCuisineByCategoryId,
  getTopChefs,
} from "../controllers/food-controller.js";

const foodRoute = express.Router();

foodRoute.route("/").get(getAllCategory);

foodRoute.route("/topchef").get(getTopChefs);

foodRoute.route("/cuisine").get(getAllCuisine);

foodRoute.route("/cuisine/:category_id").get(getCuisineByCategoryId);

export default foodRoute;
