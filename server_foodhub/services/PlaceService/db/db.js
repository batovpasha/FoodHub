const mysql = require('mysql');

const pool = mysql.createPool({
  host: env.db.HOST,
  user: env.db.USER,
  password: env.db.PASSWORD,
  database: env.db.DATABASE,
});

function insertPlace(placeName, description, ownerId, image, address) {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO places` +
        `(place_name, description, owner_id, image, address) ` +
        `VALUES (?, ?, ?, ?, ?);`,
      [placeName, description, ownerId, image, address],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
}

function getAllPlaces() {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT id, place_name, description, owner_id, address FROM places;',
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
}

function getImage(placeId) {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT image FROM places WHERE id = ?;',
      [placeId],
      (err, result) => {
        if (err) reject(err);
        else {
          const image = result.length ? Buffer.from(result[0].image) : null;
          resolve(image);
        }
      }
    );
  });
}

function removePlace(ownerId, placeId) {
  return new Promise((resolve, reject) => {
    pool.query(
      'DELETE FROM places WHERE owner_id = ? AND id = ?;',
      [ownerId, parseInt(placeId)],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
}

function insertProduct(productName, description, price, placeId, image) {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO products` +
        `(product_name, description, price, place_id, image) ` +
        `VALUES (?, ?, ?, ?, ?);`,
      [productName, description, price, placeId, image],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
}

function removeProduct(productId) {
  return new Promise((resolve, reject) => {
    pool.query(
      'DELETE FROM products WHERE id = ?;',
      [productId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
}

function getAllProducts() {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT id, product_name, description, price, is_active, place_id FROM products;',
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
}

function getProductImageById(productId) {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT image FROM products WHERE id = ?;',
      [productId],
      (err, result) => {
        if (err) reject(err);
        else {
          const image = result.length ? Buffer.from(result[0].image) : null;
          resolve(image);
        }
      }
    );
  });
}

module.exports = {
  insertPlace,
  getAllPlaces,
  getImage,
  removePlace,
  insertProduct,
  removeProduct,
  getAllProducts,
  getProductImageById,
};
