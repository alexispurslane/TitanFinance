module.exports = function(app) {
  var express = require('express');
  var stocksRouter = express.Router();
  stocksRouter.get('/', function(req, res) {
    res.send({buyables:[
      {
        id: 1,
        symbol: 'GOOG',
        name:   'Google, Inc.',
        cost:   540
      },
      {
        id: 2,
        symbol: 'YHOO',
        name:   'Yahoo! Inc.',
        cost:   20
      }
    ]});
  });
  app.use('/api/buyables', stocksRouter);
};
