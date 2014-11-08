import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    var self = this;
    var stocks = self.store.find('stock');
    var user = self.store.find('user');
    return Ember.RSVP.hash({
      stocks: stocks,
      user: user
    }).then(function (hash) {
      return hash;
    });
  }
});
