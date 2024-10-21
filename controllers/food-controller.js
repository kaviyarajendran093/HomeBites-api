import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import { body, validationResult } from "express-validator";

const getAllCategory = async (req, res) => {
  try {
    const data = await knex("category_master");
    const responseJson = data.map((value) => {
      const { created_at, updated_at, ...rest } = value;
      return rest;
    });
    res.status(200).json(responseJson);
  } catch (error) {
    res.status(500).send("Error retrieving category items");
  }
};

export { getAllCategory };
