var express = require('express');
var router = express.Router();
var fakeRestaurant = require('fake-restaurant-npm');

var authAdmin = function(req, res, next) {
    if(req.query.token === 'admin') {
        return next();
    }
    res.status(401).json({message: 'Invalid token'});
}

function isInt(value) {
  return !isNaN(value) &&
         parseInt(Number(value)) == value &&
         !isNaN(parseInt(value, 10));
}

router.get('/orders', authAdmin, function(req, res) {
    if (req.query.status &&  ['new', 'ready', 'closed'].includes(req.query.status)) {
        return res.json(fakeRestaurant.allOrdersByStatus(req.query.status));
    } else {
        return res.json(fakeRestaurant.allOrders());
    }
})

router.delete('/orders/:id', authAdmin, function(req, res) {
    if (isInt(req.params.id)) {
        return res.json(fakeRestaurant.deleteOrder(parseInt(req.params.id)));
    }
    res.status(400).json({message: 'id is not integer'})
})

router.put('/orders/:id', authAdmin, function(req, res) {
    if (isInt(req.params.id) && ['new', 'ready', 'closed'].includes(req.body.status)) {
        fakeRestaurant.setStatus(parseInt(req.params.id), req.body.status);
        return res.json({message: "status changed"});
    }
    res.status(400).json({message: 'params not valid'})
})

router.get('/profit', authAdmin, function(req, res) {
    res.json({profit: fakeRestaurant.getProfit()});
})

router.get('/byUser/:user', authAdmin, function(req, res) {
    if (['Pippo', 'Caio', 'Sempronio'].includes(req.params.user)) {
        return res.json(fakeRestaurant.getOrdersByUser(req.params.user));
    }
    res.status(404).json({message: 'User not found'});
})



module.exports = router;
