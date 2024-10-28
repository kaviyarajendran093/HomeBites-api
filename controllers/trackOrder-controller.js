import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import { body, validationResult } from "express-validator";

const validateDeliveryInfo = [
  body("user_id").exists().withMessage("user id  is required."),
  body("order_id").exists().withMessage("order id is required."),
  body("first_name").exists().withMessage("First name is required."),
  body("last_name").exists().withMessage("Last name is required."),
  body("email").exists().withMessage("Email is required."),
  body("phone_no").exists().withMessage("Phone number is required."),
  body("street").exists().withMessage("Street is required."),
  body("city").exists().withMessage("City is required."),
  body("province").exists().withMessage("Province is required."),
  body("country").exists().withMessage("Country is required."),
  body("zipcode").exists().withMessage("Zip code is required."),
];

const addDeliveryInfo = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const checkPhoneNum = /^\+1 \((\d{3})\)[ ](\d{3})[-](\d{4})$/;
    if (!checkPhoneNum.test(req.body.phone_no)) {
      return res.status(400).json({
        message: "Addition unsuccessful, phone number is invalid",
      });
    }

    const checkEmail = /\S+@\S+\.\S+/;
    if (!checkEmail.test(req.body.email)) {
      return res.status(400).json({
        message: "Addition unsuccessful, email address is invalid",
      });
    }
  }
  try {
    if (!req.body.order_id) {
      return res.status(400).json({ message: "order_id is required" });
    }

    const result = await knex("deliveryinfo").insert(req.body);

    const deliveryinfoId = Array.isArray(result) ? result[0] : result.insertId;
    console.log("New delivery ID:", deliveryinfoId);

    const newDeliveryInfo = await knex("deliveryinfo")
      .where({ delivery_id: deliveryinfoId })
      .first();

    if (!newDeliveryInfo) {
      return res
        .status(404)
        .json({ message: "Delivery id not found after creation" });
    }

    const { created_at, updated_at, ...responseJson } = newDeliveryInfo;

    res.status(201).json(responseJson);
  } catch (error) {
    console.error("Error creating delivery Info:", error);
    res.status(500).json({
      message: `Unable to create new delivery Info: ${error.message}`,
    });
  }
};

const updateOrder = async (req, res) => {
  console.log(req.body);
  try {
    const rowsUpdated = await knex("order")
      .where({ order_id: req.params.order_id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `order with ID ${req.params.order_id} not found`,
      });
    }

    const updatedUser = await knex("order").where({
      order_id: req.params.order_id,
    });

    res.json(updatedUser[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update order with ID ${req.params.order_id}: ${error}`,
    });
  }
};

const updateInvoice = async (req, res) => {
  try {
    const rowsUpdated = await knex("invoice")
      .where({ order_id: req.params.order_id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `invoice with order id ${req.params.order_id} not found`,
      });
    }

    const updatedUser = await knex("invoice").where({
      order_id: req.params.order_id,
    });

    res.json(updatedUser[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update invoice with order ID ${req.params.order_id}: ${error}`,
    });
  }
};

const removeDeliveryInfo = async (req, res) => {
  try {
    const rowsDeleted = await knex("deliveryinfo")
      .where({ delivery_id: req.params.delivery_id })
      .delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({
        message: `Delivery with ID ${req.params.delivery_id} not found`,
      });
    }

    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete the deliveryInfo: ${error}`,
    });
  }
};

const getUserOrderDetails = async (req, res) => {
  try {
    const { user_id, order_id } = req.params;

    const data = await knex("Invoice as i")
      .select(
        "i.user_id",
        knex.raw("COUNT(i.invoice_id) AS total_invoices"),
        knex.raw(
          "GROUP_CONCAT(CONCAT(f.name, ' X ', i.quantity) SEPARATOR ', ') AS food_items_quantities"
        ),
        knex.raw("SUM(i.quantity) AS overall_total_quantity"),
        "o.total_amount AS overall_total_price",
        knex.raw("5 AS delivery_fee"),
        "o.status"
      )
      .join("Food as f", "i.food_id", "f.food_id")
      .join("Order as o", "i.order_id", "o.order_id")
      .where("i.user_id", user_id)
      .andWhere("i.order_id", order_id)
      .groupBy("i.user_id", "o.status");

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error retrieving order details");
  }
};

export {
  validateDeliveryInfo,
  addDeliveryInfo,
  updateOrder,
  updateInvoice,
  removeDeliveryInfo,
  getUserOrderDetails,
};
