module.exports = function(app) {
  var express = require('express');
  var userRouter = express.Router();
  userRouter.get('/', function(req, res) {
    res.send({
      user: [
        {
          id: 1,
          username: 'christopherdumas',
          pass: 'gortGort10!',
        }
      ]
    });
  });
  app.use('/api/user', userRouter);
};
