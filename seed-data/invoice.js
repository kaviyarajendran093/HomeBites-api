export default [
  // Invoices for User 1 (user_id: 401) - Order 601
  {
    invoice_id: 701,
    user_id: 401,
    order_id: 601,
    food_id: 501, // Example food_id referencing the food table
    quantity: 2,
    price: 10.0,
    active: true, // Active because the order is paid
    subtotal: 20.0,
  },
  {
    invoice_id: 702,
    user_id: 401,
    order_id: 601,
    food_id: 502,
    quantity: 1,
    price: 15.75,
    active: true,
    subtotal: 15.75,
  },

  // Invoices for User 2 (user_id: 402) - Order 604
  {
    invoice_id: 703,
    user_id: 402,
    order_id: 604,
    food_id: 503,
    quantity: 3,
    price: 12.5,
    active: true,
    subtotal: 37.5,
  },
  {
    invoice_id: 704,
    user_id: 402,
    order_id: 604,
    food_id: 504,
    quantity: 2,
    price: 8.75,
    active: true,
    subtotal: 17.5,
  },

  // Invoices for User 3 (user_id: 403) - Order 607
  {
    invoice_id: 705,
    user_id: 403,
    order_id: 607,
    food_id: 505,
    quantity: 4,
    price: 5.5,
    active: false, // Inactive because the order is unpaid
    subtotal: 22.0,
  },

  // Invoices for User 4 (user_id: 404) - Order 609
  {
    invoice_id: 706,
    user_id: 404,
    order_id: 609,
    food_id: 506,
    quantity: 1,
    price: 18.0,
    active: false, // Inactive because the order is cancelled
    subtotal: 18.0,
  },

  // Invoices for User 5 (user_id: 405) - Order 611
  {
    invoice_id: 707,
    user_id: 405,
    order_id: 611,
    food_id: 507,
    quantity: 2,
    price: 20.5,
    active: true,
    subtotal: 41.0,
  },
  {
    invoice_id: 708,
    user_id: 405,
    order_id: 611,
    food_id: 508,
    quantity: 1,
    price: 15.5,
    active: true,
    subtotal: 15.5,
  },

  // Invoices for User 6 (user_id: 406) - Order 613
  {
    invoice_id: 709,
    user_id: 406,
    order_id: 613,
    food_id: 509,
    quantity: 3,
    price: 12.0,
    active: true,
    subtotal: 36.0,
  },
  {
    invoice_id: 710,
    user_id: 406,
    order_id: 613,
    food_id: 510,
    quantity: 2,
    price: 10.5,
    active: true,
    subtotal: 21.0,
  },

  // Invoices for User 7 (user_id: 407) - Order 615
  {
    invoice_id: 711,
    user_id: 407,
    order_id: 615,
    food_id: 511,
    quantity: 1,
    price: 14.0,
    active: true,
    subtotal: 14.0,
  },
  {
    invoice_id: 712,
    user_id: 407,
    order_id: 615,
    food_id: 512,
    quantity: 5,
    price: 5.25,
    active: true,
    subtotal: 26.25,
  },

  // Invoices for User 8 (user_id: 408) - Order 617
  {
    invoice_id: 713,
    user_id: 408,
    order_id: 617,
    food_id: 513,
    quantity: 2,
    price: 16.0,
    active: true,
    subtotal: 32.0,
  },

  // Invoices for User 9 (user_id: 409) - Order 619
  {
    invoice_id: 714,
    user_id: 409,
    order_id: 619,
    food_id: 514,
    quantity: 4,
    price: 11.5,
    active: true,
    subtotal: 46.0,
  },
  {
    invoice_id: 715,
    user_id: 409,
    order_id: 619,
    food_id: 515,
    quantity: 1,
    price: 20.0,
    active: true,
    subtotal: 20.0,
  },

  // Invoices for User 10 (user_id: 410) - Order 621
  {
    invoice_id: 716,
    user_id: 410,
    order_id: 621,
    food_id: 516,
    quantity: 3,
    price: 8.0,
    active: true,
    subtotal: 24.0,
  },
  {
    invoice_id: 717,
    user_id: 410,
    order_id: 621,
    food_id: 517,
    quantity: 2,
    price: 9.5,
    active: true,
    subtotal: 19.0,
  },
];
