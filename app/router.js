import Ember from 'ember';

var Router = Ember.Router.extend({
  location: TitanFinanceENV.locationType
});

Router.map(function() {
  this.route('dashboard');
  this.route('profile');
});

export default Router;
