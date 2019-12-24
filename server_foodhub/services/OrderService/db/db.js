const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 100,
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
      'select orders.id, customer_id, orders.place_id, order_date, ready_date, total_price, was_given_to_client, product_id, order_id, quantity, products.id, product_name, description, price, is_active from orders join products_by_orders on orders.id = products_by_orders.order_id join products on products_by_orders.product_id = products.id WHERE customer_id = ?',
      [customerId],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
}

function getOrdersByProducerId(producerId) {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT orders.id, customer_id, place_id, order_date, ready_date, total_price, was_given_to_client, places.id, place_name, description, owner_id, address FROM orders JOIN places ON orders.place_id = places.id WHERE owner_id = ?',
      [producerId],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
}

function changeOrderStatusToWasGiven(orderId) {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE orders SET was_given_to_client = TRUE WHERE id = ?;',
      [orderId],
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
  getOrdersByProducerId,
  changeOrderStatusToWasGiven,
};
