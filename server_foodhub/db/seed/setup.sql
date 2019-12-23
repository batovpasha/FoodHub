CREATE DATABASE IF NOT EXISTS foodhub;

USE foodhub;

CREATE TABLE IF NOT EXISTS users
(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role ENUM('customer', 'producer') DEFAULT 'customer'
);

CREATE TABLE IF NOT EXISTS auth_data
(
    user_id INT NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders
(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    customer_id INT NOT NULL,
    place_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT NOW() NOT NULL,
    ready_date TIMESTAMP DEFAULT NOW() NOT NULL,
    total_price DOUBLE NOT NULL,
    was_given_to_client BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (place_id) REFERENCES places(id)
);

CREATE TABLE IF NOT EXISTS places
(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    place_name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    owner_id INT NOT NULL,
    image BLOB,
    address VARCHAR(255) NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS products
(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DOUBLE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    place_id INT NOT NULL,
    image BLOB,
    FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS products_by_orders
(
    product_id INT NOT NULL,
    order_id INT NOT NULL,
    quantity INT DEFAULT 1 NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE IF NOT EXISTS votes_history
(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    number_of_stars INT CHECK (number_of_stars >= 1 AND number_of_stars <= 5),
    vote_date TIMESTAMP DEFAULT NOW() NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS users_rating
(
    user_id INT NOT NULL,
    total_votes_number INT DEFAULT 0 NOT NULL,
    total_rating FLOAT DEFAULT 0 NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
