import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['application'],
  email: '',
  pass: '',
  error: '',
  remember: false,
  emptyEmail: function () {
    return Ember.empty(this.get('email'));
  }.property('email'),
  emptyPass: function () {
    return Ember.empty(this.get('pass'));
  }.property('pass'),
  typeOfSession: function () {
    return this.get('remember') ? 'default' : 'sessionOnly';
  }.property('remember'),
  actions: {
    signin: function () {
      var self = this;
      window.ref.authWithPassword({
        email    : this.get('email'),
        password : this.get('pass')
      }, function(error, authData) {
        if (error === null) {
          console.log(authData.auth);
          localStorage.signedIn = true;
          if (window.firstSignIn === true) {
            window.firstSignIn = false;
            window.ref.child('users').child(window.ref.getAuth().uid).set({
              money: 10000,
              uid: window.ref.getAuth().uid
            });
          }
          self.get('controllers.application').set('signedIn', true);
          self.transitionToRoute('dashboard');
        } else {
          self.set('error', 'There was error authenticating you: ' + error.message);
          console.log(error);
          localStorage.signedIn = false;
          self.get('controllers.application').set('signedIn', false);
        }
      }, {
        remember: this.get('typeOfSession')
      });
    }
  }
});
