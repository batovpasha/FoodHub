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

module.exports = {
  insertPlace,
};
