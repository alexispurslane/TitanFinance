import Ember from 'ember';

var Router = Ember.Router.extend({
  location: TitanFinanceENV.locationType
});

Router.map(function() {
  this.route('dashboard');
  this.route('profile');
  this.route('settings');
  this.route('help');
  this.route('search');
  this.route('signin', { path: '/' });
  this.route('register');
});

export default Router;
