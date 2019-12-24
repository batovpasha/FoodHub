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

module.exports = {
  insertOrder,
  insertProductByOrder,
};
