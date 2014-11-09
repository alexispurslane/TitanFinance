import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    if (!JSON.parse(localStorage.signedIn || false)) {
      this.transitionTo('signin');
    } else {}
  },
  model: function () {
    return this.store.find('user');
  }
});
