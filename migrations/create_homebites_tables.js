/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("category_master", (table) => {
      table.increments("category_id").primary();
      table.string("category").notNullable();
      table.string("image_url");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("cuisine_master", (table) => {
      table.increments("cuisine_id").primary();
      table.string("cuisine_name").notNullable();
      table.string("image_url");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("chef", (table) => {
      table.increments("chef_id").primary();
      table.string("name").notNullable();
      table.string("email_id").notNullable();
      table.string("image_url");
      table.string("Linked_in_url");
      table.string("facebook_url");
      table.string("instagram_url");
      table.string("x_url");
      table.string("phone_no", 20);
      table.boolean("topchef").defaultTo(false);
      table.decimal("rating", 10, 2).notNullable();
      table
        .integer("cuisine_id")
        .unsigned()
        .notNullable()
        .references("cuisine_master.cuisine_id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("food", (table) => {
      table.increments("food_id").primary();
      table.string("name").notNullable();
      table.text("description");
      table.string("image_url");
      table.decimal("rating", 10, 2).notNullable();
      table
        .integer("category_id")
        .unsigned()
        .notNullable()
        .references("category_master.category_id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("cuisine_id")
        .unsigned()
        .notNullable()
        .references("cuisine_master.cuisine_id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("chef_id")
        .unsigned()
        .notNullable()
        .references("chef.chef_id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.decimal("price", 10, 2).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("user", (table) => {
      table.increments("user_id").primary();
      table.string("email_id").notNullable();
      table.string("password").notNullable();
      table.string("first_name").notNullable();
      table.string("last_name");
      table.string("phone_no", 20);
      table.string("image_url");
      table.string("street");
      table.string("city", 100);
      table.string("province", 100);
      table.string("country", 100);
      table.string("zipcode", 20);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("order", (table) => {
      table.increments("order_id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user.user_id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("total_items").notNullable();
      table.decimal("total_amount", 10, 2).notNullable();
      table
        .enu("status", [
          "Pending",
          "Processing",
          "Shipped",
          "Delivered",
          "Cancelled",
        ])
        .defaultTo("Pending")
        .notNullable();
      table.boolean("payment").defaultTo(false).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("invoice", (table) => {
      table.increments("invoice_id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user.user_id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("order_id")
        .unsigned()
        .notNullable()
        .references("order.order_id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("food_id")
        .unsigned()
        .notNullable()
        .references("food.food_id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("quantity").notNullable();
      table.decimal("price", 10, 2).notNullable();
      table.decimal("subtotal", 10, 2).notNullable();
      table.boolean("active").defaultTo(true).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("deliveryinfo", (table) => {
      table.increments("delivery_id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user.user_id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("order_id")
        .unsigned()
        .notNullable()
        .references("order.order_id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("first_name", 255).notNullable();
      table.string("last_name", 255);
      table.string("phone_no", 20);
      table.string("street", 255);
      table.string("city", 100);
      table.string("province", 100);
      table.string("country", 100);
      table.string("zipcode", 20);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTable("deliveryinfo")
    .dropTable("invoice")
    .dropTable("order")
    .dropTable("user")
    .dropTable("chef")
    .dropTable("food")
    .dropTable("cuisine_master")
    .dropTable("category_master");
}
