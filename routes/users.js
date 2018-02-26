var express = require('express');
var router = express.Router();
var fakeRestaurant = require('fake-restaurant-npm');

var authUser = function(req, res, next) {
    if(['Pippo', 'Caio', 'Sempronio'].includes(req.query.token)) {
        return next();
    }
    res.status(401).json({message: 'Invalid token'});
}

router.post('/orders', authUser, function(req, res) {
    if (req.body.hasOwnProperty('products') && req.body.hasOwnProperty('price')) {
      fakeRestaurant.createOrder({
          products: req.body.products,
          price: req.body.price,
          user: req.query.token
      });
      return res.status(201).json({message: 'Order created'})
    }
    res.status(400).json({message: 'Invalid body'});
})

router.get('/orders', authUser, function(req, res) {
    res.json(fakeRestaurant.getOrdersByUser(req.query.token));
})

module.exports = router;
