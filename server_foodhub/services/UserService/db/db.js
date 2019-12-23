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

function updateUserRole(userId, role) {
  return new Promise((resolve, reject) => {
    pool.query(
      'UPDATE users SET role = ? WHERE id = ?',
      [role, userId],
      (err, result) => {
        if (err) reject(err);
        else {
          const success = Boolean(result.affectedRows);
          resolve(success);
        }
      }
    );
  });
}

module.exports = {
  getUserById,
  updateUserRole,
};
