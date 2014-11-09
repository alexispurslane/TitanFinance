import Ember from 'ember';

export default Ember.ObjectController.extend({
  email: '',
  pass: '',
  passConf: '',
  error: '',
  remember: false,
  emptyEmail: function () {
    return Ember.empty(this.get('email'));
  }.property('email'),
  emptyPass: function () {
    return Ember.empty(this.get('pass'));
  }.property('pass'),
  emptyPassConf: function () {
    return Ember.empty(this.get('passConf'));
  }.property('passConf'),
  typeOfSession: function () {
    return this.get('remember') ? 'default' : 'sessionOnly';
  }.property('remember'),
  actions: {
    signin: function () {
      var self = this;
      if (this.get('pass') !== this.get('passConf')) {
        this.set('error', 'Your password did not match it\'s confermation!');
      }
      window.ref.createUser({
        email    : this.get('email'),
        password : this.get('pass')
      }, function(error) {
        if (error === null) {
          window.firstSignIn = true;
          self.transitionToRoute('signin');
        } else {
          self.set('error', 'There was error registering you: ' + error.message);
          console.log(error);
        }
      });
    }
  }
});
