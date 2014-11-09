import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    if (!JSON.parse(localStorage.signedIn || false)) {
      this.transitionTo('signin');
    } else {}
  },
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
