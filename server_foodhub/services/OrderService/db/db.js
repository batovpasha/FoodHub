const mysql = require('mysql');

const pool = mysql.createPool({
  host: env.db.HOST,
  user: env.db.USER,
  password: env.db.PASSWORD,
  database: env.db.DATABASE,
});

function insertOrder(userId, placeId, readyDate, totalPrice) {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO orders(customer_id, place_id, ready_date, total_price) ` +
        `VALUES (?, ?, ?, ?);`,
      [userId, placeId, readyDate, totalPrice],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
}

function insertProductByOrder(productId, orderId, quantity) {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO products_by_orders(product_id, order_id, quantity) ' +
        'VALUES (?, ?, ?);',
      [productId, orderId, quantity],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
}

function getOrdersByCustomerId(customerId) {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT orders.id, customer_id, orders.place_id, order_date, ready_date, total_price, was_given_to_client, product_id, order_id, quantity, products.is, product_name, description, price, is_active, products.place_id FROM orders JOIN products_by_orders ON orders.id = products_by_orders.order_id JOIN products ON products_by_orders.product_id = products.id WHERE customer_id = ?;',
      [customerId],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
}

module.exports = {
  insertOrder,
  insertProductByOrder,
  getOrdersByCustomerId,
};
