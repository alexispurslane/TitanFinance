import Ember from 'ember';

export default Ember.Controller.extend({
  signedIn: JSON.parse(localStorage.signedIn || "false"),
  size: 20,
  gravatarUrl: function() {
    var email =  window.ref.getAuth().password.email,
        size = this.get('size');

    return 'http://www.gravatar.com/avatar/' + hex_md5(email) + '?s=' + size;
  }.property('size'),
  actions: {
    logout: function () {
      localStorage.signedIn = false;
      window.ref.unauth();
      this.set('signedIn', false);
      this.transitionToRoute('signin');
    }
  }
});
