import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const getChefByCuisine = async (req, res) => {
  try {
    const cuisineId = req.params.cuisine_id;
    const data = await knex("chef as c")
      .select(
        "c.chef_id",
        "c.name",
        "c.rating",
        "c.image_url",
        "cm.cuisine_name"
      )
      .join("cuisine_master as cm", "c.cuisine_id", "cm.cuisine_id")
      .where("c.cuisine_id", cuisineId);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error retrieving chef details");
  }
};

const getChefByCuisineAndCategory = async (req, res) => {
  try {
    const cuisineId = req.params.cuisine_id;
    const categoryId = req.params.category_id;

    const data = await knex("chef as c")
      .select(
        "c.chef_id",
        "c.name",
        "c.rating",
        "c.image_url",
        "cm.cuisine_name"
      )
      .join("cuisine_master as cm", "c.cuisine_id", "cm.cuisine_id")
      .join("food as f", "f.chef_id", "c.chef_id")
      .where("c.cuisine_id", cuisineId)
      .andWhere("f.category_id", categoryId)
      .distinct();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error retrieving chef details");
  }
};

const getfoodByChefAndCategory = async (req, res) => {
  try {
    const categoryId = req.params.category_id;
    const chefId = req.params.chef_id;

    const data = await knex("food as f")
      .select(
        "f.food_id",
        "f.name",
        "f.description",
        "f.image_url",
        "f.rating",
        "f.price",
        "c.category"
      )
      .join("category_master as c", "f.category_id", "c.category_id") // Join with category_master
      .where("f.category_id", categoryId) // Filter by category_id
      .andWhere("f.chef_id", chefId)
      .orderBy("c.category"); // Filter by chef_id

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error retrieving food list");
  }
};

const getfoodByChef = async (req, res) => {
  try {
    const chefId = req.params.chefid;

    const data = await knex("food as f")
      .select(
        "f.food_id",
        "f.name",
        "f.description",
        "f.image_url",
        "f.rating",
        "f.price",
        "c.category"
      )
      .join("category_master as c", "f.category_id", "c.category_id") // Join with category_master
      .where("f.chef_id", chefId)
      .orderBy("c.category"); // Filter by chef_id

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error retrieving food list");
  }
};

export {
  getChefByCuisine,
  getChefByCuisineAndCategory,
  getfoodByChef,
  getfoodByChefAndCategory,
};
