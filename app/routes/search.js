import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    var self = this;
    return Ember.RSVP.hash({
      stocks: self.store.find('buyable'),
      user: self.store.find('user')
    }).then(function (hash) {
      return hash;
    });
  }
});
