import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

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

const getAllCuisine = async (req, res) => {
  try {
    const data = await knex("cuisine_master");
    const responseJson = data.map((value) => {
      const { created_at, updated_at, ...rest } = value;
      return rest;
    });
    res.status(200).json(responseJson);
  } catch (error) {
    res.status(500).send("Error retrieving cuisine items");
  }
};

const getCuisineByCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.category_id;
    const data = await knex("cuisine_master as c")
      .distinct(
        "c.cuisine_id",
        "c.cuisine_name",
        "c.image_url",
        "c.description"
      )
      .join("food as f", "f.cuisine_id", "c.cuisine_id")
      .where("f.category_id", categoryId)
      .orderBy("c.cuisine_id");

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error retrieving cuisine items");
  }
};

export { getAllCategory, getAllCuisine, getCuisineByCategoryId };
