'use strict';

const mysql = require('mysql');

function establishDbConnection() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: env.db.HOST,
      user: env.db.USER,
      password: env.db.PASSWORD,
      database: env.db.DATABASE,
    });

    connection.connect(err => {
      if (err) reject(err);
      else resolve(connection);
    });
  });
}

function createNewUser(firstName, lastName, email) {
  return new Promise((resolve, reject) => {
    establishDbConnection()
      .then(connection => {
        connection.query(
          'INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?);',
          [firstName, lastName, email],
          (err, result) => {
            if (err) reject(err);
            else {
              connection.end(connectionEndError => {
                if (connectionEndError) reject(connectionEndError);
                else resolve(result);
              });
            }
          }
        );
      })
      .catch(reject);
  });
}

function setupNewPasswordForUser(userID, passwordHash) {
  return new Promise((resolve, reject) => {
    establishDbConnection()
      .then(connection => {
        connection.query(
          'INSERT INTO auth_data (user_id, password_hash) VALUES (?, ?);',
          [userID, passwordHash],
          (err, result) => {
            if (err) reject(err);
            else {
              connection.end(connectionEndError => {
                if (connectionEndError) reject(connectionEndError);
                else resolve(result);
              });
            }
          }
        );
      })
      .catch(reject);
  });
}

function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    establishDbConnection()
      .then(connection => {
        connection.query(
          'SELECT * FROM users JOIN auth_data ON users.id = auth_data.user_id WHERE email = ?',
          [email],
          (err, result) => {
            if (err) reject(err);
            else {
              // Try to retrieve user from result array
              const user = result.length ? result[0] : null;

              connection.end(connectionEndError => {
                if (connectionEndError) reject(connectionEndError);
                else resolve(user);
              });
            }
          }
        );
      })
      .catch(reject);
  });
}

function getUserById(id) {
  return new Promise((resolve, reject) => {
    establishDbConnection()
      .then(connection => {
        connection.query(
          'SELECT * FROM users WHERE id = ?',
          [id],
          (err, result) => {
            if (err) reject(err);
            else {
              const [user] = result;

              connection.end(connectionEndError => {
                if (connectionEndError) reject(connectionEndError);
                else {
                  if (user) resolve(user);
                  else reject('User does not exist!');
                }
              });
            }
          }
        );
      })
      .catch(reject);
  });
}

module.exports = {
  createNewUser,
  setupNewPasswordForUser,
  getUserByEmail,
  getUserById,
};
