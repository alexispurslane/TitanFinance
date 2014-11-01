module.exports = function(app) {
  var express = require('express');
  var stocksRouter = express.Router();
  stocksRouter.get('/', function(req, res) {
    res.send({stocks:[
      {
        id: 1,
        symbol: 'GOOG',
        number: 5,
        worth: 560,
        cost: 540
      },
      {
        id: 2,
        symbol: 'YHOO',
        number: 20,
        worth: 40,
        cost: 20
      }
    ]});
  });
  app.use('/api/stocks', stocksRouter);
};
