const fetch = require('node-fetch');

const {
  insertOrder,
  insertProductByOrder,
  getOrdersByCustomerId,
  getOrdersByProducerId,
} = require('../db/db');

async function addOrder(req, res) {
  try {
    const { placeId, readyDate, products, userId } = req.body;

    const response = await fetch(
      `${env.services.PLACE_SERVICE_URL}/place/product/list`,
      {
        method: 'GET',
        headers: {
          Authorization: req.get('Authorization'),
        },
      }
    );

    if (response.status === 200) {
      const allProducts = await response.json();
      const price = Object.keys(products).reduce((acc, productId) => {
        const targetProduct = allProducts.find(
          product => product.id === parseInt(productId)
        );
        return acc + targetProduct.price * products[productId];
      }, 0);

      insertOrder(userId, placeId, readyDate, price)
        .then(async ({ insertId: orderId }) => {
          for (const productId of Object.keys(products)) {
            await insertProductByOrder(
              parseInt(productId),
              orderId,
              products[productId]
            );
          }

          res.status(201).end();
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ error });
        });
    } else {
      console.error('Error with place service!');
      res.sendStatus(500);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}

function getOrdersByCustomer(req, res) {
  const { userId } = req.body;

  getOrdersByCustomerId(userId)
    .then(orders => {
      console.log(orders);
      res.json(orders);
    })
    .catch(error => {
      console.error(error);
    });
}

function getOrdersByProducer(req, res) {}

module.exports = {
  addOrder,
  getOrdersByCustomer,
  getOrdersByProducer,
};
