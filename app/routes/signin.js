import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    if (localStorage.signedIn === 'true') {
      this.transitionTo('dashboard');
    }
  }
});
