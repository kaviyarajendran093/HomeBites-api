import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import { body, validationResult } from "express-validator";

//Validate Req body
const validateOrder = [
  body("user_id").exists().withMessage("user id  is required."),
  body("total_items").exists().withMessage("total items is required."),
  body("total_amount").exists().withMessage("total amount is required."),
  body("status").exists().withMessage("status is required."),
  body("payment").exists().withMessage("payment is required."),
];

const validateInvoice = [
  body("user_id").exists().withMessage("user id  is required."),
  body("order_id").exists().withMessage("order id is required."),
  body("food_id").exists().withMessage("food id is required."),
  body("quantity").exists().withMessage("quantity is required."),
  body("price").exists().withMessage("price is required."),
  body("subtotal").exists().withMessage("subtotal is required."),
  body("active").exists().withMessage("active is required."),
];

const addOrder = async (req, res) => {
  // Check validateWarehouse result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const result = await knex("order").insert(req.body);

    const newOrderId = Array.isArray(result) ? result[0] : result.insertId;
    console.log("New Order ID:", newOrderId);

    const newOrder = await knex("order")
      .where({ order_id: newOrderId })
      .first();

    if (!newOrder) {
      return res
        .status(404)
        .json({ message: "Order not found after creation" });
    }

    const { created_at, updated_at, ...responseJson } = newOrder;

    res.status(201).json(responseJson);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      message: `Unable to create new order: ${error.message}`,
    });
  }
};

const addInvoice = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (!req.body.order_id) {
      return res.status(400).json({ message: "order_id is required" });
    }

    const result = await knex("invoice").insert(req.body);

    const newInvoiceId = Array.isArray(result) ? result[0] : result.insertId;
    console.log("New invoice ID:", newInvoiceId);

    const newInvoice = await knex("invoice")
      .where({ invoice_id: newInvoiceId })
      .first();

    if (!newInvoice) {
      return res
        .status(404)
        .json({ message: "Invoice not found after creation" });
    }

    const { created_at, updated_at, ...responseJson } = newInvoice;

    res.status(201).json(responseJson);
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({
      message: `Unable to create new invoice: ${error.message}`,
    });
  }
};

const removeOrder = async (req, res) => {
  try {
    const rowsDeleted = await knex("order")
      .where({ id: req.params.order_id })
      .delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Order with ID ${req.params.id} not found` });
    }

    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete the Order: ${error}`,
    });
  }
};

export { addOrder, validateOrder, addInvoice, validateInvoice, removeOrder };
