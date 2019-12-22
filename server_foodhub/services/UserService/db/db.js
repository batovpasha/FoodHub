const mysql = require('mysql');

const pool = mysql.createPool({
  host: env.db.HOST,
  user: env.db.USER,
  password: env.db.PASSWORD,
  database: env.db.DATABASE,
});

function getUserById(id) {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE id = ?;', [id], (err, result) => {
      if (err) reject(err);
      else {
        const [user] = result;
        resolve(user);
      }
    });
  });
}

module.exports = {
  getUserById,
};
