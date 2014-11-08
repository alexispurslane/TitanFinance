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
        } else {
          self.set('error', 'There was error registering you: ' + error.message);
          console.log(error);
        }
      });
      // Sign the user in now...
      window.ref.authWithPassword({
        email    : this.get('email'),
        password : this.get('pass')
      }, function(error, authData) {
        if (error === null) {
          console.log('User ID: ' + authData.uid + ', Provider: ' + authData.provider);
          window.ref.child('users').push({
            uid: authData.uid,
            money: 10000
          });
          self.transitionToRoute('dashboard');
          localStorage.signedIn = true;
        } else {
          self.set('error', 'There was error authenticating you: ' + error.message);
          console.log(error);
          localStorage.signedIn = false;
        }
      }, {
        remember: this.get('typeOfSession')
      });

    }
  }
});
