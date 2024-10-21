import express from "express";
import { getAllCategory } from "../controllers/food-controller.js";

const foodRoute = express.Router();

foodRoute.route("/").get(getAllCategory);

export default foodRoute;
