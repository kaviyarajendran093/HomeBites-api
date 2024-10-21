export default [
  //status : "Pending", "Processing", "Shipped", "Delivered", or "Cancelled".
  // Orders for User 1 (user_id: 401)

  {
    order_id: 601,
    user_id: 401,
    total_items: 3,
    total_amount: 35.75,
    status: "Delivered",
    payment: true, // TRUE for paid
  },
  {
    order_id: 602,
    user_id: 401,
    total_items: 5,
    total_amount: 50.0,
    status: "Pending",
    payment: false, // FALSE for not paid
  },
  {
    order_id: 603,
    user_id: 401,
    total_items: 2,
    total_amount: 20.5,
    status: "Cancelled",
    payment: true,
  },

  // Orders for User 2 (user_id: 402)
  {
    order_id: 604,
    user_id: 402,
    total_items: 4,
    total_amount: 45.25,
    status: "Shipped",
    payment: true,
  },
  {
    order_id: 605,
    user_id: 402,
    total_items: 1,
    total_amount: 15.0,
    status: "Pending",
    payment: false,
  },
  {
    order_id: 606,
    user_id: 402,
    total_items: 6,
    total_amount: 70.0,
    status: "Delivered",
    payment: true,
  },

  // Orders for User 3 (user_id: 403)
  {
    order_id: 607,
    user_id: 403,
    total_items: 2,
    total_amount: 22.0,
    status: "Processing",
    payment: false,
  },
  {
    order_id: 608,
    user_id: 403,
    total_items: 3,
    total_amount: 30.0,
    status: "Delivered",
    payment: true,
  },

  // Orders for User 4 (user_id: 404)
  {
    order_id: 609,
    user_id: 404,
    total_items: 5,
    total_amount: 55.0,
    status: "Pending",
    payment: false,
  },
  {
    order_id: 610,
    user_id: 404,
    total_items: 2,
    total_amount: 18.0,
    status: "Cancelled",
    payment: true,
  },

  // Orders for User 5 (user_id: 405)
  {
    order_id: 611,
    user_id: 405,
    total_items: 4,
    total_amount: 40.5,
    status: "Shipped",
    payment: true,
  },
  {
    order_id: 612,
    user_id: 405,
    total_items: 1,
    total_amount: 10.0,
    status: "Pending",
    payment: false,
  },

  // Orders for User 6 (user_id: 406)
  {
    order_id: 613,
    user_id: 406,
    total_items: 7,
    total_amount: 75.0,
    status: "Delivered",
    payment: true,
  },
  {
    order_id: 614,
    user_id: 406,
    total_items: 3,
    total_amount: 33.5,
    status: "Pending",
    payment: false,
  },

  // Orders for User 7 (user_id: 407)
  {
    order_id: 615,
    user_id: 407,
    total_items: 2,
    total_amount: 24.0,
    status: "Processing",
    payment: true,
  },
  {
    order_id: 616,
    user_id: 407,
    total_items: 5,
    total_amount: 55.25,
    status: "Cancelled",
    payment: false,
  },

  // Orders for User 8 (user_id: 408)
  {
    order_id: 617,
    user_id: 408,
    total_items: 1,
    total_amount: 15.75,
    status: "Shipped",
    payment: true,
  },
  {
    order_id: 618,
    user_id: 408,
    total_items: 4,
    total_amount: 42.5,
    status: "Pending",
    payment: false,
  },

  // Orders for User 9 (user_id: 409)
  {
    order_id: 619,
    user_id: 409,
    total_items: 6,
    total_amount: 70.0,
    status: "Delivered",
    payment: true,
  },
  {
    order_id: 620,
    user_id: 409,
    total_items: 2,
    total_amount: 20.0,
    status: "Cancelled",
    payment: false,
  },

  // Orders for User 10 (user_id: 410)
  {
    order_id: 621,
    user_id: 410,
    total_items: 3,
    total_amount: 30.0,
    status: "Processing",
    payment: true,
  },
  {
    order_id: 622,
    user_id: 410,
    total_items: 5,
    total_amount: 50.0,
    status: "Pending",
    payment: false,
  },
];
