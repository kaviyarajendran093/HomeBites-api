import category_master from "../seed-data/category.js";
import cuisine_master from "../seed-data/cuisine.js";
import chef from "../seed-data/chef.js";
import user from "../seed-data/user.js";
import food from "../seed-data/food.js";
import order from "../seed-data/order.js";
import invoice from "../seed-data/invoice.js";
import deliveryInfo from "../seed-data/deliveryInfo.js";

export async function seed(knex) {
  await knex("category_master").del();
  await knex("cuisine_master").del();
  await knex("chef").del();
  await knex("user").del();
  await knex("food").del();
  await knex("order").del();
  await knex("invoice").del();
  await knex("deliveryInfo").del();
  await knex("category_master").insert(category_master);
  await knex("cuisine_master").insert(cuisine_master);
  await knex("chef").insert(chef);
  await knex("user").insert(user);
  await knex("food").insert(food);
  await knex("order").insert(order);
  await knex("invoice").insert(invoice);
  await knex("deliveryInfo").insert(deliveryInfo);
}
